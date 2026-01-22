import {
  animate,
  AnimatePresence,
  cubicBezier,
  motion,
  useMotionValue,
} from "motion/react";
import { type Dispatch, type ReactNode, type SetStateAction } from "react";
import { Modal, ModalOverlay } from "react-aria-components";

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
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  children: ReactNode;
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
            className="glass-frosted fixed inset-0 z-50"
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
                // Extra padding at the bottom to account for rubber band scrolling.
                paddingBottom:
                  typeof window !== "undefined" ? window.screen.height : 0,
              }}
              drag="y"
              dragConstraints={{ top: 0 }}
              onDragEnd={(e, { offset, velocity }) => {
                if (offset.y > window.innerHeight * 0.75 || velocity.y > 10) {
                  setIsOpen(false);
                } else {
                  animate(y, 0, { ...inertiaTransition, min: 0, max: 0 });
                }
              }}
            >
              {/* drag affordance */}
              <div className="bg-surface-inverse mx-auto mt-2 h-1.5 w-12 rounded-full" />
              {children}
            </MotionModal>
          </MotionModalOverlay>
        )}
      </AnimatePresence>
    </>
  );
}
