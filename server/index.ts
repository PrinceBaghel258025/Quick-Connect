import 'dotenv/config'
import express, { Request, Response } from 'express';
require('./auth/passport')
import http from 'http'
import { ApolloServer } from '@apollo/server';
import {expressMiddleware} from '@apollo/server/express4'
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import passport from 'passport';
import {buildContext} from 'graphql-passport'
import session from 'express-session';
import cors from 'cors';
import { PrismaClient } from '@prisma/client'
import typeDefs from './graphql/typeDefs';
import resolvers from './graphql/resolvers';
import { GraphQLContext } from './utils/types';

export const prisma = new PrismaClient()

const server = async () => {
    const app = express();
    const httpServer = http.createServer(app)



    app.use(cors({
        origin: ['http://localhost:3000', 'http://localhost:5000'],
        credentials: true
    }))
    app.use(session({
        secret: process.env.SESSION_SECRET || 'fallbacksessionsecret',
        resave: false,
        saveUninitialized: true,
        cookie: { secure: true }
    }))

    app.use(passport.initialize());
    app.use(passport.session());


    const server = new ApolloServer({
        typeDefs,
        resolvers,
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })
    await server.start();
    app.use(
        '/',
        cors<cors.CorsRequest>(),
        express.json(),
        // expressMiddleware accepts the same arguments:
        // an Apollo Server instance and optional configuration options
        expressMiddleware(server, {
          context: async ({req, res}) : Promise<GraphQLContext> => ({  
            prisma: prisma,
            passportFunc : buildContext({req,res})
            // getUser: () => req.user,
            // logOut: () => req.logout((err) => {if(err) return err}) 
        }),
        }),
      );


    app.get('/auth/google', passport.authenticate('google', {
        scope: ['email', 'profile']
    }))

    app.get('/auth/google/callback', (req, res, next) => {
        passport.authenticate('google', {
            failureRedirect: '/'
        })
        res.redirect('http://localhost:3000')
    },    // return res.redirect('http://localhost:3000')
    )

    app.get('/user', (req: Request, res: Response) => {
        // console.log("req.user", req)
        res.json({
            user: req.user
        })
        // res.redirect('http://localhost:3000')
    })
    app.get('/users', async (req: Request, res: Response) => {
        const users = await prisma.user.findMany()
        return res.status(200).json({
            users
        })
    })

    await new Promise<void>((resolve) => httpServer.listen({ port: 5000 }, resolve));
    console.log(`🚀 Server ready at http://localhost:5000/`);
}

server();