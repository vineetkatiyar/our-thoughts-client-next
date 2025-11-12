import Navbar from "@/components/client/navbar";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div>
      <Navbar />
      <main className="max-w-2xl mx-auto">{children}</main>
    </div>
  );
}
