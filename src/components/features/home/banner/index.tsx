import Image from "next/image";
import { Button } from "@/components/ui/button";
import { banner } from "../../../../../image-config";
// import { showToast, TOAST_TYPES } from "@/shared/utils/toast.utils";
import Link from "next/link";

export default function Banner() {
  // const handleShopNow = () => {
  //   showToast(TOAST_TYPES.success, "SHOP NOW");
  // };
  return (
    <div className="relative h-[500px] w-full overflow-hidden">
      <Image
        src={banner}
        className="absolute inset-0 brightness-50"
        alt="banner"
        layout="fill"
        objectFit="cover"
      />
      <div className="absolute inset-0 flex flex-col items-start justify-center p-6 sm:p-12">
        {/* <h2 className="text-sm sm:text-base md:text-lg text-white mb-2">
          Eat like a Italian
        </h2>
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-6">
          Eat well, enjoy life
        </h1> */}
        <Link href="/categories">
          <Button
            size="lg"
            variant="outline"
            className="bg-[#ebe5d6]  text-base md:text-lg lg:text-xl lg:h-[60px] px-10"
          >
            SHOP NOW
          </Button>
        </Link>
      </div>
    </div>
  );
}
