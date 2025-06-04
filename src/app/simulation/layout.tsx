import { SimulationProvider } from "@/context/SimulationContext";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SimulationProvider>
      <div className="h-screen flex items-center justify-center bg-gradient-to-r from-green-100 to-green-300">
        {children}
      </div>
    </SimulationProvider>
  );
}
