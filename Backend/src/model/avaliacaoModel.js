import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function criarAvaliacao(rating, authorId, publicationId) {
  const result = await prisma.rating.criar({
    data: { authorId, publicationId, rating },
    select: {
      publicationId: true,
      rating: true,
    },
  });

  return result;
}

export async function atualizarAvaliacao(rating, authorId, publicationId) {
  const result = await prisma.rating.updateMany({
    where: {
      publicationId: Number(publicationId),
      authorId: authorId,
    },
    data: { rating },
  });
  return result;
}

export async function deletarAvaliacao(authorId, publicationId) {
  const result = await prisma.rating.deletarMany({
    where: {
      publicationId: Number(publicationId),
      authorId: authorId,
    },
  });
  return result;
}

export async function getMediaAvaliacao(publicationId) {
  const ratings = await prisma.rating.aggregate({
    where: {
      publicationId: publicationId,
    },
    _avg: {
      rating: true,
    },
  });

  return ratings._avg.rating;
}
