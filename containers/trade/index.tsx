import PartnerCard from "@/components/partner-card";
import Image from "next/image";
import React from "react";
import Partner_1 from "../../partner-logos/partner-1.svg";
import Partner_2 from "../../partner-logos/partner-2.svg";
import Partner_3 from "../../partner-logos/partner-3.png";
import { partnerType } from "@/types/partner";

const partnerList: partnerType[] = [
  {
    name: "Aries Markets",
    logo: Partner_1,
    link: process.env.NEXT_PUBLIC_TRADING_VIEW_PARTNER_LINK_1,
  },
  {
    name: "Gator Exchange",
    logo: Partner_2,
    link: process.env.NEXT_PUBLIC_TRADING_VIEW_PARTNER_LINK_2,
  },
  {
    name: "Kana Exchange",
    logo: Partner_3,
    link: process.env.NEXT_PUBLIC_TRADING_VIEW_PARTNER_LINK_3,
  },
];

const TradeContainer = () => {
  return (
    <div className="flex flex-col lg:flex-row justify-center items-center gap-42 mt-96 mb-96 lg:mt-230.63 lg:mb-0">
      {partnerList.map((partner: partnerType, index: number) => {
        return (
          <PartnerCard key={index} partner={partner}>
            <Image
              src={partner.logo}
              alt={partner.name}
              className="max-w-[170px]"
            />
          </PartnerCard>
        );
      })}
    </div>
  );
};

export default TradeContainer;
