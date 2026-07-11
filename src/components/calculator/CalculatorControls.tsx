"use client";

import { creditProfiles, termOptions, type CreditProfileId } from "@/lib/finance/creditProfiles";

interface CreditProfileSelectorProps {
  value: CreditProfileId;
  onChange: (value: CreditProfileId) => void;
}

export function CreditProfileSelector({ value, onChange }: CreditProfileSelectorProps) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-4">
      <p className="mb-3 text-sm font-semibold text-ink">Credit profile</p>
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {creditProfiles.map((profile) => {
          const selected = value === profile.id;

          return (
            <button
              key={profile.id}
              type="button"
              onClick={() => onChange(profile.id)}
              className={`rounded-xl px-3 py-3 text-left transition-all duration-200 ${
                selected
                  ? "bg-green text-white shadow-[0_8px_24px_rgba(91,43,212,0.25)]"
                  : "bg-mist-2 text-ink hover:border-green/20"
              }`}
            >
              <span className="block text-sm font-semibold">{profile.label}</span>
              <span
                className={`mt-0.5 block text-xs ${selected ? "text-white/80" : "text-muted"}`}
              >
                {profile.apr}% APR
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
}

interface TermSelectorProps {
  value: number;
  onChange: (value: number) => void;
}

export function TermSelector({ value, onChange }: TermSelectorProps) {
  return (
    <div className="rounded-2xl border border-line bg-paper p-4">
      <p className="mb-3 text-sm font-semibold text-ink">Loan term</p>
      <div className="flex flex-wrap gap-2">
        {termOptions.map((term) => {
          const selected = value === term;

          return (
            <button
              key={term}
              type="button"
              onClick={() => onChange(term)}
              className={`min-h-11 rounded-full px-4 text-sm font-semibold transition-all duration-200 ${
                selected
                  ? "bg-green text-white shadow-[0_6px_18px_rgba(91,43,212,0.22)]"
                  : "bg-mist-2 text-ink hover:bg-mist"
              }`}
            >
              {term} months
            </button>
          );
        })}
      </div>
    </div>
  );
}
