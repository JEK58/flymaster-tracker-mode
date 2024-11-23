import DeactivateForm from "@/components/RegistrationForm";
import Link from "next/link";

export default function Home() {
  return (
    <main className="container mx-auto p-4 pt-6">
      <h1 className="text-2xl font-bold text-center mb-6 mt-6">
        Deactivate comp mode
      </h1>
      <p className="max-w-md mx-auto my-6">
        You should never enter your Flymaster password anywhere except on the
        Flymaster website. If you trust me, you can still to do it and use this
        tool. The password is not saved. Convince youself:{" "}
        <Link
          href="https://github.com/JEK58/flymaster-tracker-mode"
          className="underline"
        >
          Source Code
        </Link>
      </p>
      <DeactivateForm />
    </main>
  );
}
