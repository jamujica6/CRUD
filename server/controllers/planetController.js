import Planet from '../models/planetModel.js';
import mongoose from 'mongoose';

// Create a new planet
const createPlanet = async (req, res) => {
    try {
      // to avoid the creation of duplicated planets
      const { name, orderFromSun, hasRings, mainAtmosphere, surfaceTemperatureC } = req.body; 
      const existingPlanet = await Planet.findOne({ name, orderFromSun, hasRings, mainAtmosphere, surfaceTemperatureC });
      if (existingPlanet) {return res.status(409).json({ message: 'Planet already exists' });}

      // if it doens't exist, then we add the planet to the database
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
        // If there are no planets, return a message indicating that the database is empty  
        return res.status(200).json({ message: 'No planets found' });}
     
      res.status(200).json(planets);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Read a specific planet
  const getPlanetById = async (req, res) => {
    try {
      const planetId = req.params.id;
      //To make sure that the ID provided is valid
      if (!mongoose.Types.ObjectId.isValid(planetId)) {
        return res.status(400).send({ message: 'Invalid ID' });
      }
      const planet = await Planet.findById(planetId);
      if (!planet) return res.status(404).json({ error: 'Planet not found' });
      res.status(200).json(planet);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  };
  
  // Update an existing planet
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