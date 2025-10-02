import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password, name, lastname } = await req.json();
    const db = getDB();

    const [existing] = await db.query<any[]>(
      "SELECT id FROM users WHERE email = ?",
      [email]
    );

    if (existing.length > 0) {
      return NextResponse.json(
        { message: "Email déjà utilisé" },
        { status: 400 }
      );
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.query(
      "INSERT INTO users (email, password, name, lastname) VALUES (?, ?, ?, ?)",
      [email, hashedPassword, name, lastname]
    );

    return NextResponse.json({ message: "Utilisateur créé ✅" });
  } catch (err) {
    console.error("Erreur serveur:", err);
    return NextResponse.json(
      { message: "Erreur serveur" },
      { status: 500 }
    );
  }
}