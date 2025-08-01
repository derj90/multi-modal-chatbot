"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

interface Solicitud {
  id: number;
  nombre: string;
  correo: string;
  mensaje: string;
  fecha_creacion: string;
}

export default function SolicitudesPage() {
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>([]);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    mensaje: "",
  });
  const [editingId, setEditingId] = useState<number | null>(null);

  useEffect(() => {
    fetchSolicitudes();
  }, []);

  async function fetchSolicitudes() {
    const { data, error } = await supabase
      .from("solicitudes")
      .select("*")
      .order("fecha_creacion", { ascending: false });
    if (!error && data) {
      setSolicitudes(data as Solicitud[]);
    } else {
      console.error(error);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    if (editingId) {
      const { error } = await supabase
        .from("solicitudes")
        .update({
          nombre: formData.nombre,
          correo: formData.correo,
          mensaje: formData.mensaje,
        })
        .eq("id", editingId);
      if (error) console.error(error);
    } else {
      const { error } = await supabase.from("solicitudes").insert({
        nombre: formData.nombre,
        correo: formData.correo,
        mensaje: formData.mensaje,
        fecha_creacion: new Date().toISOString(),
      });
      if (error) console.error(error);
    }
    setFormData({ nombre: "", correo: "", mensaje: "" });
    setEditingId(null);
    await fetchSolicitudes();
    setLoading(false);
  }

  function handleEdit(solicitud: Solicitud) {
    setEditingId(solicitud.id);
    setFormData({
      nombre: solicitud.nombre,
      correo: solicitud.correo,
      mensaje: solicitud.mensaje,
    });
  }

  async function handleDelete(id: number) {
    const { error } = await supabase.from("solicitudes").delete().eq("id", id);
    if (error) console.error(error);
    fetchSolicitudes();
  }

  return (
    <div className="max-w-xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">Solicitudes</h1>

      <form onSubmit={handleSubmit} className="space-y-2">
        <input
          type="text"
          placeholder="Nombre"
          value={formData.nombre}
          onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
          className="w-full border rounded p-2"
        />
        <input
          type="email"
          placeholder="Correo"
          value={formData.correo}
          onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
          className="w-full border rounded p-2"
        />
        <textarea
          placeholder="Mensaje"
          value={formData.mensaje}
          onChange={(e) => setFormData({ ...formData, mensaje: e.target.value })}
          className="w-full border rounded p-2"
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-500 text-white px-4 py-2 rounded disabled:opacity-50"
        >
          {editingId ? "Actualizar" : "Crear"}
        </button>
        {editingId && (
          <button
            type="button"
            onClick={() => {
              setEditingId(null);
              setFormData({ nombre: "", correo: "", mensaje: "" });
            }}
            className="ml-2 text-sm text-gray-500"
          >
            Cancelar
          </button>
        )}
      </form>

      <ul className="space-y-4">
        {solicitudes.map((s) => (
          <li key={s.id} className="border rounded p-4">
            <p className="font-semibold">
              {s.nombre} ({s.correo})
            </p>
            <p className="mt-1">{s.mensaje}</p>
            <p className="text-xs text-gray-500 mt-2">
              {new Date(s.fecha_creacion).toLocaleString()}
            </p>
            <div className="flex gap-4 mt-2 text-sm">
              <button onClick={() => handleEdit(s)} className="text-blue-600">
                Editar
              </button>
              <button
                onClick={() => handleDelete(s.id)}
                className="text-red-600"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
