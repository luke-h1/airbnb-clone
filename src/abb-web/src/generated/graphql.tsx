import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
export type Omit<T, K extends keyof T> = Pick<T, Exclude<keyof T, K>>;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type CreatePropertyInput = {
  title: Scalars['String'];
  propertyType: Scalars['String'];
  mainImage: Scalars['String'];
  pricePerNight: Scalars['Int'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  amenities: Array<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProperty: Property;
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};

export type MutationCreatePropertyArgs = {
  options: CreatePropertyInput;
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};

export type MutationRegisterArgs = {
  options: UserRegisterInput;
};

export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};

export type Property = {
  __typename?: 'Property';
  id: Scalars['Int'];
  title: Scalars['String'];
  userId: Scalars['Int'];
  user: User;
  propertyType: Scalars['String'];
  mainImage: Scalars['String'];
  pricePerNight: Scalars['Int'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  amenities: Array<Scalars['String']>;
  reviews: Array<Review>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  propertyCreator: User;
};

export type Query = {
  __typename?: 'Query';
  properties: Array<Property>;
  property: Property;
  hello: Scalars['String'];
  me?: Maybe<User>;
};

export type QueryPropertyArgs = {
  id: Scalars['Int'];
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['Int'];
  user: User;
  title: Scalars['String'];
  body: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  picture?: Maybe<Scalars['String']>;
  lastName: Scalars['String'];
  properties: Array<Property>;
  reviews: Array<Review>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  fullName: Scalars['String'];
};

export type UserRegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  picture: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegularErrorFragment = { __typename?: 'FieldError' } & Pick<
  FieldError,
  'field' | 'message'
>;

export type RegularUserFragment = { __typename?: 'User' } & Pick<
  User,
  'id' | 'email' | 'fullName' | 'firstName' | 'lastName' | 'picture'
>;

export type RegularUserResponseFragment = { __typename?: 'UserResponse' } & {
  errors?: Maybe<Array<{ __typename?: 'FieldError' } & RegularErrorFragment>>;
  user?: Maybe<{ __typename?: 'User' } & RegularUserFragment>;
};

export type CreatePropertyMutationVariables = Exact<{
  options: CreatePropertyInput;
}>;

export type CreatePropertyMutation = { __typename?: 'Mutation' } & {
  createProperty: { __typename?: 'Property' } & Pick<
    Property,
    | 'userId'
    | 'title'
    | 'propertyType'
    | 'mainImage'
    | 'latitude'
    | 'longitude'
    | 'amenities'
    | 'pricePerNight'
    | 'createdAt'
    | 'updatedAt'
  >;
};

export type LoginMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;

export type LoginMutation = { __typename?: 'Mutation' } & {
  login: { __typename?: 'UserResponse' } & RegularUserResponseFragment;
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'logout'
>;

export type RegisterMutationVariables = Exact<{
  options: UserRegisterInput;
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'UserResponse' } & RegularUserResponseFragment;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & RegularUserFragment>;
};

export type PropertiesQueryVariables = Exact<{ [key: string]: never }>;

export type PropertiesQuery = { __typename?: 'Query' } & {
  properties: Array<
    { __typename?: 'Property' } & Pick<
      Property,
      'id' | 'title' | 'propertyType' | 'mainImage' | 'amenities'
    > & {
        reviews: Array<
          { __typename?: 'Review' } & Pick<Review, 'id' | 'title' | 'body'> & {
              user: { __typename?: 'User' } & Pick<
                User,
                'id' | 'picture' | 'createdAt' | 'fullName'
              >;
            }
        >;
        propertyCreator: { __typename?: 'User' } & Pick<
          User,
          'firstName' | 'lastName'
        >;
      }
  >;
};

export type PropertyQueryVariables = Exact<{
  id: Scalars['Int'];
}>;

export type PropertyQuery = { __typename?: 'Query' } & {
  property: { __typename?: 'Property' } & Pick<
    Property,
    | 'id'
    | 'title'
    | 'propertyType'
    | 'mainImage'
    | 'latitude'
    | 'longitude'
    | 'amenities'
  > & {
      reviews: Array<
        { __typename?: 'Review' } & Pick<Review, 'id' | 'title' | 'body'> & {
            user: { __typename?: 'User' } & Pick<
              User,
              'id' | 'picture' | 'createdAt' | 'fullName'
            >;
          }
      >;
      propertyCreator: { __typename?: 'User' } & Pick<
        User,
        'email' | 'firstName' | 'lastName'
      >;
    };
};

export const RegularErrorFragmentDoc = gql`
  fragment RegularError on FieldError {
    field
    message
  }
`;
export const RegularUserFragmentDoc = gql`
  fragment RegularUser on User {
    id
    email
    fullName
    firstName
    lastName
    picture
  }
`;
export const RegularUserResponseFragmentDoc = gql`
  fragment RegularUserResponse on UserResponse {
    errors {
      ...RegularError
    }
    user {
      ...RegularUser
    }
  }
  ${RegularErrorFragmentDoc}
  ${RegularUserFragmentDoc}
`;
export const CreatePropertyDocument = gql`
  mutation CreateProperty($options: CreatePropertyInput!) {
    createProperty(options: $options) {
      userId
      title
      propertyType
      mainImage
      latitude
      longitude
      amenities
      pricePerNight
      createdAt
      updatedAt
    }
  }
`;

export function useCreatePropertyMutation() {
  return Urql.useMutation<
    CreatePropertyMutation,
    CreatePropertyMutationVariables
  >(CreatePropertyDocument);
}
export const LoginDocument = gql`
  mutation Login($options: UsernamePasswordInput!) {
    login(options: $options) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
}
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument
  );
}
export const RegisterDocument = gql`
  mutation Register($options: UserRegisterInput!) {
    register(options: $options) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument
  );
}
export const MeDocument = gql`
  query Me {
    me {
      ...RegularUser
    }
  }
  ${RegularUserFragmentDoc}
`;

export function useMeQuery(
  options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
}
export const PropertiesDocument = gql`
  query Properties {
    properties {
      id
      title
      propertyType
      mainImage
      amenities
      reviews {
        id
        user {
          id
          picture
          createdAt
          fullName
        }
        title
        body
      }
      propertyCreator {
        firstName
        lastName
      }
    }
  }
`;

export function usePropertiesQuery(
  options: Omit<Urql.UseQueryArgs<PropertiesQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<PropertiesQuery>({
    query: PropertiesDocument,
    ...options,
  });
}
export const PropertyDocument = gql`
  query Property($id: Int!) {
    property(id: $id) {
      id
      title
      propertyType
      mainImage
      latitude
      longitude
      amenities
      reviews {
        id
        user {
          id
          picture
          createdAt
          fullName
        }
        title
        body
      }
      propertyCreator {
        email
        firstName
        lastName
      }
    }
  }
`;

export function usePropertyQuery(
  options: Omit<Urql.UseQueryArgs<PropertyQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<PropertyQuery>({ query: PropertyDocument, ...options });
}
