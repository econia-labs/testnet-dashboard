import Image from "next/image";
import { usePathname } from "next/navigation";

import econiaLogo from "../public/econia-logo.svg";
import Link from "next/link";
import { Fragment, useEffect, useState } from "react";
import ConnectWalletButton from "../connect-wallet/connect-wallet-button";
import { OpenMenuIcon } from "@/icons/open-menu-icon";
import { useWallet } from "@aptos-labs/wallet-adapter-react";
import DisconnectWalletButton from "@/connect-wallet/disconnect-wallet-button";
import ConfettiEffect from "./confetti-effect";
import { useBoolean } from "usehooks-ts";

export type MenuItem = {
  name: string;
  link: string;
};

const menuList = [
  {
    name: "Trade",
    link: "/trade",
  },
  {
    name: "Leaderboard",
    link: "/",
  },
  {
    name: "Rules",
    link: String(process.env.NEXT_PUBLIC_RULES_HREF),
  },
];

const SlidingMenu = ({
  isOpen,
  toggleMenu,
}: {
  isOpen: boolean;
  toggleMenu: () => void;
}) => {
  const { account } = useWallet();

  return (
    <div
      className={`flex flex-col gap-40 z-10 lg:hidden fixed h-full top-16 right-0 pl-46 bg-800 bg-noise overflow-x-hidden transition-width duration-300 ease-in-out ${isOpen ? "w-full" : "w-0"
        }`}
    >
      <div className="flex flex-col pt-52 justify-between items-start gap-23.68">
        {menuList.map((item: MenuItem, index: number) => {
          return (
            <MenuItem
              item={item}
              key={index}
              responsive={true}
              toggleMenu={toggleMenu}
            />
          );
        })}
      </div>
      {account?.address ? <DisconnectWalletButton /> : <ConnectWalletButton />}
    </div>
  );
};

const MenuItem = ({
  item,
  responsive = false,
  toggleMenu,
}: {
  item: MenuItem;
  responsive?: boolean;
  toggleMenu: () => void;
}) => {
  const pathname = usePathname();
  const active = pathname === item.link;
  const className = active ? "text-white" : "text-500";

  if (item.link.startsWith("/")) {
    return (
      <Fragment key={item.link}>
        <Link
          href={item.link}
          className={`${className} transition-color duration-300 ease-in-out hover:text-blue`}
          onClick={toggleMenu}
        >
          {item.name.toUpperCase()}
        </Link>
        <span
          className={`text-600 text-24 font-light ${responsive ? "hidden" : ""
            }`}
        >
          /
        </span>
      </Fragment>
    );
  } else {
    return (
      <a
        key={item.link}
        href={item.link}
        target="_blank"
        className="text-500 flex gap-8 transition-color duration-300 ease-in-out hover:text-blue"
        onClick={toggleMenu}
      >
        {item.name.toUpperCase()}
      </a>
    );
  }
};

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { connected, account } = useWallet();
  const {
    value: showConfetti,
    setFalse: onClose,
    setTrue: onOpen,
  } = useBoolean(false);

  useEffect(() => {
    const isNotAutoReconnect =
      window && document?.body?.getAttribute("connected") === "1";
    if (isNotAutoReconnect && account?.address) {
      onOpen();
    }
  }, [connected]);

  useEffect(() => {
    // Function to update isOpen based on window width
    const updateIsOpen = () => {
      const width = window.innerWidth;
      // If width is equal or larger than 1024px, then close the menu
      if (width >= 1024) setIsOpen(false);
    };

    // Call the updateIsOpen function when the component mounts
    updateIsOpen();

    // Attach an event listener to update isOpen when window width changes
    window.addEventListener("resize", updateIsOpen);

    // Cleanup: remove the event listener when the component unmounts
    return () => {
      window.removeEventListener("resize", updateIsOpen);
    };
  }, []);

  useEffect(() => {
    // If isOpen is true, no scrolling is allowed on the body
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const closeMenu = () => {
    setIsOpen(false);
  };

  return (
    <div className="grid grid-cols-3">
      {/* Logo */}
      <div className="flex items-center">
        <Link
          href="/"
          onClick={closeMenu}
          className="transition duration-300 transform scale-101 hover:scale-96"
        >
          <Image src={econiaLogo} alt="logo" width={117} height={19} />
        </Link>
      </div>
      {/* Navbar links */}
      <div className="hidden lg:flex gap-24 font-medium items-baseline justify-center">
        {menuList.map((item: MenuItem, index: number) => {
          return <MenuItem key={index} item={item} toggleMenu={closeMenu} />;
        })}
      </div>
      {/* Connection buttons */}
      <div className="flex justify-end">
        {account?.address ? (
          <DisconnectWalletButton responsive={true} />
        ) : (
          <ConnectWalletButton responsive={true} />
        )}
      </div>

      <div
        className="flex lg:hidden flex-col gap-8 h-7 items-end"
        onClick={toggleMenu}
      >
        <OpenMenuIcon
          className={`transition duration-300 ease-in-out ${isOpen ? "rotate-135" : ""
            }`}
        />
        <OpenMenuIcon
          className={`transition duration-300 ease-in-out ${isOpen ? "rotate-45 -translate-y-3.25" : ""
            }`}
        />
      </div>
      <SlidingMenu isOpen={isOpen} toggleMenu={toggleMenu} />
      {showConfetti && connected && (
        <ConfettiEffect duration={2000} onClose={onClose} />
      )}
    </div>
  );
};

export default Navbar;
