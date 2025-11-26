// Shared animation variants for motion components
export const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
};

export const fadeInUpTransition = (delay: number = 0) => ({
  duration: 0.4,
  ease: "easeOut" as const,
  delay,
});

// Default delays for dashboard widgets
export const WIDGET_DELAYS = {
  summary: 0,
  workingCapital: 0.4,
  recentTransactions: 0.5,
  wallet: 0.6,
  scheduledTransfers: 0.7,
} as const;
