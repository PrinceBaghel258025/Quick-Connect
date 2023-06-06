import { PrismaClient } from "@prisma/client"


export interface GraphQLContext {
    prisma: PrismaClient,
    // figure out passport buildContext type for typescript
    passportFunc: any
    // getUser: () => void,
    // logOut: any
    // token: string | undefined
}