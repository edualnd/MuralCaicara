const templeteMudarEmail = (name, token) => {
  const email = {
    subject: 'LitSport - Mudança de Email',
    text: `Olá, ${name}

Recebemos uma solicitação para alterar o endereço de e-mail associado à sua conta.

Para confirmar essa mudança, utilize o seguinte código de verificação: ${token}

Este código é válido por 5 minutos. Após esse período, será necessário solicitar um novo código.

Se você não solicitou essa alteração, por favor, ignore este e-mail.

Atenciosamente,
Equipe LitSoprt`,
  };
  return email;
};

const templeteBoasVindasEmail = (name) => {
  const email = {
    subject: 'Bem-vindo(a) à LitSport!',
    text: `Olá ${name},
Seja muito bem-vindo(a) à LitSport!

Estamos felizes em tê-lo(a) conosco. Agora você pode aproveitar todos os recursos que preparamos especialmente para você.

Se precisar de qualquer ajuda, é só nos contatar.

Abraços,  
Equipe LitSport`,
  };
  return email;
};

const templeteEsqueceuSenhaEmail = (name, link) => {
  const email = {
    subject: 'LitSport - Redefinição de Senha',
    text: `Olá ${name},

Recebemos uma solicitação para redefinir sua senha na [Nome da Aplicação].

Para continuar, clique no link abaixo ou copie e cole no seu navegador:

http://localhost:5173/forgot-password/${link}

Esse link é válido por 5 minutos. Se você não solicitou essa alteração, por favor, ignore este email.

Abraços,  
Equipe LitSport
`,
  };
  return email;
};

export {
  templeteMudarEmail,
  templeteBoasVindasEmail,
  templeteEsqueceuSenhaEmail,
};
