import merge from 'lodash.merge'
import authResolvers from "./auth";

const resolvers = merge({}, authResolvers);

export default resolvers;