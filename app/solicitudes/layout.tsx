"use client";
import "../(preview)/globals.css";
import { Toaster } from "sonner";

export const metadata = {
  title: "Solicitudes",
};

export default function SolicitudesLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="es">
      <body>
        <Toaster position="top-center" richColors />
        {children}
      </body>
    </html>
  );
}
