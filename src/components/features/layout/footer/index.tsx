import { QUICK_LINKS } from "@/constants/quicklinks";
import { Facebook, Instagram } from "lucide-react";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 pt-8 pb-6">
      <div className="container mx-auto px-4">
        <div className="flex flex-wrap justify-between">
          {/* Company Information */}
          <div className="w-full sm:w-2/4 md:w-1/4 mb-8 md:mb-0">
            <h2 className="text-2xl font-bold mb-4">Skorin Deli</h2>

            <p className="mb-2">215 Concord Rd</p>
            <p className="mb-2">North Strathfield NSW 2137</p>
            <p>Australia</p>
          </div>

          {/* Quick Links */}
          <div className="w-full sm:w-2/4 md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Quick links</h3>
            <ul className="space-y-2">
              {Object.entries(QUICK_LINKS).map(([key, value]) => (
                <li key={key}>
                  <Link
                    href={`/${key}`}
                    className="hover:text-primary underline"
                  >
                    {value}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Follow Us */}
          <div className="w-full sm:w-2/4 md:w-1/4 mb-8 md:mb-0">
            <h3 className="text-lg font-semibold mb-4">Follow us</h3>
            <div className="flex space-x-4 mb-4">
              <Link
                href="https://www.facebook.com/SkorinDeli"
                target="_blank"
                className="text-gray-600 hover:text-gray-800"
              >
                <Facebook size={24} />
              </Link>
              <Link
                href="https://www.instagram.com/skorin.deli/"
                target="_blank"
                className="text-gray-600 hover:text-gray-800"
              >
                <Instagram size={24} />
              </Link>
            </div>
            {/* <button className="bg-indigo-600 text-white px-4 py-2 rounded-full flex items-center space-x-2 hover:bg-indigo-700 transition duration-300">
              <Heart size={16} />
              <span>Follow on shop</span>
            </button> */}
          </div>

          {/* Liquor License */}
          {/* <div className="w-full sm:w-2/4 md:w-1/4">
            <h3 className="text-lg font-semibold mb-4">Liquor Licence</h3>
            <p className="mb-2">LIQP770017824</p>
            <p className="text-sm">
              NSW Liquor Act 2007: No Alcohol can be sold or supplied to anyone
              under 18. It&apos;s against the law.
            </p>
          </div> */}
        </div>

        {/* Copyright */}
        <div className="border-t border-gray-200 mt-8 pt-6 text-base lg:text-center">
          <p>
            Copyright &copy; {new Date().getFullYear()}{" "}
            <Link href="/" className="underline underline-offset-4">
              Skorin Deli.
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
