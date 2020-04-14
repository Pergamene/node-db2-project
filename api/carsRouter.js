const express = require('express');
const knex = require('knex');

const knexfile = require('../knexfile');
const db = knex(knexfile.development);

const router = express.Router();

router.use('/:id', validateCarId);

router.get('/', async (req, res) => {
  try {
    const cars = await db.select().table('cars');
    if (cars) {
      res.status(200).json(cars);
    } else {
      res.status(404).json({ message: 'There are no cars.' });
    }
  } catch {
    res.status(500).json({ error: 'There was a problem getting the cars.' });
  }
});

router.get('/:id', async (req, res) => {
  res.status(200).json(req.car);
});

router.post('/', validateCar, async (req, res) => {
  try {
    await db('cars').insert(req.body, 'id');
    const car = await db('cars').where('vin', req.body.vin);
    res.status(201).json(car);
  } catch(err) {
    console.error(err.message);
    res.status(500).json({ error: 'There was a problem adding the car.' });
  }
});

router.put('/:id', validateCar, async (req, res) => {
  try {
    await db('cars').where('id', req.params.id).update(req.body);
    const car = await db('cars').where('id', req.params.id);
    res.status(201).json(car);
  } catch {
    res.status(500).json({ error: 'There was a problem updating the car.' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const car = await db('cars').where('id', req.params.id);
    await db('cars').where('id', req.params.id).del();
    res.status(200).json(car);
  } catch {
    res.status(500).json({ error: 'There was a problem deleting the car.' });
  }
});

//Middlewares

async function validateCarId(req, res, next) {
  try {
    const car = await db('cars').where('id', req.params.id);
    if (car.length) {
      req.car = car;
      next();
    } else {
      res.status(404).json({ message: 'There is no car with that ID.' });
    }
  } catch {
    res.status(500).json({ error: 'There was a problem getting the car.' });
  }
}

async function validateCar(req, res, next) {
  const body = req.body;
  if (!Object.keys(body).length) {
    res.status(400).json({ message: 'Missing car data.' });
  } else if (!body.vin) {
    res.status(400).json({ message: 'Missing car VIN.' });
  } else if (!body.make) {
    res.status(400).json({ message: 'Missing car make.' });
  } else if (!body.model) {
    res.status(400).json({ message: 'Missing car model.' });
  } else if (!body.miles) {
    res.status(400).json({ message: 'Missing car miles.' });
  } else {
    next();
  }
}

module.exports = router;
