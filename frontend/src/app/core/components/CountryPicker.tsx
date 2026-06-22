import React from "react";
import { Controller } from "react-hook-form";
import { CountryDropdown } from "react-country-region-selector";

interface CountryPickerProps {
  control: any;
  name: string;
  error?: string;
}

export default function CountryPicker({ control, name, error }: CountryPickerProps) {
  return (
    <div className="mt-3">
      <Controller
        control={control}
        name={name}
        render={({ field }) => (
          <>
            <label className="text-sm font-medium mb-1">Country</label>

            <CountryDropdown
              value={field.value || ""}
              onChange={(val) => field.onChange(val)}
              className="country-picker-box"
            />

            {error && (
              <p style={{ color: "red", marginTop: 4, fontSize: 13 }}>{error}</p>
            )}
          </>
        )}
      />
    </div>
  );
}
