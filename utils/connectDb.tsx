import { MongoClient, ServerApiVersion } from "mongodb";
const uri = process.env.MONGODB_URI as string;
let isconnected = false;
let client: MongoClient | null = null;

function createClient(): MongoClient | null {
    if (!isconnected && uri) {
        return new MongoClient(uri, {
            serverApi: {
                version: ServerApiVersion.v1,
                strict: true,
                deprecationErrors: true,
            }
        });
    }
    return null;
}

export async function ConnectToDB() {
    if (!client) {
        client = createClient();
    }

    if (!client) {
        console.error('MongoDB URI is not defined.');
        return null;
    }

    try {
        if (!isconnected) {
            console.log('Connecting to MongoDB');
            await client.connect();
            isconnected = true;
            console.log('MongoDB driver connected successfully!');
        }
        const database = client.db('assignment');
        return database;
    } catch (err) {
        console.error('Unable to connect to the database:', err);
        throw err; // Throw the error to be handled by the caller.
    }
}

