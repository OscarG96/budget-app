import NextAuth from 'next-auth';
import { authConfig } from '@/auth';
import Credentials from 'next-auth/providers/credentials';
import { z } from 'zod';
import { PrismaClient, User } from "@prisma/client";
import bcrypt from 'bcrypt';

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

export const { auth, signIn, signOut } = NextAuth({
    ...authConfig,
    providers: [Credentials({
        async authorize(credentials) {
            const parsedCredentials = z
                .object({ email: z.string().email(), password: z.string().min(6) })
                .safeParse(credentials);
            if (parsedCredentials.success) {
                const { email, password } = parsedCredentials.data;
                const user = await getUser(email);
                if (!user) return null;
                const passwordsMatch = await bcrypt.compare(password, user.password);
                
                if (passwordsMatch) return user;
            }
            console.log('Invalid credentials');
            return null
        },
    }),],
});