import { version } from '../../package.json';
import { Router } from 'express';
import fish from './fish';

export default ({ config, db }) => {
  let api = Router();

  // mount the fish resource
  api.use('/fish', fish({ config, db }));

  // perhaps expose some API metadata at the root
  api.get('/', (req, res) => {
    res.json({ version });
  });

  return api;
};
