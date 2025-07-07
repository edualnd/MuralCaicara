import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import deviceIdGenerator from './middlewares/deviceIdMiddleware.js';
import visitorRoutes from './routes/visitorRouter.js';
import usuarioRoutes from './routes/usuarioRouter.js';
import curtidasRoutes from './routes/curtidasRoutes.js';
import eventoRoutes from './routes/eventoRoutes.js';
import checarAccessTokenMiddleware from './middlewares/checarAccessTokenMiddleware.js';
import logger from './middlewares/logger.js';
import errorsHandler from './middlewares/errorHandler.js';
import avaliacaoRoutes from './routes/avaliacaoRoutes.js';
import eventoInscricaoRoutes from './routes/eventoInscricaoRoutes.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 3000;

app.use(
  cors({
    origin: 'http://localhost:5173',
    credentials: true,
  }),
);
app.use(express.json());
app.use(cookieParser());

app.use(logger);
app.use(deviceIdGenerator);

app.use('/', visitorRoutes);

//verificação
app.use('/auth', checarAccessTokenMiddleware);

app.get('/auth', (req, res, next) => {
  return res.status(200).json({
    success: true,
    message: 'logado',
  });
});

app.use('/auth/usuario', usuarioRoutes);

app.use('/auth/evento/', eventoRoutes);

app.use('/auth/avaliacao', avaliacaoRoutes);

app.use('/auth/inscricao', eventoInscricaoRoutes);

app.use('auth/curtidas', curtidasRoutes);

app.use(errorsHandler);
app.listen(PORT, (req, res) => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
