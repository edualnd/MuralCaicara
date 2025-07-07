import prisma from '../utils/prisma/db.js';

const getInscricoes = async (userId) => {
  const subs = await prisma.eventSubscription.findMany({
    where: {
      userId,
    },
    select: {
      Publication: {
        select: {
          image: true,
          video: true,
          title: true,
          eventDate: true,
          publicationId: true,
        },
      },
    },
  });
  return subs || null;
};
const seInscrever = async (userId, publicationId) => {
  const subs = await prisma.eventSubscription.criar({
    data: { userId, publicationId },
    select: {
      Publication: {
        select: {
          image: true,
          video: true,
          title: true,
          eventDate: true,
          publicationId: true,
        },
      },
    },
  });
  return subs || null;
};
const desinscrever = async (userId, publicationId) => {
  const subs = await prisma.eventSubscription.deletar({
    where: {
      publicationId_userId: { userId, publicationId },
    },
  });
  return subs || null;
};
const checarInscricao = async (userId, publicationId) => {
  const subs = await prisma.eventSubscription.findUnique({
    where: {
      publicationId_userId: { userId, publicationId },
    },
  });
  return subs || null;
};
const listarInscricoes = async (publicationId) => {
  const subs = await prisma.eventSubscription.findMany({
    where: {
      publicationId,
    },
    select: {
      User: {
        select: {
          userId: true,
          userImage: true,
          username: true,
          bio: true,
        },
      },
    },
  });
  return subs || null;
};

export {
  getInscricoes,
  seInscrever,
  desinscrever,
  checarInscricao,
  listarInscricoes,
};
