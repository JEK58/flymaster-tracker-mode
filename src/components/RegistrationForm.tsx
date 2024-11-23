"use client";

import { submitForm } from "@/app/actions/submit-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useActionState } from "react";

const initialState = {
  errors: {},
  message: undefined,
};

export default function DeactivateForm() {
  const [state, formAction] = useActionState(submitForm, initialState);

  return (
    <form action={formAction} className="space-y-5 max-w-md mx-auto">
      <div className="space-y-2">
        <Label htmlFor="email">Flymaster Login Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          required
          className={state.errors?.email ? "border-red-500" : ""}
        />
        {state.errors?.email && (
          <p className="text-red-500 text-sm">{state.errors.email[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="password">Flymaster Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          className={state.errors?.password ? "border-red-500" : ""}
        />
        {state.errors?.password && (
          <p className="text-red-500 text-sm">{state.errors.password[0]}</p>
        )}
      </div>

      <div className="space-y-2">
        <Label htmlFor="serialNumber">Tracker Serial Number</Label>
        <Input
          id="serialNumber"
          name="serialNumber"
          type="text"
          required
          placeholder="e.g. 666666"
          className={state.errors?.serialNumber ? "border-red-500" : ""}
        />
        {state.errors?.serialNumber && (
          <p className="text-red-500 text-sm">{state.errors.serialNumber[0]}</p>
        )}
      </div>

      <Button type="submit" className="w-full">
        Deactivate
      </Button>

      {state.message && (
        <p
          className={`text-center ${
            state.errors ? "text-red-500" : "text-green-500"
          }`}
        >
          {state.message}
        </p>
      )}
    </form>
  );
}
