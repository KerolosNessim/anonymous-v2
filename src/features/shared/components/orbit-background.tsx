import * as motion from "motion/react-client";

const DOT_COUNT = 16;

// evenly spaced around the ring (offset half a step so none sits at the exact top/bottom), each pulsing on its own beat
const dots = Array.from({ length: DOT_COUNT }, (_, i) => ({
  angle: (360 / DOT_COUNT) * (i + 0.5),
  delay: (i * 0.45) % 3.2,
}));

// The wrapper padding matches StatusHero so the ring is centered on its content.
// The ring fits the screen width, so it is a full circle on phones, and caps at 56rem on large screens.
export default function OrbitBackground() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center pt-28 pb-16">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: "easeOut" }}
        className="relative size-[min(94vw,56rem)] shrink-0"
      >
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 rounded-full border border-custom-primary/25"
        >
          {dots.map(({ angle, delay }) => {
            const rad = (angle * Math.PI) / 180;
            return (
              <span
                key={angle}
                className="absolute -translate-x-1/2 -translate-y-1/2"
                style={{ left: `${50 + 50 * Math.cos(rad)}%`, top: `${50 + 50 * Math.sin(rad)}%` }}
              >
                <motion.span
                  animate={{ scale: [1, 2.6, 1], opacity: [0.5, 0, 0.5] }}
                  transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut", delay }}
                  className="absolute inset-0 rounded-full bg-custom-primary/60"
                />
                <span className="relative block size-2.5 rounded-full bg-custom-primary shadow-[0_0_18px_6px_rgba(0,255,224,0.35)] md:size-3" />
              </span>
            );
          })}
        </motion.div>
      </motion.div>
    </div>
  );
}
