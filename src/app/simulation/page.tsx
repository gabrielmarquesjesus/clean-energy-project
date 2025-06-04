// app/simulation/page.tsx
"use client";

import Alert from "@/components/Alert";
import { useSimulation } from "@/context/SimulationContext";
import { Lead } from "@/interfaces/Lead";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function ConsumptionForm() {
    const router = useRouter();
    const { leadData, setLeadData } = useSimulation()
    const [errorMessage, setErrorMessage] = useState("")
    const [form, setForm] = useState<Lead>({
        id: leadData.id || "",
        name: leadData.name || "",
        email: leadData.email || "",
        phone: leadData.phone || "",
        cpf: leadData.cpf || "",
        contacted: false,
        billValue: leadData.billValue || "",
        city: leadData.city || "",
        state: leadData.state || "",
        supplyType: leadData.supplyType || "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (!form.billValue || !form.city || !form.state || !form.supplyType) {
            setErrorMessage("Preencha todos os campos!")
            return;
        }
        setLeadData(form)
        router.push("/simulation/lead")
    };

    const handleBack = () => {
        setLeadData(form)
        router.push("/")
    }

    return (
        <div>
            {errorMessage != "" && (
                <Alert alertType="alert-error" onTimeouted={() => setErrorMessage("")} timeout={3000} onClick={() => setErrorMessage("")}>{errorMessage}</Alert>
            )}
            <form
                onSubmit={(e) => handleSubmit(e)}
                className="card w-[700px] bg-white shadow-xl rounded-xl max-w-3xl text-gray-800 p-6"
            >
                <h1 className="text-3xl font-semibold mb-6">Seus dados de consumo</h1>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-extrabold">Valor médio da fatura (R$)</label>
                    <input
                        type="number"
                        name="billValue"
                        value={form.billValue}
                        min={0}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-green-50 border border-green-300 focus:outline-none focus:ring focus:border-green-400"
                        placeholder="Ex: 400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-extrabold">Cidade</label>
                    <input
                        type="text"
                        name="city"
                        value={form.city}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-green-50 border border-green-300 focus:outline-none focus:ring focus:border-green-400"
                        placeholder="Ex: São Paulo"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-extrabold">Estado (sigla)</label>
                    <input
                        type="text"
                        name="state"
                        maxLength={2}
                        value={form.state}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-green-50 border border-green-300 focus:outline-none focus:ring focus:border-green-400"
                        placeholder="SP"
                    />
                </div>

                <div className="mb-6">
                    <label className="block mb-1 text-sm font-extrabold">Tipo de fornecimento</label>
                    <select
                        name="supplyType"
                        value={form.supplyType}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-green-50 border border-green-300 focus:outline-none focus:ring focus:border-green-400"
                    >
                        <option value="">Selecione...</option>
                        <option value="Monofásico">Monofásico</option>
                        <option value="Bifásico">Bifásico</option>
                        <option value="Trifásico">Trifásico</option>
                    </select>
                </div>

                <div className="flex justify-between">
                    <button
                        type="button"
                        onClick={handleBack}
                        className="btn bg-transparent border-0 shadow-none py-2 px-4 rounded text-gray-800 font-extrabold"
                    >
                        Voltar
                    </button>
                    <button
                        type="submit"
                        className="btn w-72 bg-green-600 hover:bg-green-700 transition-all duration-200 border-0 py-2 px-4 rounded text-white font-semibold"
                    >
                        Continuar
                    </button>
                </div>
            </form>
        </div>
    );
}
