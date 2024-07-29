import request from 'supertest';
import { expect } from 'chai';
import app from '../index.js';
import Item from '../server/models/itemModel.js';

describe('CRUD operations for items', function() {
    let createdItemId;

    // This function creates two items: 'Item 1' and 'Item 2' before each test. If either item is already in the database, it is not inserted.
   beforeEach(async () =>{  
        
    const existingItems = await Item.find({ name: { $in: ['Item 1', 'Item 2'] } });
    const itemsToAdd = [
        {name: 'Item 1', quantity: 22},
        {name: 'Item 2', quantity: 33}
     ];
     const newItems = itemsToAdd.filter(item => !existingItems.some(existingItem => existingItem.name === item.name));
     await Item.insertMany(newItems);
     });

    //Create a new item
    it('POST item and return it', async function() {
      const newItem = {
        name: 'Test Item',
        quantity: 111
      };
  
      const res = await request(app)
        .post('/api/items')
        .send(newItem)
        .expect('Content-Type', /json/)
        .expect(201);
        // console.log('items.test.msj Creating item|Test _.,·-^¨·-.,_.,·-^¨·-.,_.,·-^¨·-.,_item --> with the _id: ',res.body._id);
        // console.log('items.test.msj Creating item|Test _.,·-^¨·-.,_.,·-^¨·-.,_.,·-^¨·-.,_item --->with res.body.name: ',res.body.name);
        // console.log('items.test.msj Creating item|Test _.,·-^¨·-.,_.,·-^¨·-.,_.,·-^¨·-.,_item --->newItem.name: ',newItem.name);

      expect(res.body).to.have.property('_id');
      expect(res.body.name).to.equal(newItem.name);
      expect(res.body.quantity).to.equal(newItem.quantity);
       
      createdItemId = res.body._id; // Save the created item's ID to future test's
      // console.log('items.test.msj creating itemTest _.,·-^¨·-.,_.,·-^¨·-.,_.,·-^¨·-.,_This is the id saved: ',createdItemId);
    });

    // Read all the items

    
    it('GET items', async function(){
      await request(app)
      .get('/api/items')
      .expect('Content-Type', /json/)
      .expect(200)
      .expect(res => {
        expect(res.body).to.be.an('array');
      });
    });

    // Read a specific item
    it('GET item by id', async function() {
        
        const res = await request(app)
        .get(`/api/items/${createdItemId}`)
        .expect('Content-Type', /json/)
        .expect(200);
        expect(res.body).to.have.property('_id', createdItemId);   
    });

    // Update a existing item by Id
    it('PUT (update) item by id', async function() {
        const updatedItem = {
          name: 'Updated Item',
          quantity: 20
        };
         
        const res = await request(app)
          .put(`/api/items/${createdItemId}`)
          .send(updatedItem)
          .expect('Content-Type', /json/)
          .expect(200);
        expect(res.body.name).to.equal(updatedItem.name);
        expect(res.body.quantity).to.equal(updatedItem.quantity);
          
      });  

      // Delete an existing item by Id
    it('DELETE item by id', async function() {
      await request(app)
      .delete(`/api/items/${createdItemId}`)
      .expect(200);


    // Verify eliminated item
      await request(app)
      .get(`/api/items/${createdItemId}`)
      .expect(404);
    });


  });