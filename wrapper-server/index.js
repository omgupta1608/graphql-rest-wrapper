const express = require('express');
const { graphqlHTTP } = require('express-graphql');
const app = express();

const schema = require('./schema').schema;

app.use(graphqlHTTP({
    schema,
    graphiql: true
}));

app.listen(5000, () => {
    console.log('Wrapper server started');
});
