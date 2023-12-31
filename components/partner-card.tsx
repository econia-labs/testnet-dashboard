import { partnerType } from "@/types/partner";
import Link from "next/link";
import React from "react";

const PartnerCard = ({
  children,
  partner,
}: {
  children: React.ReactNode;
  partner: partnerType;
}) => {
  return (
    <Link
      href={partner.link || "#"}
      target="_blank"
      onClick={(e) => {
        // If there is no link, prevent going to the link, remove this onClick after all partners have their own link
        if (!partner.link) {
          e.preventDefault();
        }
      }}
      className="group cursor-pointer border-1 border-600 w-224 h-224 grid place-items-center transition-all duration-300 ease-in-out hover:bg-blue hover:bg-opacity-20 hover:border-blue"
    >
      <div
      // className='transition-all duration-500 ease-in-out opacity-100 group-hover:opacity-0'
      >
        {children}
      </div>
      {/* <div className='absolute flex flex-col gap-8 transition-all duration-500 ease-in-out opacity-0 group-hover:opacity-100'>
                <div className='text-center font-black'>
                    {partner.name}
                </div>
                <div className='text-center'>
                    DIGITAL EXCHANGE
                </div>
            </div> */}
      {/* <div className='absolute bottom-0 right-0 w-12 h-12 bg-blue flex justify-center items-center transition-opacity duration-300 ease-in-out opacity-0 group-hover:opacity-100'>
                <span className='text-white text-36 font-light'>+</span>
            </div> */}
    </Link>
  );
};

export default PartnerCard;
