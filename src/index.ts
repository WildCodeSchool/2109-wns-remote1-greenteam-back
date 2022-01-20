import "reflect-metadata";
import { ApolloServer } from 'apollo-server'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core';
import {buildSchema} from 'type-graphql'
import { createConnection } from "typeorm";
import initConnectDb from './database/database';
import UserResolver from "./resolvers/userresolver";
import User from "./entity/User";


const port =  process.env.PORT || 5000
async function bootstrap () {

    const connectBdd = await initConnectDb()
    const schema = await buildSchema({
        resolvers: [UserResolver]
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



createConnection().then(async connection => {

    console.log("Inserting a new user into the database...");
    const user = new User();
    user.firstName = "Timber";
    user.lastName = "Saw";
    user.age = 25;
    await connection.manager.save(user);
    console.log(`Saved a new user with id: ${user.idUser}`);

    console.log("Loading users from the database...");
    const users = await connection.manager.find(User);
    console.log("Loaded users: ", users);

    console.log("Here you can setup and run express/koa/any other framework.");

}).catch(error => console.log(error));
