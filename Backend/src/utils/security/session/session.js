import prisma from '../../prisma/db.js';

const criarSessao = async (data) => {
  const session = await prisma.sessao.create({
    data: data,
  });
  return session || null;
};

const encontrarSessao = async (deviceId) => {
  const session = await prisma.sessao.findFirst({
    where: {
      deviceId,
    },
  });
  return session || null;
};

const deletarSessao = async (deviceId) => {
  const session = await prisma.sessao.deleteMany({
    where: {
      deviceId,
    },
  });
  return session || null;
};

const deletarTodasSessoes = async (userId) => {
  const session = await prisma.sessao.deleteMany({
    where: {
      userId,
    },
  });
  return session;
};
const deletarSessoesExpiradas = async (userId) => {
  const session = await prisma.sessao.deleteMany({
    where: {
      AND: [{ userId }, { expiredAt: { lt: new Date() } }],
    },
  });
  return session;
};

export {
  criarSessao,
  encontrarSessao,
  deletarSessao,
  deletarTodasSessoes,
  deletarSessoesExpiradas,
};
