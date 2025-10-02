import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json();
    const db = getDB();

    const [rows] = await db.query<any[]>("SELECT * FROM users WHERE email = ?", [email]);
    if (rows.length === 0) {
      return NextResponse.json({ message: "Utilisateur non trouvé" }, { status: 404 });
    }

    const user = rows[0];

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      return NextResponse.json({ message: "Mot de passe incorrect" }, { status: 401 });
    }

    return NextResponse.json({ message: "Connexion réussie ✅", user: { id: user.id, name: user.name, lastname: user.lastname } });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}
