import { type ReactNode } from "react";
import { Modal, ModalOverlay } from "react-aria-components";

interface SheetProps {
  children: ReactNode;
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}

export default function Sheet({ children, isOpen, setIsOpen }: SheetProps) {
  return (
    <ModalOverlay
      isOpen={isOpen}
      onOpenChange={setIsOpen}
      isDismissable
      className="entering:animate-in exiting:animate-out entering:fade-in-0 exiting:fade-out-0 glass-frosted fixed inset-0 z-50"
    >
      <Modal className="entering:animate-in exiting:animate-out entering:slide-in-from-bottom exiting:slide-out-to-bottom md:entering:slide-in-from-right-full md:exiting:slide-out-to-right-full bg-surface-background pb-safe-bottom fixed bottom-0 z-50 h-[70vh] w-full pt-4 duration-300 md:inset-y-0 md:right-0 md:h-full md:max-w-md">
        {children}
      </Modal>
    </ModalOverlay>
  );
}
