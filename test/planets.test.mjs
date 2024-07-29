import request from 'supertest';
import { expect } from 'chai';
import app from '../index.js';
import Planet from '../server/models/planetModel.js';

describe('CRUD operations for planets', function() {
  let createdPlanetId; // to identify the created test planet

  // This function creates two planets: 'Planet 1' and 'Planet 2' before each test. If either planet is already in the database, it is not inserted.
  beforeEach(async () =>{  
        
    const existingPlanets = await Planet.find({ name: { $in: ['Planet 1', 'Planet 2'] } });
    const planetsToAdd = [
        {name: 'Planet 1', orderFromSun: 10, hasRings: true, mainAtmosphere: ["H2","CH4"], surfaceTemperatureC:{min: -200, max: -100, mean: -150}},
        {name: 'Planet 2', orderFromSun: 11, hasRings: false, mainAtmosphere: ["H2","He"], surfaceTemperatureC:{min: -500, max: -300, mean: -400}}
     ];
     const newPlanets = planetsToAdd.filter(planet => !existingPlanets.some(existingPlanet => existingPlanet.name === planet.name));
     await Planet.insertMany(newPlanets);
     });
  
     //Create a new plant
     it('POST planet and return it', async function() {
      const newPlanet = {
        name: 'Test Planet',
        orderFromSun: 12, 
        hasRings: true, 
        mainAtmosphere: ["H2","He"],
        surfaceTemperatureC:{min: -200, 
                             max: -100, 
                            mean: -150}
        };

        const res = await request(app)
                    .post('/api/planets')
                    .send(newPlanet)
                    .expect('Content-Type', /json/)
                    .expect(201);

        expect(res.body).to.have.property('_id');
        expect(res.body.name).to.equal(newPlanet.name);
        expect(res.body.orderFromSun).to.equal(newPlanet.orderFromSun);
        createdPlanetId = res.body._id; // Save the created planet's ID to future test's             
        console.log('Soy un chingón id al parecer, no tan valido de planeta:::::', createdPlanetId)
      });
       
     //Read all the plants
    it('GET, should return an array of planets', async function() {
      await request(app)
      .get('/api/planets')
      .expect(200)
      .expect('Content-Type', /json/)
      .expect(res => {
        expect(res.body).to.be.an('array');
                     });
    });

    // Read a specific planet
    it('GET planet by id', async function() {

      const res = await request(app)
      .get(`/api/planets/${createdPlanetId}`)
      .expect('Content-Type', /json/)  
      .expect(200);
      expect(res.body).to.have.property('_id', createdPlanetId);
      
    });

   // Update a existing planet by Id
    it('PUT (update) planet by id', async function() {
    const updatedPlanet = {
      name: 'Updated Planet',
      orderFromSun: 13, 
        hasRings: true, 
        mainAtmosphere: ["He"],
        surfaceTemperatureC:{min: -300, 
                             max: -200, 
                            mean: -250}
    };
     
    const res = await request(app)
      .put(`/api/planets/${createdPlanetId}`)
      .send(updatedPlanet)
      .expect('Content-Type', /json/)
      .expect(200);
    expect(res.body.name).to.equal(updatedPlanet.name);
    expect(res.body.orderFromSun).to.equal(updatedPlanet.orderFromSun);
      
    });

     //  Delete an existing planet by Id
    it('DELETE planet by id', async function() {
      await request(app)
      .delete(`/api/planets/${createdPlanetId}`)
      .expect(200);
      
    // Verify eliminated planet
      await request(app)
      .get(`/api/planets/${createdPlanetId}`)
      .expect(404);
    });

});