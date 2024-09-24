const express= require("express");
const {ApolloServer}=require("@apollo/server");
const { expressMiddleware } = require("@apollo/server/express4");


const createServer=async ()=>{
    const app = express();
    const PORT=8000;

    const graphqlServer= new ApolloServer({
        typeDefs:`
            type Todo{
                id:ID!
                name:String!
                completed:Boolean!
            }
            
            type Query{
                getTodos:[Todo]
            }
        `,
        resolvers:{
            Query:{getTodos:()=>[{id:0,name:"Gym",completed:false}]}}
    })

    await graphqlServer.start();

    // middlewares
    app.use(express.json());
    app.use("/graphql",expressMiddleware(graphqlServer));

    app.listen(PORT,()=>console.info(`Server has started at ${PORT}`));


}

createServer();
