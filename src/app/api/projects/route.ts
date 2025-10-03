import { NextResponse } from "next/server";
import { getDB } from "@/lib/db";

export async function GET(req: Request) {
  try {
    const db = getDB();

    // Récupérer tous les projets avec les infos du propriétaire
    const [projects] = await db.query<any[]>(
      `SELECT 
        p.id, 
        p.name, 
        p.description, 
        p.created_at,
        u.name as owner_name,
        u.lastname as owner_lastname,
        (SELECT COUNT(*) FROM tasks WHERE project_id = p.id) as task_count,
        (SELECT COUNT(*) FROM tasks WHERE project_id = p.id AND status = 'Done') as completed_tasks
      FROM projects p
      LEFT JOIN users u ON p.owner_id = u.id
      ORDER BY p.created_at DESC`
    );

    return NextResponse.json({ projects }, { status: 200 });
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const { name, description, owner_id } = await req.json();

    if (!name || !owner_id) {
      return NextResponse.json(
        { message: "Le nom et le propriétaire sont requis" },
        { status: 400 }
      );
    }

    const db = getDB();

    const [result] = await db.query<any>(
      "INSERT INTO projects (name, description, owner_id, created_at) VALUES (?, ?, ?, NOW())",
      [name, description || null, owner_id]
    );

    return NextResponse.json(
      { message: "Projet créé avec succès ✅", projectId: result.insertId },
      { status: 201 }
    );
  } catch (err) {
    console.error(err);
    return NextResponse.json({ message: "Erreur serveur" }, { status: 500 });
  }
}