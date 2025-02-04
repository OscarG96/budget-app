import NextAuth from 'next-auth';
import { z } from 'zod';
import { PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcrypt';
import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

const prisma = new PrismaClient()

async function getUser(email: string) {
    try {
        // const user = await sql<User>`SELECT * FROM users WHERE email=${email}`;
        const user = await prisma.user.findFirst({ where: { email } });
        if (!user) {
            return null;
        }
        return { ...user, id: user.id.toString() };
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
        username: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        // const user = { id: '1', name: 'John Doe', email: 'john@example.com' };
        if (!credentials?.username) {
          return null;
        }
        const user = await getUser(credentials.username);
        if (!user) {
          return null;
        }
        const passwordsMatch = await bcrypt.compare(credentials.password, user.password);
        if (passwordsMatch) {
          return user;
        }
        return null;
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);