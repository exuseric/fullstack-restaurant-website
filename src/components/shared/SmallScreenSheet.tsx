import {
  animate,
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

const SHEET_MARGIN = 250;

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
                top: SHEET_MARGIN,
                y,
                // maxHeight: `calc(100vh - ${SHEET_MARGIN}px)`,
                // Extra padding at the bottom to account for rubber band scrolling.
                paddingBottom:
                  typeof window !== "undefined" ? window.screen.height : 0,
              }}
              drag="y"
              dragConstraints={{ top: -SHEET_MARGIN, bottom: 0 }}
              dragElastic={{ top: 0.1, bottom: 0.2 }}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.y > window.innerHeight * 0.5 || velocity.y > 500) {
                  // Dragged down significantly - close the sheet
                  setIsOpen(false);
                } else {
                  // Snap back to position based on drag direction
                  const target = offset.y < -100 ? -SHEET_MARGIN : 0;
                  animate(y, target, { ...inertiaTransition, min: -SHEET_MARGIN, max: 0 });
                }
              }}
            >
              {/* drag affordance */}
              <div className="bg-surface-inverse mx-auto mt-2 h-1.5 w-12 rounded-full" />
              <Dialog className="p-4 overflow-y-auto overscroll-y-contain pb-4"
                style={{ maxHeight: `calc(100vh - ${SHEET_MARGIN}px)` }}>
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
