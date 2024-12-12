// Import necessary modules
import { connectDB } from "../../../../lib/connectDB";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";
import GitHubProvider from "next-auth/providers/github";
import FacebookProvider from "next-auth/providers/facebook";
import bcrypt from "bcrypt";
export const dynamic = "force-dynamic";

export const authOptions = {
  secret: process.env.NEXT_PUBLIC_AUTH_SECRET,

  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, 
    rolling: false,
  },

  providers: [
    CredentialsProvider({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        const { email, password } = credentials;
        if (!email || !password) {
          return null;
        }

        const db = await connectDB();
        const currentUser = await db
          .collection("users")
          .findOne({ email });

        if (!currentUser) {
          return null;
        }

        const passwordMatched = await bcrypt.compare(
          password,
          currentUser.password
        );

        if (!passwordMatched) {
          return null;
        }

        return {
          id: currentUser._id.toString(),
          name: currentUser.name,
          email: currentUser.email,
          image: currentUser.image, 
          role: currentUser.role || "user", 
        };
      },
    }),

    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_SECRET,
    }),

    GitHubProvider({
      clientId: process.env.NEXT_PUBLIC_GITHUB_ID,
      clientSecret: process.env.NEXT_PUBLIC_GITHUB_SECRET,
    }),

    FacebookProvider({
      clientId: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_ID,
      clientSecret: process.env.NEXT_PUBLIC_FACEBOOK_CLIENT_SECRET,
    }),
  ],

  pages: {
    signIn: "/login",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      } else {
        const db = await connectDB();
        const existingUser = await db
          .collection("users")
          .findOne({ email: token.email });
        if (existingUser) {
          token.role = existingUser.role;
        }
      }
      return token;
    },

    async session({ session, token }) {
      session.user.id = token.id;
      session.user.role = token.role;
      session.user.email = token.email;
      session.user.name = token.name;
      session.user.image = token.image;
      return session;
    },

    async signIn({ user, account }) {
      if (
        ["google", "github", "facebook"].includes(account.provider)
      ) {
        const { id, name, email, image } = user;

        try {
          const db = await connectDB();
          const userCollection = db.collection("users");
          const existingUser = await userCollection.findOne({
            email,
          });

          if (!existingUser) {
            const newUser = await userCollection.insertOne({
              id,
              name,
              email,
              image,
              provider: account.provider,
              createdAt: new Date(),
              role: "user", 
            });

            return { id: newUser.insertedId.toString(), ...user };
          } else {
            return {
              id: existingUser._id.toString(),
              ...existingUser,
            };
          }
        } catch (error) {
          console.error("Error in signIn callback:", error);
          return false; 
        }
      } else {
        return user;
      }
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
