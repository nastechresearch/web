export function canSubmitSubscription(email: string, consent: boolean) {
  return consent && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

export function toggleMobileMenu(isOpen: boolean) {
  return !isOpen;
}
