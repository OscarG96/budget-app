import NextAuth from 'next-auth';
import bcrypt from 'bcryptjs';
import type { AuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { UsersService } from '../lib/services/usersService';

export const authOptions: AuthOptions = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'Email', type: 'text' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials, req) {
        if (!credentials?.username) {
          return null;
        }
        const user = await UsersService.getUser(credentials.username);
        if (!user) {
          console.log('User not found')
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
  pages: {
    signIn: '/auth/signin'
  },
  session: {
    strategy: 'jwt'
  },
  callbacks: {
    async redirect({url, baseUrl}) {
      return `${baseUrl}/dashboard`
    }
  },
  secret: process.env.NEXTAUTH_SECRET,
};

export default NextAuth(authOptions);