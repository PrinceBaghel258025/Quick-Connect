import gql from 'graphql-tag';

const typeDefs = gql`
    type Query {
        currentUser(id: String): User
    },
    type Mutation {
        signUpUser(username: String, password: String, displayName: String) : User,
        login(email: String!, password: String!) : User
    }
    type User {
        id: String,
        email: String,
        displayName: String
        # name: String
    }

`;

export default typeDefs;