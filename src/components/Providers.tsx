"use client";

import { LazyMotion, MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { WebinarProvider } from "./webinar/WebinarProvider";

const loadFeatures = () => import("./motion-features").then((mod) => mod.default);

export function Providers({ children }: { children: ReactNode }) {
  return (
    <LazyMotion features={loadFeatures} strict>
      <MotionConfig reducedMotion="user">
        <WebinarProvider>{children}</WebinarProvider>
      </MotionConfig>
    </LazyMotion>
  );
}
