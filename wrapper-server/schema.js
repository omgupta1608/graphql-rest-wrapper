const {
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList
} = require('graphql');

const fetch = require('node-fetch');
const UserType = new GraphQLObjectType({
    name: 'User',
    description: '...',
    fields: ({
        id: { 
            type: GraphQLInt
        },
        name: { 
            type: GraphQLString
        }
    })
});
const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: '...',
    fields: ({
        users: {
            type: GraphQLList(UserType),
            resolve: async () => {
                var data = null;
                await fetch('http://localhost:4000/').then(res => res.json()).then(json => { data = json });
                return data;
            }
        },
        user: {
            type: UserType,
            args: {
                id: { type: GraphQLInt }
            },
            resolve: async (parent, args) => {
                var data = null;
                await fetch(`http://localhost:4000/${args.id}`).then(res => res.json()).then(json => { data = json });
                return data;
            }
        }
    })
});


module.exports.schema = new GraphQLSchema({
    query: RootQueryType
});