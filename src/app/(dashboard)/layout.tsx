import { redirect } from "next/navigation";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import SessionProvider from "@/components/providers/SessionProvider";
import DashboardNav from "@/components/dashboard/DashboardNav";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/login");
  }

  return (
    <SessionProvider>
      <div className="min-h-screen bg-gray-50">
        <DashboardNav />
        <main className="lg:pl-64 pt-16 lg:pt-0">
          <div className="p-6 lg:p-8">{children}</div>
        </main>
      </div>
    </SessionProvider>
  );
}
