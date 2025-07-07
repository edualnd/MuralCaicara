import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export async function criarEvento(post) {
  const result = await prisma.evento.create({
    data: post,
    include: {
      usuario: {
        select: {
          userId: true,
          nome: true,
        },
      },
    },
  });
  return result;
}

export async function atualizarEvento(publicationId, data) {
  const result = await prisma.evento.update({
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
  const result = await prisma.evento.delete({
    where: {
      publicationId: Number(publicationId),
      authorId: authorId,
    },
  });
  return result;
}

export async function getEventList() {
  const result = await prisma.evento.findMany({
   
  });
  return result;
}
export async function getImages(publicationId) {
  const result = await prisma.evento.findFirst({
    where: { publicationId },
    select: {
      image: true,
      video: true,
    },
  });
  return result;
}
