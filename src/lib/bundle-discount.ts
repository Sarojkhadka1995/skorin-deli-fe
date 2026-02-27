import { ICartItem } from '@/interface/cart.types'
import { IBundleDealItem, IBundleDealProduct, IAppliedBundleDiscount } from '@/interface/bundle.types'

function isDealActive(deal: IBundleDealItem): boolean {
  if (!deal.status) return false
  const now = Date.now()
  if (deal.startDate && new Date(deal.startDate).getTime() > now) return false
  if (deal.endDate && new Date(deal.endDate).getTime() < now) return false
  return true
}

function buildCartQuantityMap(cartData: ICartItem[]): Map<number, number> {
  const map = new Map<number, number>()
  for (const item of cartData) {
    const pid = item.product?.id ?? item.productId
    if (pid) map.set(pid, (map.get(pid) ?? 0) + item.quantity)
  }
  return map
}

function buildPriceMap(cartData: ICartItem[]): Map<number, number> {
  const map = new Map<number, number>()
  for (const item of cartData) {
    const pid = item.product?.id ?? item.productId
    if (pid) map.set(pid, Number(item.product?.price ?? item.price ?? 0))
  }
  return map
}

/**
 * Product IDs in a deal (ignores products[].quantity).
 */
function getDealProductIds(deal: IBundleDealItem): number[] {
  return (deal.products ?? []).map((p) => p.product?.id ?? p.id)
}

/**
 * Pool = sum of remaining quantities of all bundle products.
 * Any product combination can fulfil; one application consumes deal.quantity units from this pool.
 */
function getPool(deal: IBundleDealItem, remainingQty: Map<number, number>): number {
  const pids = getDealProductIds(deal)
  let pool = 0
  for (const pid of pids) {
    pool += remainingQty.get(pid) ?? 0
  }
  return pool
}

/**
 * Applicable count: floor(pool / deal.quantity). Pool-based; ignores per-product minimum.
 */
function getApplicableCount(
  deal: IBundleDealItem,
  remainingQty: Map<number, number>,
): number {
  if (!deal.products?.length || deal.quantity <= 0) return 0
  const pool = getPool(deal, remainingQty)
  return Math.floor(pool / deal.quantity)
}

/**
 * Returns the discount amount for ONE application of a deal.
 */
function getDiscountPerApplication(
  deal: IBundleDealItem,
  priceMap: Map<number, number>,
): number {
  if (deal.discountType === 'fixed') {
    return Number(deal.discountAmount)
  }
  // Percentage: value consumed per application × discount rate
  let valuePerApp = 0
  for (const p of deal.products) {
    const pid = p.product?.id ?? p.id
    valuePerApp += (priceMap.get(pid) ?? 0) * deal.quantity
  }
  return Math.round(valuePerApp * (Number(deal.discountAmount) / 100) * 100) / 100
}

/**
 * Pure function — greedy highest-total-discount-first bundle engine (pool-based).
 *
 * Pool model: each bundle has a pool = sum of cart quantities of its products.
 * Any product combination can fulfil; one application consumes deal.quantity units from the pool.
 * applicableCount = floor(pool / deal.quantity). Deduct from product with most stock first.
 *
 * Algorithm:
 *  1. Clone cart quantities; never mutate original.
 *  2. Each iteration: compute pool and applicableCount for all deals; pick highest totalDiscount.
 *  3. Apply ONE iteration: deduct deal.quantity units from that deal's pool (any combination).
 *  4. Repeat until no eligible deal remains.
 */
export function computeBundleDiscount(
  cartData: ICartItem[],
  bundleDeals: IBundleDealItem[] | undefined,
): {
  totalBundleDiscount: number
  appliedDeals: IAppliedBundleDiscount[]
} {
  if (!bundleDeals?.length || !cartData?.length) {
    return { totalBundleDiscount: 0, appliedDeals: [] }
  }

  const activeDeals = bundleDeals.filter(isDealActive)
  if (!activeDeals.length) return { totalBundleDiscount: 0, appliedDeals: [] }

  const priceMap = buildPriceMap(cartData)
  const remainingQty = buildCartQuantityMap(cartData)

  // dealId -> { deal, timesApplied, totalDiscount }
  const appliedMap = new Map<string, {
    deal: IBundleDealItem
    timesApplied: number
    totalDiscount: number
  }>()

  // Greedy loop — no recursion
  while (true) {
    let bestDeal: IBundleDealItem | null = null
    let bestPotential = 0

    for (const deal of activeDeals) {
      const count = getApplicableCount(deal, remainingQty)
      if (count === 0) continue
      const discountPerApp = getDiscountPerApplication(deal, priceMap)
      const potential = count * discountPerApp
      // Stable sort: strict greater-than keeps first-encountered on tie
      if (potential > bestPotential) {
        bestPotential = potential
        bestDeal = deal
      }
    }

    if (!bestDeal || bestPotential <= 0) break

    // Deduct deal.quantity units from pool (any combination). Deduct from product with most first.
    const toDeduct = bestDeal.quantity
    const pids = getDealProductIds(bestDeal)
    const entries = pids
      .map((pid) => [pid, remainingQty.get(pid) ?? 0] as const)
      .sort((a, b) => a[1] - b[1])
    let left = toDeduct
    let consumedValue = 0
    for (const [pid, qty] of entries) {
      if (left <= 0) break
      const take = Math.min(left, qty)
      remainingQty.set(pid, qty - take)
      left -= take
      consumedValue += (priceMap.get(pid) ?? 0) * take
    }

    const discountPerApp = getDiscountPerApplication(bestDeal, priceMap)
    const cappedDiscount = Math.min(
      discountPerApp,
      Math.round(consumedValue * 100) / 100,
    )

    const existing = appliedMap.get(bestDeal.id)
    if (existing) {
      existing.timesApplied++
      existing.totalDiscount = Math.round((existing.totalDiscount + cappedDiscount) * 100) / 100
    } else {
      appliedMap.set(bestDeal.id, {
        deal: bestDeal,
        timesApplied: 1,
        totalDiscount: Math.round(cappedDiscount * 100) / 100,
      })
    }
  }

  const appliedDeals: IAppliedBundleDiscount[] = []
  let totalBundleDiscount = 0

  appliedMap.forEach(({ deal, timesApplied, totalDiscount }) => {
    appliedDeals.push({
      dealId: deal.id,
      dealName: deal.name,
      discountAmount: totalDiscount,
      applications: timesApplied,
      productIds: deal.products.map((p: IBundleDealProduct) => p.product?.id ?? p.id),
    })
    totalBundleDiscount += totalDiscount
  })

  return {
    totalBundleDiscount: Math.round(totalBundleDiscount * 100) / 100,
    appliedDeals,
  }
}
