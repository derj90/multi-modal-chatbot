"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const router = useRouter();
  const [message, setMessage] = useState<string>("");

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    const { data } = await supabase
      .from("authorized_users")
      .select("rol")
      .eq("email", session.user.email)
      .single();

    if (!data) {
      await supabase.auth.signOut();
      setMessage("Usuario no autorizado para usar esta plataforma.");
      return;
    }

    localStorage.setItem("rol", data.rol);

    if (data.rol === "admin") router.push("/admin");
    else if (data.rol === "docente") router.push("/docente");
    else if (data.rol === "estudiante") router.push("/estudiante");
    else {
      await supabase.auth.signOut();
      setMessage("Usuario no autorizado para usar esta plataforma.");
    }
  };

  useEffect(() => {
    checkUser();
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(() => {
      checkUser();
    });
    return () => {
      subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    setMessage("");
    await supabase.auth.signInWithOAuth({ provider: "google" });
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-between py-20 px-4 bg-white dark:bg-zinc-900">
      <header className="flex flex-col items-center gap-2">
        <Image src="/umce-logo.png" alt="UMCE" width={80} height={80} />
        <h1 className="text-2xl font-semibold text-zinc-900 dark:text-zinc-50">AcompañaUMCE</h1>
        <span className="text-sm text-zinc-500 dark:text-zinc-400">Versión Beta</span>
      </header>

      <main className="flex flex-col items-center gap-6">
        <p className="text-lg text-zinc-700 dark:text-zinc-300">Bienvenido a AcompañaUMCE</p>
        <button
          onClick={handleLogin}
          className="flex items-center gap-2 bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg px-6 py-3 shadow hover:bg-zinc-50 dark:hover:bg-zinc-700"
        >
          <Image src="/google-logo.png" alt="Google" width={20} height={20} />
          <span className="font-medium text-zinc-700 dark:text-zinc-100">Iniciar sesión con Google</span>
        </button>
        {message && (
          <p className="text-red-600 mt-4 text-sm text-center" dangerouslySetInnerHTML={{ __html: message }} />
        )}
      </main>

      <footer className="text-xs text-center text-zinc-500 dark:text-zinc-400 mt-8">
        Plataforma desarrollada por la Unidad de Desarrollo y Formación Virtual –
        UDFV. Contacto: <a href="mailto:udfv@umce.cl" className="underline">udfv@umce.cl</a>
      </footer>
    </div>
  );
}
