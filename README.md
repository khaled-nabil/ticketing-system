# NOTE
This repository is still undergoing development.

# Application
A simple ticketing system where multiple users create and assign tickets and update ticket statues

# Implementation
The system exposes ApolloServer using NodeJs. Using schemas to define GraphQL and Mongoose to persist data to MongoDB server.

As a front-end, react connects to the ApolloServer using react-apollo and using Bootstrap 4 implements the UI of the ticketing system.

# Generating the types from schema
    npm i -g apollo@2.4.4
    apollo schema:download --endpoint http://localhost:4000 schema.json
    apollo codegen:generate --schema schema.json --target typescript __generated__
    
    apollo client:codegen --localSchemaFile schema.json --target typescript __generated__
