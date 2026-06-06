import { requireAuth } from "./_utils";
import AdminNav from "./AdminNav";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Protect the whole admin section
  await requireAuth();

  return (
    <>
      <AdminNav />
      <div className="mx-auto max-w-5xl px-4 py-6">
        {children}
      </div>
    </>
  );
}
