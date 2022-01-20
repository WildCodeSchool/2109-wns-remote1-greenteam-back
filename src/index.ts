import "reflect-metadata";
import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import {buildSchema} from 'type-graphql'
import initConnectDb from './database/database';
import Resolvers from './resolvers/resolvers';


const port =  process.env.PORT || 5000
async function bootstrap () {

    const connectBdd = await initConnectDb()
    const schema = await buildSchema({
        resolvers: Resolvers
    })
    // @ts-ignore
    const server = new ApolloServer({
        schema,
        plugins: [
            ApolloServerPluginLandingPageGraphQLPlayground(),
        ],
        cors: {
            origin: ["*"]
        },
        context: {
            bdd: connectBdd
        }
    })

    const {url} = await server.listen(port)
    console.log(`Serveur lancé sur ${url}`)
}

bootstrap()

