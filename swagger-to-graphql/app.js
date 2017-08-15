const express = require('express');
const app = express();
var graphqlHTTP = require('express-graphql');
var graphql = require('graphql');
var graphQLSchema = require('swagger-to-graphql');
 
graphQLSchema('./sample/petstore.json').then(schema => {
  app.use('/graphql', graphqlHTTP(() => {
    return {
      schema,
      context: {
        GQLProxyBaseUrl: 'http://petstore.swagger.io/v2'
      },
      graphiql: true
    };
  }));
 
  app.listen(3000, 'localhost', () => {
    console.info(`API is here localhost:3000/graphql`);
  });
}).catch(e => {
  throw e;
});
