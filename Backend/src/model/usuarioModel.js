import prisma from '../utils/prisma/db.js';

// REGISTER
const checarCredenciarCadastro = async (email) => {
  const user = await prisma.usuario.findFirst({
    where: {
      email,
    },
    select: {
      userId: true,
    },
  });
  return user || null;
};

const registrarUsuario = async (data) => {
  const user = await prisma.usuario.create({
    data: data,
  });

  return user || null;
};
//Profile

const getPerfilUsuario = async (userId) => {
  const user = await prisma.usuario.findUnique({
    where: { userId },
    include: {
      eventoInscricaoscription: {
        select: {
          Publication: {
            select: {
              title: true,
              eventDate: true,
              image: true,
              video: true,
              publicationId: true,
            },
          },
        },
      },
      Publication: {
        select: {
          publicationId: true,
          criardAt: true,
          video: true,
          image: true,
          text: true,
          isEvent: true,
          title: true,
          eventDate: true,
          registrationStartDate: true,
          registrationEndDate: true,
          User: {
            select: {
              username: true,
              userId: true,
              userImage: true,
            },
          },
        },
      },
    },

    omit: {
      email: true,
      password: true,
      role: true,
      name: true,
      document: true,
    },
  });
  return user || null;
};

//LOGIN
const checarCredenciarLogin = async (email) => {
  const user = await prisma.usuario.findFirst({
    where: {
      email,
    },
    select: {
      role: true,
      nome: true,
      fotoPerfil: true,
      userId: true,
      senha: true,
    },
  });
  return user || null;
};

//AUTH
const getDadosUsuario = async (userId) => {
  const user = await prisma.usuario.findUnique({
    where: { userId },
    select: {
      userId: true,
      nome: true,
      email: true,
      role: true,
    },
  });
  return user || null;
};

//Edit USER PROFILE
const editarPerfil = async (userId, data) => {
  const user = await prisma.usuario.update({
    where: { userId },
    data: {
      ...data,
    },
    select: {
      userImage: true,
      username: true,
      bio: true,
    },
  });
  return user || null;
};

const perfilAtual = async (userId) => {
  const user = await prisma.usuario.findUnique({
    where: { userId },
    select: {
      userImage: true,
      bio: true,
    },
  });
  return user || null;
};

//DELETE
const deletarConta = async (userId) => {
  const user = await prisma.usuario.delete({
    where: { userId },
  });
  return user || null;
};

//Change PASSWORD
const mudarSenha = async (userId, password) => {
  const user = await prisma.usuario.update({
    where: { userId },
    data: {
      password,
    },
  });
  return user || null;
};

//Change EMAIL
const mudaremail = async (userId, email) => {
  const user = await prisma.user.update({
    where: { userId },
    data: {
      email,
    },
  });
  return user || null;
};

//Find profile
const encontrarUsuarioPorNome = async (nome) => {
  const user = await prisma.user.findUnique({
    where: { nome },
    include: {
      _count: {
        select: {
          followerBy: true,
          following: true,
        },
      },
      Publication: {
        select: {
          publicationId: true,
          criardAt: true,
          video: true,
          image: true,
          text: true,
          isEvent: true,
          title: true,
          eventDate: true,
          registrationStartDate: true,
          registrationEndDate: true,
          User: {
            select: {
              username: true,
              userId: true,
              userImage: true,
            },
          },
        },
      },
    },
    omit: {
      email: true,
      password: true,
      role: true,
      name: true,
      document: true,
    },
  });

  return user || null;
};

export {
  checarCredenciarCadastro,
  registrarUsuario,
  checarCredenciarLogin,
  getDadosUsuario,
  deletarConta,
  mudarSenha,
  mudaremail,
  encontrarUsuarioPorNome,
  perfilAtual,
  editarPerfil,
  getPerfilUsuario,
};
