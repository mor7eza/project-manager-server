const { gql } = require("apollo-server");

module.exports = gql`
  type Query {
    login(email: String!, password: String!): AuthData!
  }

  type Mutation {
    createUser(inputUser: userInput!, sysAdmin: Boolean): AuthData!
  }

  type User {
    id: ID!
    fullName: String!
    email: String!
    password: String!
    gender: Boolean
    birthday: String
    avatar: String
    sysAdmin: Boolean
    locked: Boolean
    createdAt: String
    updatedAt: String
    organizations: [OrganizationRole]
    projects: [ProjectRole]
  }

  type Project {
    id: ID!
    name: String!
    users: [User]
    cover: String
    numbers: [Number]
    organization: ID!
    createdAt: String
    updatedAt: String
  }

  type Number {
    id: ID
    number: String
    description: String
    status: Status
    createdAt: String
    updatedAt: String
  }

  type ProjectRole {
    project: ID!
    role: Role!
  }

  type Organization {
    id: ID!
    name: String!
    logo: String
    projects: [Project]
    users: [User]
    createdAt: String
    updatedAt: String
  }

  type OrganizationRole {
    organization: ID!
    role: Role!
  }

  type AuthData {
    token: String!
  }

  input userInput {
    fullName: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  enum Role {
    ADMIN
    USER
    GUEST
  }

  enum Status {
    COMPLETED
    FAILED
    INPROGRESS
  }
`;
