"use client";

import { Admin } from "@/interfaces/Admin";
import { useState } from "react";

export default function Login() {
  const [form, setForm] = useState<Admin>({
    email: "",
    password: "",
  });

  const handleLogin = () => {
    fetch("/api/admin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    })
      .then(async (response) => {
        if (response.ok) {
          // Força navegação full server-side (com middleware e cookie disponível)
          window.location.href = "/admin/leads";
        } else if (response.status === 401) {
          alert("Credenciais Inválidas");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };


  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="bg-white shadow-xl rounded-xl max-w-3xl w-full p-10 text-gray-800">
      <div className="flex justify-between">
        <h1 className="text-4xl font-bold mb-4 text-green-800">
          Clean Energy 🌱
        </h1>
        <p className="text-md font-bold">Acesso administrativo</p>
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-extrabold">Email</label>
        <input
          type="text"
          name="email"
          value={form.email}
          onChange={handleChange}
          className="w-full p-2 rounded bg-green-50 border border-green-300 focus:outline-none focus:ring focus:border-green-400"
        />
      </div>

      <div className="mb-4">
        <label className="block mb-1 text-sm font-extrabold">Senha</label>
        <input
          type="password"
          name="password"
          value={form.password}
          onChange={handleChange}
          className="w-full p-2 rounded bg-green-50 border border-green-300 focus:outline-none focus:ring focus:border-green-400"
        />
      </div>

      <div className="flex justify-center">
        <button
          onClick={() => handleLogin()}
          className="bg-green-600 hover:bg-green-700 transition-all duration-200 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-md"
        >
          Entrar
        </button>
      </div>
    </div>
  );
}
