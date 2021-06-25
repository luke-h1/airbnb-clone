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
  propertyType: Scalars['String'];
  description: Scalars['String'];
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
  createProperty: PropertyResponse;
  updateProperty?: Maybe<Property>;
  deleteProperty: Scalars['Boolean'];
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationCreatePropertyArgs = {
  options: CreatePropertyInput;
};


export type MutationUpdatePropertyArgs = {
  id: Scalars['Int'];
  options: UpdatePropertyInput;
};


export type MutationDeletePropertyArgs = {
  id: Scalars['Int'];
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

export type PaginatedProperties = {
  __typename?: 'PaginatedProperties';
  properties: Array<Property>;
  hasMore: Scalars['Boolean'];
};

export type Property = {
  __typename?: 'Property';
  id: Scalars['Int'];
  title: Scalars['String'];
  creatorId: Scalars['Int'];
  propertyType: Scalars['String'];
  mainImage: Scalars['String'];
  description: Scalars['String'];
  pricePerNight: Scalars['Int'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  amenities: Array<Scalars['String']>;
  reviews?: Maybe<Array<Review>>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  creator: User;
};

export type PropertyFieldError = {
  __typename?: 'PropertyFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type PropertyResponse = {
  __typename?: 'PropertyResponse';
  errors?: Maybe<Array<PropertyFieldError>>;
  property?: Maybe<Property>;
};

export type Query = {
  __typename?: 'Query';
  properties: PaginatedProperties;
  property: Property;
  hello: Scalars['String'];
  me?: Maybe<User>;
};


export type QueryPropertiesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryPropertyArgs = {
  id: Scalars['Int'];
};

export type Review = {
  __typename?: 'Review';
  id: Scalars['Int'];
  creatorId: Scalars['Int'];
  creator: User;
  title: Scalars['String'];
  body: Scalars['String'];
};

export type UpdatePropertyInput = {
  title: Scalars['String'];
  propertyType: Scalars['String'];
  description: Scalars['String'];
  mainImage: Scalars['String'];
  pricePerNight: Scalars['Int'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  amenities: Array<Scalars['String']>;
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

export type RegularErrorFragment = (
  { __typename?: 'FieldError' }
  & Pick<FieldError, 'field' | 'message'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email' | 'fullName' | 'firstName' | 'lastName' | 'picture'>
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
    )>>, property?: Maybe<(
      { __typename?: 'Property' }
      & Pick<Property, 'id' | 'title' | 'propertyType' | 'mainImage' | 'description' | 'pricePerNight' | 'latitude' | 'amenities' | 'longitude' | 'createdAt' | 'updatedAt'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'email' | 'picture' | 'fullName'>
      ), reviews?: Maybe<Array<(
        { __typename?: 'Review' }
        & Pick<Review, 'id' | 'title' | 'body'>
        & { creator: (
          { __typename?: 'User' }
          & Pick<User, 'id' | 'email' | 'fullName'>
        ) }
      )>> }
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
  options: UserRegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & RegularUserResponseFragment
  ) }
);

export type UpdatePropertyMutationVariables = Exact<{
  options: UpdatePropertyInput;
  id: Scalars['Int'];
}>;


export type UpdatePropertyMutation = (
  { __typename?: 'Mutation' }
  & { updateProperty?: Maybe<(
    { __typename?: 'Property' }
    & Pick<Property, 'id' | 'title' | 'propertyType' | 'mainImage' | 'description' | 'longitude' | 'latitude' | 'amenities' | 'createdAt' | 'updatedAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'fullName' | 'picture' | 'createdAt' | 'updatedAt'>
    ), reviews?: Maybe<Array<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'title' | 'body'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'email' | 'fullName'>
      ) }
    )>> }
  )> }
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & RegularUserFragment
  )> }
);

export type PropertiesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type PropertiesQuery = (
  { __typename?: 'Query' }
  & { properties: (
    { __typename?: 'PaginatedProperties' }
    & Pick<PaginatedProperties, 'hasMore'>
    & { properties: Array<(
      { __typename?: 'Property' }
      & Pick<Property, 'id' | 'title' | 'propertyType' | 'mainImage' | 'description' | 'pricePerNight' | 'latitude' | 'amenities' | 'longitude' | 'createdAt' | 'updatedAt'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'email' | 'picture' | 'fullName'>
      ), reviews?: Maybe<Array<(
        { __typename?: 'Review' }
        & Pick<Review, 'id' | 'title' | 'body'>
        & { creator: (
          { __typename?: 'User' }
          & Pick<User, 'id' | 'email' | 'fullName'>
        ) }
      )>> }
    )> }
  ) }
);

export type PropertyQueryVariables = Exact<{
  id: Scalars['Int'];
}>;


export type PropertyQuery = (
  { __typename?: 'Query' }
  & { property: (
    { __typename?: 'Property' }
    & Pick<Property, 'id' | 'title' | 'propertyType' | 'mainImage' | 'description' | 'pricePerNight' | 'latitude' | 'amenities' | 'longitude' | 'createdAt' | 'updatedAt'>
    & { creator: (
      { __typename?: 'User' }
      & Pick<User, 'id' | 'email' | 'picture' | 'fullName'>
    ), reviews?: Maybe<Array<(
      { __typename?: 'Review' }
      & Pick<Review, 'id' | 'title' | 'body'>
      & { creator: (
        { __typename?: 'User' }
        & Pick<User, 'id' | 'email' | 'fullName'>
      ) }
    )>> }
  ) }
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
${RegularUserFragmentDoc}`;
export const CreatePropertyDocument = gql`
    mutation CreateProperty($options: CreatePropertyInput!) {
  createProperty(options: $options) {
    errors {
      field
      message
    }
    property {
      id
      title
      propertyType
      mainImage
      description
      pricePerNight
      latitude
      amenities
      longitude
      createdAt
      updatedAt
      creator {
        id
        email
        picture
        fullName
      }
      reviews {
        id
        title
        body
        creator {
          id
          email
          fullName
        }
      }
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
    mutation Register($options: UserRegisterInput!) {
  register(options: $options) {
    ...RegularUserResponse
  }
}
    ${RegularUserResponseFragmentDoc}`;

export function useRegisterMutation() {
  return Urql.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument);
};
export const UpdatePropertyDocument = gql`
    mutation UpdateProperty($options: UpdatePropertyInput!, $id: Int!) {
  updateProperty(options: $options, id: $id) {
    id
    title
    creator {
      id
      email
      fullName
      picture
      createdAt
      updatedAt
    }
    propertyType
    mainImage
    description
    propertyType
    longitude
    latitude
    amenities
    reviews {
      id
      title
      body
      creator {
        id
        email
        fullName
      }
    }
    createdAt
    updatedAt
  }
}
    `;

export function useUpdatePropertyMutation() {
  return Urql.useMutation<UpdatePropertyMutation, UpdatePropertyMutationVariables>(UpdatePropertyDocument);
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
export const PropertiesDocument = gql`
    query Properties($limit: Int!, $cursor: String) {
  properties(limit: $limit, cursor: $cursor) {
    hasMore
    properties {
      id
      title
      propertyType
      mainImage
      description
      pricePerNight
      latitude
      amenities
      longitude
      createdAt
      updatedAt
      creator {
        id
        email
        picture
        fullName
      }
      reviews {
        id
        title
        body
        creator {
          id
          email
          fullName
        }
      }
    }
  }
}
    `;

export function usePropertiesQuery(options: Omit<Urql.UseQueryArgs<PropertiesQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PropertiesQuery>({ query: PropertiesDocument, ...options });
};
export const PropertyDocument = gql`
    query Property($id: Int!) {
  property(id: $id) {
    id
    title
    propertyType
    mainImage
    description
    pricePerNight
    latitude
    amenities
    longitude
    createdAt
    updatedAt
    creator {
      id
      email
      picture
      fullName
    }
    reviews {
      id
      title
      body
      creator {
        id
        email
        fullName
      }
    }
  }
}
    `;

export function usePropertyQuery(options: Omit<Urql.UseQueryArgs<PropertyQueryVariables>, 'query'> = {}) {
  return Urql.useQuery<PropertyQuery>({ query: PropertyDocument, ...options });
};