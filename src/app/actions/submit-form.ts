"use server";

import { z } from "zod";
import CryptoJS from "crypto-js";

const FormSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string(),
  serialNumber: z.string(),
});

interface ReturnType {
  errors: {
    email?: string[];
    password?: string[];
    serialNumber?: string[];
    submit?: string[];
  };
  message?: string;
}
export async function submitForm(
  _: ReturnType,
  formData: FormData
): Promise<ReturnType> {
  const validatedFields = FormSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
    serialNumber: formData.get("serialNumber"),
  });

  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Invalid form data. Please check your inputs.",
    };
  }

  // Hash the password using MD5
  const hashedPassword = CryptoJS.MD5(validatedFields.data.password).toString();

  // Prepare query parameters
  const queryParams = new URLSearchParams({
    user: validatedFields.data.email,
    deviceSn: validatedFields.data.serialNumber,
    pwd: hashedPassword,
    command: "4",
    payload: "0",
  });

  try {
    const url = `https://wlb.flymaster.net/sendCmds.php?${queryParams.toString()}`;

    const response = await fetch(url, { method: "POST" });

    if (response.ok && response.body) {
      const json = await response.json();

      if (json.rcode === 1)
        return { errors: {}, message: "Comp mode successfully deactivated" };

      if (json.msg)
        return {
          errors: { submit: ["Flymaster error"] },
          message: json.msg,
        };
    }

    return {
      errors: { submit: ["Failed to submit details. Please try again."] },
      message: response.statusText,
    };
  } catch (error) {
    console.log(error);
    return {
      errors: { submit: ["Failed to submit details. Please try again."] },
      message: "Failed to submit details. Please try again.",
    };
  }
}
