import React from "react";
import Modal from "@/components/modal";
import { useBoolean } from "usehooks-ts";
import DisConnectWalletModalBody from "./disconnect-wallet-modal-body";
import ConnectionButton from "./connection-button";

interface DisConnectWalletButtonProps {
  responsive?: boolean;
}

const DisconnectWalletButton = ({
  responsive,
}: DisConnectWalletButtonProps) => {
  const {
    value: openModal,
    setFalse: setClose,
    setTrue: setOpen,
  } = useBoolean(false);
  return (
    <>
      <ConnectionButton onClick={setOpen} responsive={responsive}>
        Disconnect Wallet
      </ConnectionButton>
      <Modal className="!w-[425.6577px]" open={openModal} onClose={setClose}>
        <DisConnectWalletModalBody />
      </Modal>
    </>
  );
};

export default DisconnectWalletButton;
