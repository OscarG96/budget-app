import { NextApiRequest, NextApiResponse } from "next";
import bcrypt from "bcryptjs";
import { PrismaClient } from "@prisma/client";
import { signIn } from "next-auth/react";

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  console.log(req.body);

  const { name, email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ message: "Email and password are required" });
  }

  try {
    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create user
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        categories: ["home","food","transport","utilities","clothing","insurance","health","personal","debt","education","entertainment","savings","other"]
      },
    });

    res.status(201).json({ message: "User registered", user });
  } catch (error) {
    console.log(error)
    res.status(500).json({ message: "Error registering user", error });
  }
}
