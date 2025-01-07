import NextAuth from 'next-auth';
import { z } from 'zod';
import { PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcrypt';
import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const prisma = new PrismaClient()

async function getUser(email: string): Promise<User | null> {
    try {
        // const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        return prisma.user.findFirst({ where: { email } })
    } catch (error) {
        console.error('Failed to fetch user:', error);
        throw new Error('Failed to fetch user.');
    }
}

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Username', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        const user = { id: '1', name: 'John Doe', email: 'john@example.com' };
        
        if (credentials?.username === 'john' && credentials?.password === 'password123') {
          return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);