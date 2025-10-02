"use client";

import { useState } from "react";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [lastname, setLastname] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const res = await fetch("/api/auth/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password, name, lastname }),
    });

    const data = await res.json();
    alert(data.message);
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-gray-100">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg p-6 w-80"
      >
        <h1 className="text-xl font-bold mb-4 text-center">Créer un compte</h1>

        <input
          type="text"
          placeholder="Prénom"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <input
          type="text"
          placeholder="Nom"
          value={lastname}
          onChange={(e) => setLastname(e.target.value)}
          required
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <input
          type="password"
          placeholder="Mot de passe"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full mb-3 px-3 py-2 border rounded"
        />

        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          S’inscrire
        </button>
      </form>
    </main>
  );
}