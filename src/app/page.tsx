import DeactivateForm from "@/components/RegistrationForm";

export default function Home() {
  return (
    <main className="container mx-auto p-4 pt-6">
      <h1 className="text-2xl font-bold text-center mb-6 mt-6">
        Deactivate comp mode
      </h1>
      <DeactivateForm />
    </main>
  );
}
