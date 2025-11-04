let confettiPromise: Promise<typeof import('canvas-confetti')> | null = null;

function loadConfetti() {
  if (!confettiPromise) {
    confettiPromise = import('canvas-confetti');
  }

  return confettiPromise;
}

export async function celebrateCopy() {
  if (typeof window === 'undefined') return;
  try {
    const confetti = await loadConfetti();
    confetti.default({
      particleCount: 120,
      spread: 68,
      origin: { y: 0.75 },
      decay: 0.92,
    });
  } catch (error) {
    console.error('Confetti failed', error);
  }
}
