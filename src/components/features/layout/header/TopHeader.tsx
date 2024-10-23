import { Facebook, Instagram } from "lucide-react";

export default function TopHeader() {
  return (
    <div className="bg-[#3c5141] py-2">
      <div className="container mx-auto">
        <div className="text-white flex justify-between items-center min-h-[48px]">
          <div className="flex gap-4">
            <Facebook size={24} />
            <Instagram size={24} />
          </div>
          <p className="text-[15px] text-center leading-[16px]">
            FREE DELIVERY to Sydney Metro spend $150+ and most Northern Beaches
            spend $50+
          </p>
          <div></div>
        </div>
      </div>
    </div>
  );
}
