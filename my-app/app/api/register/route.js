//api/register

import prisma from "../../../lib/prisma";
import bcrypt from "bcrypt";

export async function POST(req) {
  const body = await req.json();
  const { email, name, lastname, password, telephone, country, city } = body;

  try {
    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // Création de l'utilisateur
    const user = await prisma.user.create({
      data: {
        email,
        name,
        lastname,
        password: hashedPassword,
        telephone,
        country,
        city,
      },
    });

    return new Response(JSON.stringify(user), { status: 201 });
  } catch (error) {
    return new Response(
      JSON.stringify({ error: "User already exists or an error occurred" }),
      { status: 500 }
    );
  }
}
