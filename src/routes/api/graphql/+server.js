import { ApolloServer } from '@apollo/server';
import { json } from '@sveltejs/kit';
import { typeDefs, resolvers } from '$lib/graphql';
import { connectDB } from '$lib/db';

let apolloServer;

async function createApolloServer() {
    if (!apolloServer) {
        await connectDB();
        apolloServer = new ApolloServer({
            typeDefs,
            resolvers,
        });
        await apolloServer.start();
    }
    return apolloServer;
}

export async function POST({ request }) {
    const server = await createApolloServer();
    
    const { query, variables, operationName } = await request.json();
    
    try {
        const response = await server.executeOperation({
            query,
            variables,
            operationName,
        });

        return json(response);
    } catch (error) {
        console.error('GraphQL execution error:', error);
        return json({ errors: [{ message: 'Internal server error' }] }, { status: 500 });
    }
}

export function GET() {
    return new Response('Use POST for GraphQL queries', { status: 405 });
}
