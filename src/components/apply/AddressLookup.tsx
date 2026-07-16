"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
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

      <Button type="button" variant="secondary" fullWidth size="lg" onClick={handleFindAddress}>
        Find Address
      </Button>

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
