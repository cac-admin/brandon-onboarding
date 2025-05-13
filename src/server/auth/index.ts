import NextAuth from "next-auth";
import { cache } from "react";
import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

import { authConfig } from "./config";

const { auth: uncachedAuth, handlers, signIn, signOut } = NextAuth(authConfig);

const auth = cache(uncachedAuth);

export { auth, handlers, signIn, signOut };
