import Image from 'next/image'
import { usePathname } from 'next/navigation'

import logo1 from '../public/logo1.svg';
import Link from 'next/link';
import { Fragment, useState } from 'react';
import { ArrowExternalRightIcon } from '@/icons/arrow-external-right-icon';
import ConnectWalletButton from './connect-wallet-button';
import { OpenMenuIcon } from '@/icons/open-menu-icon';

export type MenuItem = {
    name: string;
    link: string;
};

const menuList = [
    {
        name: 'Trade',
        link: '/'
    },
    {
        name: 'Leaderboard',
        link: '/leaderboard'
    },
    {
        name: 'Rules',
        link: 'https://random.com/rules'
    },
]

const SlidingMenu = ({ isOpen, toggleMenu }: { isOpen: boolean, toggleMenu: () => void }) => {
    return (
        <div className={`flex flex-col gap-40 z-10 lg:hidden fixed h-full top-16 right-0 pl-46 bg-800 bg-noise overflow-x-hidden transition-width duration-300 ease-in-out ${isOpen ? 'w-full' : 'w-0'}`}>
            <div className='flex flex-col pt-52 justify-between items-start gap-23.68'>
                {
                    menuList.map((item: MenuItem, index: number) => {
                        return (
                            <MenuItem item={item} key={index} responsive={true} toggleMenu={toggleMenu} />
                        )
                    })
                }
            </div>
            <ConnectWalletButton />
        </div>
    );
};

const MenuItem = ({ item, responsive = false, toggleMenu }: { item: MenuItem, responsive?: boolean, toggleMenu: () => void }) => {
    const pathname = usePathname();
    const active = pathname === item.link;
    const className = active ? 'text-white' : 'text-500';

    if (item.link.startsWith('/')) {
        return (
            <Fragment key={item.link}>
                <Link href={item.link} className={className} onClick={toggleMenu}>
                    {item.name.toUpperCase()}
                </Link>
                <span className={`text-600 text-24 font-light ${responsive ? 'hidden' : ''}`}>/</span>
            </Fragment>
        );
    } else {
        return (
            <a key={item.link} href={item.link} target='_blank' className={`${className} flex gap-8`} onClick={toggleMenu}>
                {item.name.toUpperCase()} <ArrowExternalRightIcon />
            </a>
        );
    }
}

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleMenu = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className='flex justify-between items-center'>
            <Link href="/" onClick={toggleMenu}>
                <Image src={logo1} alt="logo" width={117} height={19} />
            </Link>
            <div className='hidden lg:flex gap-24 font-medium items-baseline'>
                {
                    menuList.map((item: MenuItem, index: number) => {
                        return (
                            <MenuItem key={index} item={item} toggleMenu={toggleMenu} />
                        )
                    })
                }
            </div>
            <ConnectWalletButton responsive={true} />
            <div className='flex lg:hidden flex-col gap-8 h-7' onClick={toggleMenu} >
                <OpenMenuIcon className={`transition duration-300 ease-in-out ${isOpen ? "rotate-135" : ""}`} />
                <OpenMenuIcon className={`transition duration-300 ease-in-out ${isOpen ? "rotate-45 -translate-y-3.25" : ""}`} />
            </div>
            <SlidingMenu isOpen={isOpen} toggleMenu={toggleMenu} />
        </div>
    )
}

export default Navbar
