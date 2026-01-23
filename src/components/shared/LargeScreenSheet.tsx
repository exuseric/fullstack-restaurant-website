import {
  AnimatePresence,
  cubicBezier,
  motion,
  useMotionValue,
} from "motion/react";
import { type Dispatch, type ReactNode, type SetStateAction } from "react";
import { Dialog, Heading, Modal, ModalOverlay } from "react-aria-components";

// Wrap React Aria modal components so they support motion values.
const MotionModal = motion.create(Modal);
const MotionModalOverlay = motion.create(ModalOverlay);

const staticTransition = {
  duration: 0.5,
  ease: cubicBezier(0.32, 0.72, 0, 1),
};

const SHEET_MARGIN = 0;

export default function LargeScreenSheet({
  isOpen,
  setIsOpen,
  children,
  position = "left",
  title
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  position?: "left" | "right";
  title: string;
}) {
  const w =
    typeof window !== "undefined" ? window.innerWidth - SHEET_MARGIN : 0;
  const x = useMotionValue(w);

  const pos = position === "left" ? "right-0" : "left-0";

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <MotionModalOverlay
            isOpen
            onOpenChange={setIsOpen}
            isDismissable
            className="glass-frosted fixed inset-0 z-50 hidden md:block"
          >
            <MotionModal
              className={`glass absolute ${pos} h-full w-full max-w-md shadow-lg will-change-transform`}
              initial={{ x: w }}
              animate={{ x: 0 }}
              exit={{ x: w }}
              transition={staticTransition}
              style={{
                x,
                right: SHEET_MARGIN,
              }}
            >
              <Dialog className="p-4 overflow-y-auto overscroll-y-contain pb-4">
                <Heading slot="title" className="mt-0">
                  {title}
                </Heading>
                {children}
              </Dialog>
            </MotionModal>
          </MotionModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
}
