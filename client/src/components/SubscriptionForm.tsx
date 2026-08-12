import React from "react";
import { ArrowUpRight } from "lucide-react";
import { canSubmitSubscription } from "@/lib/interactions";

type SubscriptionFormProps = {
  email: string;
  consent: boolean;
  isPending: boolean;
  message: string;
  onEmailChange: (email: string) => void;
  onConsentChange: (consent: boolean) => void;
  onSubmit: () => void;
};

export function SubscriptionForm({ email, consent, isPending, message, onEmailChange, onConsentChange, onSubmit }: SubscriptionFormProps) {
  return <form className="subscriber-form" onSubmit={(event) => { event.preventDefault(); onSubmit(); }}>
    <label htmlFor="subscriber-email">NasTech update email</label>
    <div><input id="subscriber-email" value={email} onChange={(event) => onEmailChange(event.target.value)} type="email" required placeholder="you@example.com" autoComplete="email" /><button className="button button--primary" type="submit" disabled={!canSubmitSubscription(email, consent) || isPending}>{isPending ? "Joining…" : "Get updates"} <ArrowUpRight size={17} /></button></div>
    <label className="consent-row"><input type="checkbox" checked={consent} onChange={(event) => onConsentChange(event.target.checked)} /> <span>I agree to receive NasTech launch and update announcements. The project owner is alerted when I subscribe.</span></label>
    {message ? <p className="subscriber-status" role="status">{message}</p> : null}
  </form>;
}
