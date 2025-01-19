const express = require('express');
const { PrismaClient } = require('@prisma/client');
const bodyParser = require('body-parser');

const app = express();
const prisma = new PrismaClient();
app.use(bodyParser.json());

// CRUD Endpoints for Equipment
app.get('/equipment', async (req, res) => {
  const equipment = await prisma.equipment.findMany();
  res.json(equipment);
});

app.post('/equipment', async (req, res) => {
  const { name, status } = req.body;
  const newEquipment = await prisma.equipment.create({
    data: { name, status },
  });
  res.json(newEquipment);
});

// CRUD Endpoints for Maintenance
app.get('/maintenance', async (req, res) => {
  const maintenance = await prisma.maintenance.findMany();
  res.json(maintenance);
});

app.post('/maintenance', async (req, res) => {
  const { equipmentId, type, hoursSpent } = req.body;
  const newMaintenance = await prisma.maintenance.create({
    data: { equipmentId, type, hoursSpent },
  });
  res.json(newMaintenance);
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
