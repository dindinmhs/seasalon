import connectDB from '@/utils/connectdb';
import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials'
import bcrypt from "bcrypt"

export const authOptions = {
  secret: process.env.NEXTAUTH_SECRET,
  providers: [
    CredentialsProvider({
      name :'credentials',
      async authorize(credentials) {
        const {email, password} = credentials
        try {
          const db = await connectDB()
          const coll = db.collection('user')
          const user =  await coll.findOne({email : email})
          if (!user) {
            return null
          }
          const passwordMatch = await bcrypt.compare(password,user.password)
          if (!passwordMatch) {
            return null
          } else {
            return { ...user, password: null, role: user.role }
          }
        } catch (error) {
          console.error(error)
        }
      },
    })
  ],
  callbacks : {
    async jwt({token, user}) {
        if (user) token.user = user.role
        return token
    },
    async session({ session, token }) {
        if (session?.user) session.user.role = token.role;
        return session;
      },
  },
  pages : {
    signIn : "/sign-in",
    newUser : '/sign-up'
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };