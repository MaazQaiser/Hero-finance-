"use client";

import { useState } from "react";
import { ApplyInput, ApplySelect } from "@/components/apply/ApplyField";
import { lookupAddresses } from "@/lib/apply/mockAddresses";

interface AddressLookupProps {
  postcodeId: string;
  addressId: string;
  postcode: string;
  address: string;
  onPostcodeChange: (postcode: string) => void;
  onAddressChange: (address: string) => void;
  errors?: { postcode?: string; address?: string };
  autoFocus?: boolean;
}

export function AddressLookup({
  postcodeId,
  addressId,
  postcode,
  address,
  onPostcodeChange,
  onAddressChange,
  errors,
  autoFocus = false,
}: AddressLookupProps) {
  const [lookupDone, setLookupDone] = useState(() => lookupAddresses(postcode).length > 0);
  const addressOptions = lookupDone ? lookupAddresses(postcode) : [];
  const postcodeValid = postcode.trim().length > 0 && !errors?.postcode;
  const addressValid = Boolean(address.trim()) && !errors?.address;

  const handleFindAddress = () => {
    setLookupDone(true);
    if (address && !lookupAddresses(postcode).includes(address)) {
      onAddressChange("");
    }
  };

  return (
    <div className="space-y-4">
      <ApplyInput
        id={postcodeId}
        label="Postcode"
        required
        autoFocus={autoFocus}
        autoComplete="postal-code"
        autoCapitalize="characters"
        spellCheck={false}
        value={postcode}
        onChange={(e) => {
          onPostcodeChange(e.target.value.toUpperCase());
          setLookupDone(false);
        }}
        error={errors?.postcode}
        valid={postcodeValid}
        placeholder="M1 1AA"
        hint="UK postcode — we'll find your address."
      />

      <button
        type="button"
        onClick={handleFindAddress}
        style={{
          width: "100%",
          padding: "14px 18px",
          background: "var(--agreen-wash)",
          border: "1.5px solid var(--aline)",
          borderRadius: "var(--aradius)",
          fontFamily: "inherit",
          fontSize: 16,
          fontWeight: 600,
          color: "var(--aink)",
          cursor: "pointer",
          letterSpacing: "-0.01em",
          transition: "background 0.15s, border-color 0.15s",
        }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "#e8e0f5";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--aline-strong)";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLButtonElement).style.background = "var(--agreen-wash)";
          (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--aline)";
        }}
      >
        Find my address
      </button>

      {lookupDone && addressOptions.length > 0 && (
        <ApplySelect
          id={addressId}
          label="Select your address"
          required
          value={address}
          onChange={(e) => onAddressChange(e.target.value)}
          error={errors?.address}
          valid={addressValid}
        >
          <option value="">Choose an address</option>
          {addressOptions.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </ApplySelect>
      )}

      {lookupDone && addressOptions.length === 0 && postcode.trim() && (
        <p className="text-sm text-muted">
          Try M1 1AA, B1 1BB, LS1 1CC, E1 1DD, or SW1A 1AA to see sample addresses.
        </p>
      )}

      {address && (
        <div className="rounded-[var(--radius-card)] border border-green/20 bg-green/10 p-4">
          <p className="text-xs font-medium tracking-wide text-green-deep">Selected address</p>
          <p className="mt-2 text-sm leading-relaxed text-ink">{address}</p>
        </div>
      )}
    </div>
  );
}
