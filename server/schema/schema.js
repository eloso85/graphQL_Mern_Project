// const { projects, clients } = require('../sampleData.js');

const Project = require('../models/Project')
const Client = require('../models/Client')

const{ 
    GraphQLObjectType, 
    GraphQLID, 
    GraphQLString, 
    GraphQLSchema, 
    GraphQLList, 
    GraphQLNonNull
} = require('graphql')

//client type

const ClientType = new GraphQLObjectType({
    name: 'Client',
    fields: ()=>({
        id: { type: GraphQLID },
        name: {type: GraphQLString},
        email: {type: GraphQLString},
        phone: {type: GraphQLString},
    })
});

const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: ()=>({
        id: { type: GraphQLID },
        name: {type: GraphQLString},
        description: {type: GraphQLString},
        status: {type: GraphQLString},
        client: {
            type: ClientType,
            resolve(parent,args){
                return Client.findById(parent.clientId);
                //this mathces client client id with project id
            }
        },

    })
});

//root query

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        projects:{
            //setting a client type into a list /will call all clients
            type: new GraphQLList(ProjectType),
            resolve(parent, args){
                return Project.find()
            }
        },
        project:{
            type: ProjectType,
            args: {id: {type: GraphQLID} },
            resolve(parent, args){
                return Project.findById(args.id)
            }
        },
        
        clients:{
            //setting a client type into a list /will call all clients
            type: new GraphQLList(ClientType),
            resolve(parent, args){
                return Client.find()
            }
        },
        client:{
            type: ClientType,
            args: {id: {type: GraphQLID} },
            resolve(parent, args){
                return Client.findById(args.id)
            }
        }
    }
});

//Mutatin
const mutation = new GraphQLObjectType({
    name: 'Mutation',
    fields: {
        addClient:{
            type: ClientType,
            args:{
                name: { type: GraphQLNonNull(GraphQLString) },
                email: { type: GraphQLNonNull(GraphQLString) },
                phone: { type: GraphQLNonNull(GraphQLString) },
            },
            resolve(parent, args) {//taking args from above adding to fields and then saving.
                const client = new Client({
                    name: args.name,
                    email: args.email,
                    phone: args.phone,
                });
                return client.save();
            },
        },
        //Delete client
        deleteClient:{
            type: ClientType,
            args: {
                id: {type: GraphQLNonNull(GraphQLID)},
            },
                resolve(parent, args) {
                    return Client.findByIdAndRemove(args.id)
                }
            
        }
    }
})

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});