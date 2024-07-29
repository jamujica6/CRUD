import express from 'express';
import planetController from '../controllers/planetController.js';

const router = express.Router();

router.post('/', planetController.createPlanet);
router.get('/', planetController.getPlanets);
router.get('/:id', planetController.getPlanetById);
router.put('/:id', planetController.updatePlanet);
router.delete('/:id', planetController.deletePlanet);

export default router;