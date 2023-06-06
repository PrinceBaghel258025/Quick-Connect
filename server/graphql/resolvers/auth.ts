import gql from 'graphql-tag';
import { GraphQLContext } from '../../utils/types';
import { GraphQLError } from 'graphql';

const authResolvers = {
    Query: {
        currentUser: async (_: any, args: { id: string }, context: GraphQLContext) => {
            return { id: '121' }
        }
    },
    Mutation: {
        signUpUser: async (_: any, { username, password, displayName }: { username: string, password: string, displayName: string }, {prisma, passportFunc}: GraphQLContext) => {
            // console.log("variables", username, password, displayName);
            // check if username is already registered
            const isUserExists = await prisma.user.findFirst({
                where: {
                    email: username
                }
            })
            // console.log(isUserExists);
            if(isUserExists){
                throw new GraphQLError('User already exist')
            }
            const newUser = await prisma.user.create({
                data: {
                    email: username,
                    password: 'password',
                    displayName
                },
                select: {
                    id: true,
                    email: true,
                    displayName: true
                }
            })
            console.log("newUser", newUser)
            return { id : newUser.id, displayName: newUser.displayName }
        },
        login: async (_: any, { email, password }: { email: string, password: string }, { passportFunc }: GraphQLContext) => {
            const { user } = await passportFunc.authenticate('graphql-local', { email, password });
            const searilizeUser = await passportFunc.login(user);
            console.log("serializeUser", searilizeUser)
            console.log(user)
            return { user }
        }
    }
}

export default authResolvers;    