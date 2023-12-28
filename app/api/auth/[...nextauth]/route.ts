import CredentialsProvider from "next-auth/providers/credentials";
import NextAuth from "next-auth"
import { ConnectToDB } from "@/utils/connectDb";
import { AuthOptions } from "next-auth";
import bcrypt from 'bcrypt';
export const handler: AuthOptions = NextAuth({
    providers: [
        CredentialsProvider({
            // The name to display on the sign in form (e.g. "Sign in with...")
            name: "Credentials",
            credentials: {
                phoneNumber: { label: 'Phone Number', type: 'text' },
                password: { label: 'Password', type: 'password' },
            },
            async authorize(credentials, req) {
                const database = await ConnectToDB();
                if (!database) {
                    throw new Error('Failed to connect to the database');
                }
                const userCollection = database?.collection('users');

                if (!credentials) {
                    throw new Error('unable to connect')

                }

                const { phoneNumber, password } = credentials;
                const user = await userCollection?.findOne({ phonenumber: phoneNumber });

                if (!user) {
                    const hashedPassword = await bcrypt.hash(password, 10);
                    const newuser = await userCollection?.insertOne({
                        phonenumber: phoneNumber,
                        password: hashedPassword
                    });

                    if (!newuser) {
                        throw new Error('unable to connect')

                    }

                    return { id: newuser.insertedId.toString(), name: phoneNumber };
                }

                if (user) {
                    const passwordMatch = await bcrypt.compare(password, user.password);
                    console.log(passwordMatch);


                    if (passwordMatch) {
                        console.log(user._id.toString(), user.phonenumber, user);
                        return { id: user._id.toJSON(), name: user.phonenumber };
                    }
                    else {
                        throw new Error('password mismatch');
                    }
                }

                return null;
            }

        })
    ],
    session: {
        strategy: "jwt",
    },
    pages: {
        signIn: '/auth/signin'
    },
    secret: process.env.NEXTAUTH_SECRET

})

export { handler as GET, handler as POST }
