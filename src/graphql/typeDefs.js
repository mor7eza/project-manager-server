const { gql } = require("apollo-server");

module.exports = gql`
    type Query{}

    type Mutation{}

    type User{
        id:ID!
        fullName:String!
        email:String!
        password:String!
        gender:Boolean
        birthday:String
        avatar:String
        sysAdmin:Boolean
        locked:Boolean
        createdAt:String
        updatedAt:String
        organizationRole:[
            {
                organization: ID!
                role:Role!
            }
        ]
        projectRole:[
            {
                project: ID!
                role:Role!
            }
        ]
    }

    type Project{
        id:ID!
        name:String!
        users:[User]
        cover:String
        numbers:[{
            id:ID
            number:String
            description:String
            status: Status
            createdAt:String
            updatedAt:String
        }]
        organization: ID!
        createdAt:String
        updatedAt:String
    }

    type Organization{
        id:ID!
        name:String!
        logo:String
        projects:[Project]
        users:[User]
        createdAt:String
        updatedAt:String
    }

    type AuthData{
        token:String!
        userId:ID!
    }

    input userInput{
        name:String!
        email:String!
        password:String!
        confirmPassword:String!
    }

    enum Role{
        ADMIN,
        USER,
        GUEST
    }

    enum Status{
        COMPLETED,
        FAILED,
        INPROGRESS
    }
`;
