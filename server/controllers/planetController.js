import Planet from '../models/planetModel.js';

// Create a new planet
const createPlanet = async (req, res) => {
    try {
      const newPlanet = new Planet(req.body);
      const planet = await newPlanet.save();
      res.status(201).json(planet);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Read all the planets
  const getPlanets = async (req, res) => {
    try {
      const planets = await Planet.find();
        if (planets.length === 0) {
        return res.status(200).json({ message: 'No planets found' });
      }
      res.status(200).json({response:planets});
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Read a specific planet
  const getPlanetById = async (req, res) => {
    try {
      const planet = await Planet.findById(req.params.id);
      if (!planet) return res.status(404).json({ error: 'Planet not found' });
      res.status(200).json(planet);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Update a existting planet
  const updatePlanet = async (req, res) => {
    try {
      const planet = await Planet.findByIdAndUpdate(req.params.id, req.body, { new: true });
      if (!planet) return res.status(404).json({ error: 'Planet not found' });
      res.status(200).json(planet);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Delete a planet
  const deletePlanet = async (req, res) => {
    try {
      const planet = await Planet.findByIdAndDelete(req.params.id);
      if (!planet) return res.status(404).json({ error: 'Planet not found' });
      res.status(200).json({ message: 'Planet deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  export default {
    createPlanet,
    getPlanets,
    getPlanetById,
    updatePlanet,
    deletePlanet
  };