import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function criarEvento(post) {
  const result = await prisma.publication.create({
    data: post,
    include: {
      User: {
        select: {
          userId: true,
          username: true,
          userImage: true,
        },
      },
      Rating: {
        select: {
          rating: true,
        },
      },
    },
  });
  return result;
}

export async function atualizarEvento(publicationId, data) {
  const result = await prisma.publication.update({
    where: {
      publicationId: Number(publicationId),
    },
    data: data,
    include: {
      User: {
        select: {
          userId: true,
          username: true,
          userImage: true,
        },
      },
      Rating: {
        select: {
          rating: true,
        },
      },
    },
  });
  return result;
}

export async function deletarEvento(authorId, publicationId) {
  const result = await prisma.publication.delete({
    where: {
      publicationId: Number(publicationId),
      authorId: authorId,
    },
  });
  return result;
}

export async function getEventList() {
  const result = await prisma.publication.findMany({
    where: {
      isEvent: true,
    },
  });
  return result;
}
export async function getImages(publicationId) {
  const result = await prisma.publication.findFirst({
    where: { publicationId },
    select: {
      image: true,
      video: true,
    },
  });
  return result;
}
