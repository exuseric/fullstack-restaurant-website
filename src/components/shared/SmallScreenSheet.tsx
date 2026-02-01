import { EqualIcon } from "lucide-react";
import {
  animate,
  AnimatePresence,
  cubicBezier,
  motion,
  useMotionValue,
} from "motion/react";
import { type Dispatch, type ReactNode, type SetStateAction } from "react";
import { Dialog, Heading, Modal, ModalOverlay } from "react-aria-components";
import { Button } from "@/components/shared/button";

// Wrap React Aria modal components so they support motion values.
const MotionModal = motion.create(Modal);
const MotionModalOverlay = motion.create(ModalOverlay);

const inertiaTransition = {
  type: "inertia" as const,
  bounceStiffness: 300,
  bounceDamping: 40,
  timeConstant: 300,
};

const staticTransition = {
  duration: 0.5,
  ease: cubicBezier(0.32, 0.72, 0, 1),
};

const SHEET_MARGIN = 100;
const SHEET_RADIUS = 12;

export default function SmallScreenSheet({
  isOpen,
  setIsOpen,
  children,
  title,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
  title: string;
}) {
  const h =
    typeof window !== "undefined" ? window.innerHeight - SHEET_MARGIN : 0;
  const y = useMotionValue(h);

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <MotionModalOverlay
            // Force the modal to be open when AnimatePresence renders it.
            isOpen
            onOpenChange={setIsOpen}
            isDismissable
            className="glass-frosted fixed inset-0 z-50 block md:hidden"
          >
            <MotionModal
              className="glass absolute bottom-0 w-full shadow-lg will-change-transform"
              initial={{ y: h }}
              animate={{ y: 0 }}
              exit={{ y: h }}
              transition={staticTransition}
              style={{
                y,
                top: SHEET_MARGIN,
              }}
              drag="y"
              dragConstraints={{ top: 0, bottom: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.y > window.innerHeight * 0.75 || velocity.y > 10) {
                  // Dragged down significantly - close the sheet
                  setIsOpen(false);
                } else {
                  // Snap back to position based on drag direction
                  // const target = offset.y < -100 ? -SHEET_MARGIN : 0;
                  animate(y, 0, { ...inertiaTransition, min: 0, max: 0 });
                }
              }}
            >
              {/* drag affordance */}
              {/* <div className="bg-surface-inverse mx-auto my-2 h-1.5 w-12 rounded-full" /> */}
              <div className="flex-center">
                <Button className="mx-auto!" variant="quiet">
                  <EqualIcon />
                </Button>
              </div>
              <Dialog className="max-h-full overflow-y-auto overscroll-y-contain p-4 pb-12">
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