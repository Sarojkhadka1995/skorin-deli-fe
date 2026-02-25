import { ICartItem } from "@/interface/cart.types";
import {
  IBundleDealItem,
  IAppliedBundleDiscount,
} from "@/interface/bundle.types";

function isDealActive(deal: IBundleDealItem): boolean {
  if (!deal.status) return false;
  const now = new Date().getTime();
  if (deal.startDate && new Date(deal.startDate).getTime() > now) return false;
  if (deal.endDate && new Date(deal.endDate).getTime() < now) return false;
  return true;
}

/**
 * Builds a map of productId -> quantity in cart
 */
function getCartQuantityByProductId(cartData: ICartItem[]): Map<number, number> {
  const map = new Map<number, number>();
  for (const item of cartData) {
    const pid = item.product?.id ?? item.productId;
    if (pid) map.set(pid, (map.get(pid) ?? 0) + item.quantity);
  }
  return map;
}

/**
 * For one application of the deal, get the total value (for percentage discount)
 */
function getBundleValuePerApplication(
  deal: IBundleDealItem,
  cartData: ICartItem[]
): number {
  let value = 0;
  const priceByProductId = new Map(
    cartData.map((item) => [
      item.product?.id ?? item.productId,
      Number(item.product?.price ?? item.price ?? 0),
    ])
  );
  for (const p of deal.products) {
    const productId = p.product?.id ?? p.id;
    const unitPrice = priceByProductId.get(productId) ?? 0;
    value += unitPrice * p.quantity;
  }
  return value;
}

/**
 * Deal applies only when cart quantity exactly matches the deal's required quantity.
 * e.g. deal "2 of product A" applies only when cart has exactly 2 of A (not 4 or 3).
 * For multi-product deals, each product must match its required quantity exactly.
 */
function getDealApplications(
  deal: IBundleDealItem,
  cartQtyByProductId: Map<number, number>
): number {
  if (!deal.products?.length) return 0;
  for (const p of deal.products) {
    const productId = p.product?.id ?? p.id;
    const cartQty = cartQtyByProductId.get(productId) ?? 0;
    const required = p.quantity || 1;
    if (cartQty !== required) return 0;
  }
  return 1;
}

/**
 * Compute total bundle discount and per-deal breakdown.
 * Deal applies only when quantity exactly matches (e.g. "2 for $5 off" only when cart has exactly 2).
 */
export function computeBundleDiscount(
  cartData: ICartItem[],
  bundleDeals: IBundleDealItem[] | undefined
): {
  totalBundleDiscount: number;
  appliedDeals: IAppliedBundleDiscount[];
} {
  if (!bundleDeals?.length || !cartData?.length) {
    return { totalBundleDiscount: 0, appliedDeals: [] };
  }

  const cartQtyByProductId = getCartQuantityByProductId(cartData);
  const appliedDeals: IAppliedBundleDiscount[] = [];
  let totalBundleDiscount = 0;

  for (const deal of bundleDeals) {
    if (!isDealActive(deal)) continue;

    const applications = getDealApplications(deal, cartQtyByProductId);
    if (applications < 1) continue;

    let discountAmount: number;
    if (deal.discountType === "fixed") {
      discountAmount = applications * Number(deal.discountAmount);
    } else {
      const bundleValuePerApplication = getBundleValuePerApplication(
        deal,
        cartData
      );
      discountAmount =
        applications *
        (bundleValuePerApplication * (Number(deal.discountAmount) / 100));
    }

    totalBundleDiscount += discountAmount;
    appliedDeals.push({
      dealId: deal.id,
      dealName: deal.name,
      discountAmount,
      applications,
      productIds: deal.products.map((p) => p.product?.id ?? p.id),
    });
  }

  return {
    totalBundleDiscount: Math.round(totalBundleDiscount * 100) / 100,
    appliedDeals,
  };
}
