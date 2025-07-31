"use client";

import Image from "next/image";
import { useState } from "react";
import authorizedUsers from "@/authorized-users.json";

export default function LoginPage() {
  const [message, setMessage] = useState<string>("");

  const handleLogin = () => {
    const email = prompt("Ingresa tu correo institucional") || "";
    if (!email.endsWith("@umce.cl")) {
      setMessage("Tu correo no pertenece al dominio institucional");
      return;
    }
    if (!authorizedUsers.includes(email)) {
      setMessage("Tu cuenta no está habilitada para acceder.");
      return;
    }
    setMessage("Login exitoso (simulado)");
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-8 px-4">
      <header className="flex flex-col items-center gap-2">
        <Image src="/umce-logo.png" alt="UMCE" width={80} height={80} />
        <h1 className="text-2xl font-semibold">AcompañaUMCE</h1>
        <span className="text-sm text-gray-500">Versión Beta</span>
      </header>

      <main className="flex flex-col items-center gap-6">
        <p className="text-lg">Bienvenido a AcompañaUMCE</p>
        <button
          onClick={handleLogin}
          className="flex items-center gap-2 bg-white border rounded-lg px-6 py-3 shadow hover:bg-gray-50"
        >
          <Image src="/google-logo.png" alt="Google" width={20} height={20} />
          <span className="font-medium">Iniciar sesión con Google</span>
        </button>
        {message && <p className="text-red-600 mt-4 text-sm text-center">{message}</p>}
      </main>

      <footer className="text-xs text-center text-gray-500 mt-8">
        Plataforma desarrollada por la Unidad de Desarrollo y Formación Virtual –
        UDFV. Contacto: <a href="mailto:udfv@umce.cl" className="underline">udfv@umce.cl</a>
      </footer>
    </div>
  );
}
