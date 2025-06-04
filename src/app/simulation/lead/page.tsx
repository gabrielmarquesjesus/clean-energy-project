"use client";

import Alert from "@/components/Alert";
import { useSimulation } from "@/context/SimulationContext";
import { Lead } from "@/interfaces/Lead";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function LeadFormPage() {
    const router = useRouter();
    const { leadData, setLeadData } = useSimulation();
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

    useEffect(() => {
        if (
            !leadData.billValue ||
            !leadData.city ||
            !leadData.state ||
            !leadData.supplyType
        ) {
            router.push("/simulation");
        }
    }, [leadData, router]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setForm((prev) => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        const { name, email, phone, cpf } = form;
        if (!name || !email || !phone || !cpf) {
            setErrorMessage("Preencha todos os campos!");
            return;
        }

        if (!validatePhone()) {
            setErrorMessage("Por favor, insira um número de telefone válido e com DDD.");
            return
        }

        setLeadData(form)
        router.push("/simulation/result")
        fetch("/api/lead", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(form)
        })
    };

    const handleBack = () => {
        setLeadData(form)
        router.push("/simulation")
    }

    function validatePhone() {
        const isValid = /^(\d{10}|\d{11})$/.test(form.phone.replace(/\D/g, ''));
        return isValid
    }

    return (
        <div>
            {errorMessage != "" && (
                <Alert alertType="alert-error" onTimeouted={() => setErrorMessage("")} timeout={3000} onClick={() => setErrorMessage("")}>{errorMessage}</Alert>
            )}
            <form
                onSubmit={handleSubmit}
                className="card w-[700px] bg-white shadow-xl rounded-xl max-w-3xl text-gray-800 p-6"
            >
                <h1 className="text-3xl font-semibold mb-6">Seus dados pessoais</h1>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Nome completo</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-green-50 border border-green-300 focus:outline-none focus:ring focus:border-green-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">E-mail</label>
                    <input
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-green-50 border border-green-300 focus:outline-none focus:ring focus:border-green-400"
                    />
                </div>

                <div className="mb-4">
                    <label className="block mb-1 text-sm font-medium">Telefone</label>
                    <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-green-50 border border-green-300 focus:outline-none focus:ring focus:border-green-400"
                        placeholder="Digite seu telefone"
                    />

                </div>

                <div className="mb-6">
                    <label className="block mb-1 text-sm font-medium">CPF</label>
                    <input
                        type="text"
                        name="cpf"
                        value={form.cpf}
                        onChange={handleChange}
                        className="w-full p-2 rounded bg-green-50 border border-green-300 focus:outline-none focus:ring focus:border-green-400"
                        placeholder="123.456.789-00"
                        pattern="\d{3}\.\d{3}\.\d{3}-\d{2}"
                    />
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
                        Simular
                    </button>
                </div>
            </form>
        </div>
    );
}
