//app/api/users/route.js

import { PrismaClient } from "@prisma/client";
import { getSession } from "next-auth/react";

const prisma = new PrismaClient();

export async function GET(req) {
    try {
        // const session = await getSession({ req });

        // if (!session) {
        //     return new Response(JSON.stringify({ error: "Unauthorized" }), { status: 401 });
        // }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (id) {
            const user = await prisma.user.findUnique({
            where: { id: String(id) },
            });

            if (!user) {
            return new Response(JSON.stringify({ error: 'Utilisateur non trouvé' }), { status: 404 });
            }

            return new Response(JSON.stringify(user), { status: 200 });
        } else {
            const users = await prisma.user.findMany();
            return new Response(JSON.stringify(users), { status: 200 });
        }
    }
    catch (error) {
        return new Response(JSON.stringify({ error: 'Erreur lors de la récupération de l\'utilisateur' }), { status: 500 });
    }
}