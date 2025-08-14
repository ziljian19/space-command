import { requireAuth } from "./_utils";

export default async function AdminHome() {
  await requireAuth();
  return (
    <main className="p-6">
      <h1 className="text-2xl font-semibold">Admin Dashboard</h1>
      <p className="mt-2">Welcome to Space Command.</p>
    </main>
  );
}
