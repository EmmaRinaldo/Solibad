import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get('id');

    if (id) {
      const auction = await prisma.auction.findUnique({
        where: { id: String(id) },
        include: { bids: true }
      });
      if (!auction) {
        return new Response(JSON.stringify({ error: 'Enchère non trouvée' }), { status: 404 });
      }

      if (auction.bids.length === 0) {
        return new Response(JSON.stringify({ error: 'Aucune surenchère trouvée' }), { status: 200 });
      }

      return new Response(JSON.stringify(auction.bids), { status: 200 });
    }
  } catch (error) {
    console.error('Erreur lors de la récupération de l\'enchère:', error);
    return new Response(JSON.stringify({ error: 'Erreur lors de la récupération de l\'enchère' }), { status: 500 });
  }
}

// export async function POST(req) {
//   try {
//     // const session = await getSession({ req });
//     // if (!session) {
//     //   return new Response(JSON.stringify({ error: 'Non authentifié' }), { status: 401 });
//     // }
//     const { userId, auctionId, bidAmount } = await req.json();

//     const auction = await prisma.auction.findUnique({
//       where: { id: auctionId },
//     });

//     if (!auction) {
//       return new Response(JSON.stringify({ error: 'Enchère non trouvée' }), { status: 404 });
//     }

//     if (bidAmount <= auction.ActualBid) {
//       return new Response(JSON.stringify({ error: 'La nouvelle enchère doit être supérieure à l\'enchère actuelle' }), { status: 400 });
//     } else if (bidAmount < auction.ActualBid + auction.minIncr) {
//       return new Response(JSON.stringify({ error: `La nouvelle enchère doit être supérieure de ${auction.minIncr} au prix actuel` }), { status: 400 });
//     }

    
//     const existingBid = await prisma.bid.findFirst({
//       where: {
//           userId: userId,
//           auctionId: auctionId,
//       },
//     });

//     let newBid;
//     if (existingBid) {
//         newBid = await prisma.bid.update({
//             where: { id: existingBid.id },
//             data: {
//                 lastBid: bidAmount,
//                 bidedAt: (new Date() - new Date().getTimezoneOffset() * 60000),
//             },
//         });
//     } else {
//         newBid = await prisma.bid.create({
//             data: {
//                 userId: userId,
//                 auctionId: auctionId,
//                 lastBid: bidAmount,
//                 bidedAt: (new Date() - new Date().getTimezoneOffset() * 60000)
//             },
//         });
//     }

//     const updatedAuction = await prisma.auction.update({
//         where: { id: auctionId },
//         data: { ActualBid: bidAmount },
//     });

//     return new Response(JSON.stringify({ newBid, updatedAuction }), { status: 201 });
//   } catch (error) {
//     console.error('Erreur lors de la création de la surenchère:', error);
//     return new Response(JSON.stringify({ error: 'Erreur lors de la création de la surenchère' }), { status: 500 });
//   }
// }

// Fonction pour gérer les requêtes POST pour les enchères (bids)
export async function POST(req) {
    try {
        const body = await req.json();
        const { auctionId, bidAmount, userId } = body;

        const auction = await prisma.auction.findUnique({
            where: { id: auctionId },
        });

        if (!auction) {
            return new Response(JSON.stringify({ error: 'Enchère non trouvée' }), { status: 404 });
        }

        if (bidAmount < auction.ActualBid + auction.minIncr) {
            return new Response(JSON.stringify({ error: `La nouvelle enchère doit être supérieure de ${auction.minIncr} au prix actuel` }), { status: 400 });
        }

        const existingBid = await prisma.bid.findFirst({
            where: {
                userId: userId,
                auctionId: auctionId
            },
          });
        
        let newBid;
        if (existingBid) {
          newBid = await prisma.bid.update({
              where: { id: existingBid.id },
              data: {
                lastBid: bidAmount,
                bidedAt: new Date(),
              },
          });
      } else {
          newBid = await prisma.bid.create({
              data: {
                  userId: userId,
                  auctionId: auctionId,
                  lastBid: bidAmount,
                  bidedAt: new Date()
              },
          });
          console.log(newBid)
      }

        const updatedAuction = await prisma.auction.update({
            where: { id: auctionId },
            data: { ActualBid: bidAmount },
        });

        return new Response(JSON.stringify({ newBid, updatedAuction }), { status: 201 });
    } catch (error) {
        return new Response(JSON.stringify({ error: 'Erreur lors de la soumission de la surenchère' }), { status: 500 });
    }
}