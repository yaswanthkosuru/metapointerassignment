import NextAuth from "next-auth"

declare module "next-auth" {

    interface Session {
        user: {
            phonenumber: string
            name: string
        }
    }
}