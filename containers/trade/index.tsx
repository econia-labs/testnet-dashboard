import PartnerCard from '@/components/partner-card'
import Image from 'next/image'
import React from 'react'
import AriesLogo from '../../icons/aries-logo.svg'
import GatorLogo from '../../icons/gator-logo.svg'
import KanaLogo from '../../icons/kana-logo.svg'
import { partnerType } from '@/types/partner'

const partnerList: partnerType[] = [
    {
        name: 'Aries Markets',
        logo: AriesLogo,
    },
    {
        name: 'Gator Exchange',
        logo: GatorLogo,
    },
    {
        name: 'Kana Exchange',
        logo: KanaLogo,
    }
]

const TradeContainer = () => {
    return (
        <div className='flex flex-col lg:flex-row justify-center items-center gap-42 mt-96 mb-96 lg:mt-230.63 lg:mb-0'>
            {
                partnerList.map((partner: partnerType, index: number) => {
                    return (
                        <PartnerCard key={index} partner={partner}>
                            <Image src={partner.logo} alt={partner.name} />
                        </PartnerCard>
                    )
                })
            }
        </div>
    )
}

export default TradeContainer