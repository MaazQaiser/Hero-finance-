"use client";

import Image from "next/image";
import { useEffect, useId, useMemo, useRef, useState } from "react";
import { formatPrice, searchVehicles, type Vehicle } from "@/data/vehicles";

interface VehicleSearchInputProps {
  value: string;
  onChange: (value: string) => void;
  onSelect: (vehicle: Vehicle) => void;
}

function highlightMatch(text: string, query: string) {
  if (!query.trim()) return text;

  const lowerText = text.toLowerCase();
  const lowerQuery = query.trim().toLowerCase();
  const index = lowerText.indexOf(lowerQuery);

  if (index === -1) return text;

  return (
    <>
      {text.slice(0, index)}
      <mark className="rounded bg-coral/20 px-0.5 text-cream no-underline">
        {text.slice(index, index + query.trim().length)}
      </mark>
      {text.slice(index + query.trim().length)}
    </>
  );
}

export function VehicleSearchInput({ value, onChange, onSelect }: VehicleSearchInputProps) {
  const listboxId = useId();
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const [open, setOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);

  const results = useMemo(() => searchVehicles(value), [value]);
  const showDropdown = open && value.trim().length > 0;

  useEffect(() => {
    setActiveIndex(results.length > 0 ? 0 : -1);
  }, [results]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (!containerRef.current?.contains(event.target as Node)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectVehicle = (vehicle: Vehicle) => {
    onSelect(vehicle);
    onChange(`${vehicle.make} ${vehicle.model}`);
    setOpen(false);
    setActiveIndex(-1);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (!showDropdown) {
      if (event.key === "ArrowDown" && value.trim()) setOpen(true);
      return;
    }

    if (event.key === "ArrowDown") {
      event.preventDefault();
      setActiveIndex((index) => Math.min(index + 1, results.length - 1));
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      setActiveIndex((index) => Math.max(index - 1, 0));
    }

    if (event.key === "Enter" && activeIndex >= 0 && results[activeIndex]) {
      event.preventDefault();
      selectVehicle(results[activeIndex]);
    }

    if (event.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <label htmlFor="vehicleSearch" className="mb-2 block text-sm font-medium text-cream">
        Search for a car <span className="text-cream-muted">(optional)</span>
      </label>

      <div className="relative">
        <span
          aria-hidden
          className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-cream-muted"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
        </span>

        <input
          ref={inputRef}
          id="vehicleSearch"
          type="search"
          role="combobox"
          aria-expanded={showDropdown}
          aria-controls={listboxId}
          aria-autocomplete="list"
          aria-activedescendant={
            activeIndex >= 0 ? `${listboxId}-option-${activeIndex}` : undefined
          }
          value={value}
          onChange={(event) => {
            onChange(event.target.value);
            setOpen(true);
          }}
          onFocus={() => {
            if (value.trim()) setOpen(true);
          }}
          onKeyDown={handleKeyDown}
          placeholder="e.g. BMW 3 Series"
          autoComplete="off"
          className="min-h-12 w-full rounded-2xl border border-cream/15 bg-charcoal/40 py-3 pl-12 pr-4 text-base text-cream placeholder:text-cream-muted focus:border-coral/40 focus:outline-none focus:ring-2 focus:ring-coral/20"
        />
      </div>

      {!showDropdown && !value.trim() && (
        <p className="mt-2 text-xs text-cream-muted">
          Don&apos;t worry if you&apos;re not sure yet — you can choose later
        </p>
      )}

      {showDropdown && (
        <div
          id={listboxId}
          role="listbox"
          className="absolute left-0 right-0 top-[calc(100%+0.5rem)] z-50 overflow-hidden rounded-2xl border border-cream/10 bg-surface shadow-2xl"
        >
          {results.length > 0 ? (
            <ul className="max-h-72 overflow-y-auto py-2">
              {results.map((vehicle, index) => {
                const label = `${vehicle.make} ${vehicle.model}`;
                const isActive = index === activeIndex;

                return (
                  <li key={vehicle.id} role="presentation">
                    <button
                      id={`${listboxId}-option-${index}`}
                      type="button"
                      role="option"
                      aria-selected={isActive}
                      onMouseEnter={() => setActiveIndex(index)}
                      onClick={() => selectVehicle(vehicle)}
                      className={`flex w-full items-center gap-3 px-3 py-3 text-left transition-colors ${
                        isActive ? "bg-coral/10" : "hover:bg-cream/5"
                      }`}
                    >
                      <div className="relative h-12 w-16 shrink-0 overflow-hidden rounded-xl bg-charcoal/60">
                        <Image
                          src={vehicle.images[0]}
                          alt=""
                          fill
                          className="object-cover"
                          sizes="64px"
                        />
                      </div>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-medium text-cream">
                          {highlightMatch(label, value)}
                        </p>
                        <p className="mt-0.5 text-xs text-cream-muted">
                          {vehicle.year} · {formatPrice(vehicle.price)} · from{" "}
                          {formatPrice(vehicle.monthlyHp)}/mo
                        </p>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="px-4 py-6 text-center">
              <p className="text-sm text-cream">No cars found for &ldquo;{value}&rdquo;</p>
              <p className="mt-1 text-xs text-cream-muted">
                Try a make or model like Audi, Golf, or Focus
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
