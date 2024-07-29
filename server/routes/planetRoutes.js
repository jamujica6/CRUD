import express from 'express';
import PlanetController from '../controllers/planetController.js';

const router = express.Router();

router.post('/', PlanetController.createPlanet);
router.get('/', PlanetController.getPlanets);
router.get('/:id', PlanetController.getPlanetById);
router.put('/:id', PlanetController.updatePlanet);
router.delete('/:id', PlanetController.deletePlanet);

export default router;