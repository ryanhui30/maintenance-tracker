import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// GET - Fetch all users from the database
export async function GET(req) {
  try {
    // Using findFirst to fetch a single user (you can adjust this query)
    const user = await prisma.user.findFirst();
    if (!user) {
      return new Response("No users found", { status: 404 });
    }
    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.error("Error fetching user:", error.message);
    return new Response("Internal Server Error", { status: 500 });
  }
}

// POST - Add a new user
export async function POST(req) {
  try {
    // Parse the request body to get user data
    const { name, email } = await req.json();

    if (!name || !email) {
      return new Response("Missing name or email in request body", { status: 400 });
    }

    // Basic email format validation
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    if (!emailRegex.test(email)) {
      return new Response("Invalid email format", { status: 400 });
    }

    // Create a new user in the database
    const newUser = await prisma.user.create({
      data: { name, email },
    });

    return new Response(JSON.stringify(newUser), { status: 201 });
  } catch (error) {
    console.error("Error adding user:", error.message);
    return new Response("Internal Server Error", { status: 500 });
  }
}
