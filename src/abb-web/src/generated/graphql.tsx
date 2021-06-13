import gql from 'graphql-tag';
import * as Urql from 'urql';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
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
  host: Scalars['Int'];
  propertyType: Scalars['String'];
  mainImage: Scalars['String'];
  latitude: Scalars['Int'];
  longitude: Scalars['Int'];
  amenities: Array<Scalars['String']>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createProperty: PropertyResponse;
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
  options: UsernamePasswordInput;
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};

export type Property = {
  __typename?: 'Property';
  title: Scalars['String'];
  host: User;
  propertyId: Scalars['Int'];
  reviews: User;
  propertyType: Scalars['String'];
  mainImage: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  amenities: Array<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PropertyFieldError = {
  __typename?: 'PropertyFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type PropertyResponse = {
  __typename?: 'PropertyResponse';
  errors?: Maybe<Array<PropertyFieldError>>;
  Property?: Maybe<Property>;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['Int'];
  reviewDescription: Scalars['String'];
  rating: Scalars['String'];
  reviewerId: Scalars['Int'];
  reviewer: User;
  propertyReviews: Scalars['String'];
  property: Property;
  PropertyId: Scalars['Int'];
  propertyId: Scalars['Int'];
  createdAt: Scalars['Int'];
  updatedAt: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  properties: Array<Property>;
  reviews: Array<Review>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type UsernamePasswordInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'firstName' | 'lastName'>
);

export type RegularUserResponseFragment = (
  { __typename?: 'UserResponse' }
  & { errors?: Maybe<Array<(
    { __typename?: 'FieldError' }
    & RegularErrorFragment
  )>>, user?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type CreatePropertyMutationVariables = Exact<{
  options: CreatePropertyInput;
}>;


export type CreatePropertyMutation = (
  { __typename?: 'Mutation' }
  & { createProperty: (
    { __typename?: 'PropertyResponse' }
    & { errors?: Maybe<Array<(
      { __typename?: 'PropertyFieldError' }
      & Pick<PropertyFieldError, 'field' | 'message'>
    )>>, Property?: Maybe<(
      { __typename?: 'Property' }
      & Pick<Property, 'title' | 'propertyId' | 'propertyType' | 'mainImage' | 'amenities' | 'longitude' | 'latitude'>
      & { host: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'email' | 'firstName' | 'lastName'>
      ), reviews: (
        { __typename?: 'User' }
        & Pick<User, 'email' | 'firstName' | 'lastName'>
      ) }
    )> }
  ) }
);

export type LoginMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

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
  firstName
  lastName
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
${RegularUserFragmentDoc}`;
export const CreatePropertyDocument = gql`
    mutation CreateProperty($options: CreatePropertyInput!) {
  createProperty(options: $options) {
    errors {
      field
      message
    }
    Property {
      title
      host {
        id
        email
        firstName
        lastName
      }
      propertyId
      reviews {
        email
        firstName
        lastName
      }
      propertyType
      mainImage
      amenities
      longitude
      latitude
    }
  }
}
    `;

export function useCreatePropertyMutation() {
  return Urql.useMutation<CreatePropertyMutation, CreatePropertyMutationVariables>(CreatePropertyDocument);
};
export const LoginDocument = gql`
    mutation Login($options: UsernamePasswordInput!) {
  login(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useLoginMutation() {
  return Urql.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument);
};
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;

export function useLogoutMutation() {
  return Urql.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument);
};
export const RegisterDocument = gql`
    mutation Register($options: UsernamePasswordInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const MeDocument = gql`
    query Me {
  me {
    ...RegularUser
  }
}
    ${RegularUserFragmentDoc}`;

export function useMeQuery(options: Omit<Urql.UseQueryArgs<MeQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<MeQuery>({ query: MeDocument, ...options });
};