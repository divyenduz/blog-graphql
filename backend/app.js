const express = require("express");
const graphQLHTTP = require("express-graphql");
const {
    GraphQLSchema,
    GraphQLObjectType,
    GraphQLNonNull,
    GraphQLString,
    GraphQLID,
    GraphQLList
} = require("graphql");

const fakeDatabase = [
    { id: 1, title: "post one title", content: "post one content" },
    { id: 2, title: "post two title", content: "post two content" }
];

const Post = new GraphQLObjectType({
    name: "Post",
    description: "Post type definition",
    fields: {
        id: {
            type: new GraphQLNonNull(GraphQLID),
            description: "ID of the post",
            resolve: post => post.id
        },
        title: {
            type: GraphQLString,
            description: "Title of the post",
            resolve: post => post.title
        },
        content: {
            type: GraphQLString,
            description: "Content of the post",
            resolve: post => post.content
        }
    }
});

const Query = new GraphQLObjectType({
    name: "Query",
    description: "Query interface for our blog",
    fields: {
        post: {
            type: Post,
            description: "Query to get a single post",
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            resolve: (_, args) => {
                return fakeDatabase.filter(row => row.id === args.id)[0];
            }
        },
        posts: {
            type: new GraphQLList(Post),
            description: "Query to get a all posts",
            args: {},
            resolve: (_, args) => {
                return fakeDatabase;
            }
        }
    }
});

const Mutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Mutation interface for our blog",
    fields: {
        createPost: {
            type: Post,
            args: {
                title: {
                    type: GraphQLString,
                    description: "Title of the post"
                },
                content: {
                    type: GraphQLString,
                    description: "Content of the post"
                }
            },
            resolve: (_, args) => {
                const post = {
                    id: fakeDatabase.length + 1,
                    title: args.title,
                    content: args.content
                };
                fakeDatabase.push(post);
                return post;
            }
        }
    }
});

const schema = new GraphQLSchema({
    query: Query,
    mutation: Mutation
});

let app = express();

app.use(
    "/backend",
    graphQLHTTP({
        schema,
        graphiql: true
    })
);

app.listen(5000);
console.log("Server started on port 5000");
