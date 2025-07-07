import bcrypt from 'bcrypt';
const hashSenha = async (password) => {
  return bcrypt.hashSync(password, 10);
};

const comparar = async (password, hash) => {
  return bcrypt.compareSync(password, hash);
};

export { hashSenha, comparar };
