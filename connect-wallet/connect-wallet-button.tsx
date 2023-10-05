import React from "react";
import ConnectWalletModalBody from "@/connect-wallet/connect-wallet-modal-body";
import { useBoolean } from "usehooks-ts";
import Modal from "@/components/modal";
import ConnectionButton from "./connection-button";

interface ConnectWalletButtonProps {
  responsive?: boolean;
}

const ConnectWalletButton = ({ responsive }: ConnectWalletButtonProps) => {
  const {
    value: openModal,
    setFalse: setClose,
    setTrue: setOpen,
  } = useBoolean(false);
  return (
    <>
      <ConnectionButton onClick={setOpen} responsive={responsive}>
        Connect Wallet
      </ConnectionButton>

      <Modal className="!w-599.21" open={openModal} onClose={setClose}>
        <ConnectWalletModalBody />
      </Modal>
    </>
  );
};

export default ConnectWalletButton;
