import { ApolloServer } from '@apollo/server';
import { json } from '@sveltejs/kit';
import { typeDefs, resolvers } from '$lib/graphql';
import { connectDB } from '$lib/db';
import { authMiddleware } from '$lib/authMiddleware';

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

    const { authenticated, user } = await authMiddleware({ request });
    console.log('Auth middleware result:', { authenticated, user }); // Debug log

    try {
        const contextValue = { authenticated, user };
        console.log('Context value:', contextValue); // Debug log

        const response = await server.executeOperation(
            { query, variables, operationName },
            { contextValue }
        );

        console.log('Apollo response:', response); // Debug log

        return json(response);
    } catch (error) {
        console.error('GraphQL execution error:', error);
        return json({ errors: [{ message: 'Internal server error' }] }, { status: 500 });
    }
}