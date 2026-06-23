"use client";

import { useState } from "react";
import { ApplyInput, ApplySelect } from "@/components/apply/ApplyField";
import { Button } from "@/components/ui/Button";
import { fuelTypes, transmissions, vehicleTypes } from "@/data/sourcing";

interface FormState {
  name: string;
  mobile: string;
  email: string;
  vehicleType: string;
  make: string;
  model: string;
  budget: string;
  monthlyPayment: string;
  fuel: string;
  transmission: string;
  notes: string;
}

const initialForm: FormState = {
  name: "",
  mobile: "",
  email: "",
  vehicleType: "",
  make: "",
  model: "",
  budget: "",
  monthlyPayment: "",
  fuel: "",
  transmission: "",
  notes: "",
};

export function BuyToOrderForm() {
  const [form, setForm] = useState<FormState>(initialForm);
  const [showPreferences, setShowPreferences] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});

  const update = (updates: Partial<FormState>) => {
    setForm((current) => ({ ...current, ...updates }));
    setErrors({});
  };

  const validate = (): boolean => {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.name.trim()) next.name = "Enter your name";
    if (!form.mobile.trim()) next.mobile = "Enter your mobile number";
    if (!form.email.trim()) next.email = "Enter your email";
    if (!form.vehicleType) next.vehicleType = "Select a vehicle type";
    if (!form.budget.trim()) next.budget = "Enter your budget";
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;
    setSubmitted(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (submitted) {
    return (
      <section id="request-form" className="section-padding">
        <div className="mx-auto max-w-2xl text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-success/15 text-2xl text-success">
            ✓
          </div>
          <h2 className="mt-6 text-2xl font-medium text-cream">We&apos;re on it</h2>
          <p className="mt-3 text-cream-muted">
            Thanks{form.name ? `, ${form.name.split(" ")[0]}` : ""}. A sourcing specialist will
            contact you within 24 hours to discuss your requirements.
          </p>
          <Button href="/cars" variant="secondary" className="mt-8">
            Browse current stock
          </Button>
        </div>
      </section>
    );
  }

  return (
    <>
      <section id="request-form" className="section-padding scroll-mt-24 pb-32 md:pb-24">
        <div className="mx-auto max-w-2xl">
          <p className="eyebrow">Your brief</p>
          <h2 className="mt-3 text-2xl font-medium text-cream md:text-3xl">
            Tell us what you&apos;re looking for
          </h2>
          <p className="mt-3 text-sm text-cream-muted">
            The more detail you share, the better we can match your perfect car.
          </p>

          <div className="mt-8 space-y-6">
            <div className="rounded-[var(--radius-card)] border border-cream/10 bg-surface p-5 md:p-6">
              <p className="mb-4 text-sm font-medium text-cream">Your details</p>
              <div className="space-y-4">
                <ApplyInput
                  id="bto-name"
                  label="Full name"
                  required
                  value={form.name}
                  onChange={(e) => update({ name: e.target.value })}
                  error={errors.name}
                  autoComplete="name"
                />
                <ApplyInput
                  id="bto-mobile"
                  label="Mobile number"
                  required
                  type="tel"
                  value={form.mobile}
                  onChange={(e) => update({ mobile: e.target.value })}
                  error={errors.mobile}
                  autoComplete="tel"
                />
                <ApplyInput
                  id="bto-email"
                  label="Email"
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update({ email: e.target.value })}
                  error={errors.email}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="rounded-[var(--radius-card)] border border-cream/10 bg-surface p-5 md:p-6">
              <p className="mb-4 text-sm font-medium text-cream">Vehicle requirements</p>
              <div className="space-y-4">
                <ApplySelect
                  id="bto-type"
                  label="Vehicle type"
                  required
                  value={form.vehicleType}
                  onChange={(e) => update({ vehicleType: e.target.value })}
                  error={errors.vehicleType}
                >
                  <option value="">Select type</option>
                  {vehicleTypes.map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </ApplySelect>
                <div className="grid gap-4 sm:grid-cols-2">
                  <ApplyInput
                    id="bto-make"
                    label="Make"
                    value={form.make}
                    onChange={(e) => update({ make: e.target.value })}
                    placeholder="e.g. BMW"
                  />
                  <ApplyInput
                    id="bto-model"
                    label="Model"
                    value={form.model}
                    onChange={(e) => update({ model: e.target.value })}
                    placeholder="e.g. X3"
                  />
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <ApplyInput
                    id="bto-budget"
                    label="Total budget"
                    required
                    value={form.budget}
                    onChange={(e) => update({ budget: e.target.value })}
                    error={errors.budget}
                    placeholder="£25,000"
                  />
                  <ApplyInput
                    id="bto-monthly"
                    label="Preferred monthly payment"
                    value={form.monthlyPayment}
                    onChange={(e) => update({ monthlyPayment: e.target.value })}
                    placeholder="£350"
                  />
                </div>
              </div>
            </div>

            <div className="rounded-[var(--radius-card)] border border-cream/10 bg-surface p-5 md:p-6">
              <button
                type="button"
                onClick={() => setShowPreferences((value) => !value)}
                className="flex min-h-11 w-full items-center justify-between text-sm font-medium text-cream"
              >
                <span>More preferences (optional)</span>
                <span className="text-coral">{showPreferences ? "−" : "+"}</span>
              </button>

              {showPreferences && (
                <div className="mt-4 space-y-4 border-t border-cream/10 pt-4">
                  <ApplySelect
                    id="bto-fuel"
                    label="Fuel type"
                    value={form.fuel}
                    onChange={(e) => update({ fuel: e.target.value })}
                  >
                    <option value="">No preference</option>
                    {fuelTypes.map((fuel) => (
                      <option key={fuel} value={fuel}>
                        {fuel}
                      </option>
                    ))}
                  </ApplySelect>
                  <ApplySelect
                    id="bto-transmission"
                    label="Transmission"
                    value={form.transmission}
                    onChange={(e) => update({ transmission: e.target.value })}
                  >
                    <option value="">No preference</option>
                    {transmissions.map((transmission) => (
                      <option key={transmission} value={transmission}>
                        {transmission}
                      </option>
                    ))}
                  </ApplySelect>
                  <div>
                    <label htmlFor="bto-notes" className="mb-2 block text-sm font-medium text-cream">
                      Notes & preferences
                    </label>
                    <textarea
                      id="bto-notes"
                      rows={4}
                      value={form.notes}
                      onChange={(e) => update({ notes: e.target.value })}
                      placeholder="Colour, mileage, must-have features..."
                      className="w-full rounded-2xl border border-cream/15 bg-charcoal/40 px-4 py-3 text-base text-cream placeholder:text-cream-muted focus:border-coral/40 focus:outline-none focus:ring-2 focus:ring-coral/20"
                    />
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="mt-8 hidden md:block">
            <Button fullWidth size="lg" onClick={handleSubmit}>
              Find My Car
            </Button>
          </div>
        </div>
      </section>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-cream/10 bg-charcoal/95 p-4 backdrop-blur-2xl md:hidden">
        <Button fullWidth size="lg" onClick={handleSubmit}>
          Find My Car
        </Button>
      </div>
    </>
  );
}
