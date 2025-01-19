import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function testDbConnection() {
  try {
    await prisma.$connect(); // Test database connection
    console.log('Database connected successfully');
  } catch (error) {
    console.error('Error connecting to the database:', error.message);
  } finally {
    await prisma.$disconnect(); // Make sure to disconnect after testing
  }
}

testDbConnection();
