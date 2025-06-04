"use client";

import { Lead } from "@/interfaces/Lead";
import { createContext, useContext, useState } from "react";

type SimulationContextType = {
    leadData: Lead;
    setLeadData: (data: Lead) => void;
};

const SimulationContext = createContext<SimulationContextType | null>(null);

export function SimulationProvider({ children }: { children: React.ReactNode }) {

    const [leadData, setLeadData] = useState<Lead>({
        name: "",
        email: "",
        phone: "",
        cpf: "",
        billValue: "",
        city: "",
        state: "",
        supplyType: "",
    });

    return (
        <SimulationContext.Provider
            value={{ leadData, setLeadData }}
        >
            {children}
        </SimulationContext.Provider>
    );
}

export function useSimulation() {
    const context = useContext(SimulationContext);
    if (!context) throw new Error("useSimulation deve ser usado dentro do SimulationProvider");
    return context;
}
