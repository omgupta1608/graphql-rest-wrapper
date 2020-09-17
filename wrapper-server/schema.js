const {
    GraphQLInt,
    GraphQLString,
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLList
} = require('graphql');

const fetch = require('node-fetch');

const ResponseType = new GraphQLObjectType({
    name: 'Response',
    description: '...',
    fields: ({
        data: { type: GraphQLString },
        message: { type: GraphQLString }
    })
});

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

const RootMutationType = new GraphQLObjectType({
    name: 'Mutations',
    description: '...',
    fields: ({
        addUser:{
            type: ResponseType,
            args:{
                name: { type: GraphQLString }
            },
            resolve: async (parent, args) => {
                var data = JSON.stringify({name: args.name});
                console.log(data);
                var q = null;
                await fetch(`http://localhost:4000/addUser`,{ 
                    method: 'POST',
                    body: data,
                    headers: { 'Content-Type': 'application/json' }
                }).then(res => res.json()).then(json => {
                    q = json;
                });
                console.log(q);
                return q;
            }
        }
    })
});


module.exports.schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType
});