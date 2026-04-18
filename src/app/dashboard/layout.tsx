import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen overflow-hidden" style={{ background: "#0f131c" }}>
      <Sidebar />
      <main
        className="flex-1 overflow-y-auto neural-mesh"
        style={{ background: "#0a0e16" }}
      >
        {children}
      </main>
    </div>
  );
}
