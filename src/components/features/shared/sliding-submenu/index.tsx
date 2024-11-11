// "use client"

// import * as React from "react"
// import { ArrowLeft, Store, Truck, User, X } from "lucide-react"
// import { AnimatePresence, motion } from "framer-motion"

// import { Button } from "@/components/ui/button"
// import { ScrollArea } from "@/components/ui/scroll-area"
// import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"

// interface MenuItem {
//   title: string
//   icon?: React.ReactNode
//   href?: string
//   items?: MenuItem[]
// }

// const menuData: MenuItem[] = {
//   items: [
//     {
//       title: "My store",
//       icon: <Store className="h-4 w-4" />,
//       items: [
//         { title: "Find Us", href: "#" }
//       ]
//     },
//     {
//       title: "Delivery Info",
//       icon: <Truck className="h-4 w-4" />,
//       href: "#"
//     },
//     { title: "Home", href: "#" },
//     {
//       title: "Shop",
//       items: [
//         { title: "Christmas Pre-order", href: "#" },
//         { title: "Clearance", href: "#" },
//         {
//           title: "Pasta & Gnocchi",
//           items: [
//             { title: "Pasta", href: "#" },
//             { title: "Egg Pasta", href: "#" },
//             { title: "Gnocchi", href: "#" },
//             { title: "Gluten-free", href: "#" },
//           ]
//         },
//         { title: "Rice & Grains", href: "#" },
//         { title: "Pasta & Pizza Sauces", href: "#" },
//         { title: "Biscuits, Breads & Crackers", href: "#" },
//         { title: "Canned, Jarred & Dried food", href: "#" },
//         { title: "Oil & Vinegar", href: "#" },
//         { title: "Salt & Spices", href: "#" },
//         { title: "Jams, Spreads & Honey", href: "#" },
//         { title: "Sweets & Cakes", href: "#" },
//         { title: "Baking", href: "#" },
//         { title: "Coffee & Tea", href: "#" },
//       ]
//     },
//     { title: "Gift Cards", href: "#" },
//     { title: "Café", href: "#" },
//     { title: "Contact", href: "#" },
//     { title: "About Us", href: "#" },
//     {
//       title: "Account",
//       icon: <User className="h-4 w-4" />,
//       href: "#"
//     },
//   ]
// }

// export default function SlidingMenu() {
//   const [open, setOpen] = React.useState(false)
//   const [history, setHistory] = React.useState<MenuItem[]>([menuData])

//   const currentMenu = history[history.length - 1]

//   const handleBack = () => {
//     setHistory((current) => current.slice(0, -1))
//   }

//   const handleNavigate = (item: MenuItem) => {
//     if (item.items) {
//       setHistory((current) => [...current, item])
//     }
//   }

//   const handleReset = () => {
//     setHistory([menuData])
//   }

//   return (
//     <Sheet open={open} onOpenChange={setOpen}>
//       <SheetTrigger asChild>
//         <Button variant="outline">Open Menu</Button>
//       </SheetTrigger>
//       <SheetContent side="right" className="w-full max-w-[400px] p-0">
//         <SheetHeader className="border-b p-4">
//           <SheetTitle className="flex items-center justify-between">
//             <span>Menu</span>
//             <Button
//               variant="ghost"
//               size="icon"
//               className="h-auto w-auto p-0"
//               onClick={() => setOpen(false)}
//             >
//               <X className="h-6 w-6" />
//               <span className="sr-only">Close</span>
//             </Button>
//           </SheetTitle>
//         </SheetHeader>
//         <AnimatePresence initial={false} mode="wait">
//           <motion.div
//             key={history.length}
//             initial={{ x: "100%" }}
//             animate={{ x: 0 }}
//             exit={{ x: "-100%" }}
//             transition={{ type: "tween", duration: 0.25 }}
//           >
//             {history.length > 1 && (
//               <div className="border-b">
//                 <Button
//                   variant="ghost"
//                   className="h-14 w-full justify-start gap-2 rounded-none px-4"
//                   onClick={handleBack}
//                 >
//                   <ArrowLeft className="h-4 w-4" />
//                   Back
//                 </Button>
//               </div>
//             )}
//             <ScrollArea className="h-[calc(100vh-8rem)]">
//               <div className="flex flex-col">
//                 {currentMenu.items?.map((item, index) => (
//                   <Button
//                     key={item.title + index}
//                     variant="ghost"
//                     className="h-14 w-full justify-start gap-2 rounded-none border-b px-4"
//                     onClick={() => handleNavigate(item)}
//                   >
//                     {item.icon}
//                     <span className="flex-1 text-left">{item.title}</span>
//                     {item.items && (
//                       <ArrowLeft className="h-4 w-4 rotate-180" />
//                     )}
//                   </Button>
//                 ))}
//               </div>
//             </ScrollArea>
//           </motion.div>
//         </AnimatePresence>
//       </SheetContent>
//     </Sheet>
//   )
// }
