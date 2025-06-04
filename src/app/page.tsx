// app/page.tsx
"use client";

import { useRouter } from "next/navigation";

export default function HomePage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-100 to-green-300 flex items-center justify-center p-6">
      <div className="bg-white shadow-xl rounded-xl max-w-3xl w-full p-10 text-gray-800">
        <h1 className="text-4xl font-bold mb-4 text-green-800">
          Bem-vindo à Clean Energy 🌱
        </h1>

        <p className="text-lg mb-6 leading-relaxed">
          A <strong>Clean Energy</strong> oferece soluções em energia renovável para residências e empresas. Acreditamos que um mundo mais limpo e sustentável começa com pequenas escolhas — como mudar sua fonte de energia.
        </p>

        <p className="text-lg mb-6">
          Com a gente, você economiza até <strong>25%</strong> na sua conta de luz, sem precisar instalar painéis solares ou fazer grandes mudanças. Tudo com segurança, agilidade e um time de especialistas para te ajudar.
        </p>

        <div className="flex justify-center">
          <button
            onClick={() => router.push("/simulation")}
            className="bg-green-600 hover:bg-green-700 transition-all duration-200 text-white text-lg font-semibold py-3 px-8 rounded-full shadow-md"
          >
            Simule sua economia agora
          </button>
        </div>
      </div>
    </div>
  );
}
