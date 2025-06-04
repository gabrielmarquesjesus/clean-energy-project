"use client";

import { useSimulation } from "@/context/SimulationContext";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { formatCurrency } from "@/lib/format";

export default function ResultPage() {
  const { leadData } = useSimulation();
  const router = useRouter();

  useEffect(() => {
    if (
      !leadData.name ||
      !leadData.email ||
      !leadData.cpf ||
      !leadData.phone ||
      !leadData.billValue ||
      !leadData.city ||
      !leadData.state ||
      !leadData.supplyType
    ) {
      router.push("/simulation");
    }
  }, [leadData, router]);

  const bill = parseFloat(leadData.billValue || "0");
  const monthlySavings = bill * 0.25;

  const calc = (years: number) => (monthlySavings * 12 * years);

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl w-full text-center">
      <h1 className="text-4xl font-bold text-green-800 mb-4">Simulação Concluída ✅</h1>
      <p className="text-lg mb-8 text-gray-600">
        Com base na sua conta média de <strong>R$ {formatCurrency(bill)}</strong>, veja quanto você pode economizar ao longo do tempo:
      </p>
      <div className="flex flex-col gap-6">
        <div className="flex gap-6">
          <div className="stat bg-green-100 rounded-xl shadow-md p-4 w-full">
            <div className="stat-title text-neutral-800 font-extrabold">Economia em 1 ano</div>
            <div className="stat-value text-green-700">{formatCurrency(calc(1))}</div>
            <div className="stat-desc text-neutral-800 font-extrabold text-xl">25% ao mês</div>
          </div>

          <div className="stat bg-green-100 rounded-xl shadow-md p-4 w-full">
            <div className="stat-titl text-neutral-800 font-extrabold">Economia em 3 anos</div>
            <div className="stat-value text-green-700">{formatCurrency(calc(3))}</div>
            <div className="stat-desc text-neutral-800 font-extrabold text-xl">Acumulado estimado</div>
          </div>
        </div>

        <div className="stat bg-green-200 border-green-500 border-2 rounded-xl shadow-md p-4 w-full">
          <div className="stat-title text-neutral-800 font-extrabold">Economia em 5 anos</div>
          <div className="stat-value text-green-700">{formatCurrency(calc(5))}</div>
          <div className="stat-desc text-neutral-800 font-extrabold text-xl">Você no controle do seu consumo!</div>
        </div>
      </div>

      <div className="mt-8">
        <button
          onClick={() => router.push("/")}
          className="btn bg-green-600 text-white hover:bg-green-700 rounded-full px-6 py-2 border-0"
        >
          Voltar para início
        </button>
      </div>
    </div>
  );
}
