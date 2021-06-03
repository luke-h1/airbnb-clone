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

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type Listing = {
  __typename?: 'Listing';
  name: Scalars['String'];
  category: Scalars['String'];
  pictureUrl: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  beds: Scalars['Float'];
  guests: Scalars['Float'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  amenities: Array<Scalars['String']>;
  userId: Scalars['String'];
};

export type ListingFieldError = {
  __typename?: 'ListingFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type ListingInput = {
  name: Scalars['String'];
  category: Scalars['String'];
  picture: Scalars['String'];
  description: Scalars['String'];
  price: Scalars['Float'];
  beds: Scalars['Float'];
  guests: Scalars['Float'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  amenities: Array<Scalars['String']>;
};

export type ListingResponse = {
  __typename?: 'ListingResponse';
  errors?: Maybe<Array<ListingFieldError>>;
  listing?: Maybe<Listing>;
};

export type Mutation = {
  __typename?: 'Mutation';
  createListing: ListingResponse;
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  confirmUser: Scalars['Boolean'];
  login: UserResponse;
  logout: Scalars['Boolean'];
};


export type MutationCreateListingArgs = {
  options: ListingInput;
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


export type MutationConfirmUserArgs = {
  token: Scalars['String'];
};


export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};

export type Query = {
  __typename?: 'Query';
  hello: Scalars['String'];
  me?: Maybe<User>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  listings: Listing;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
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

export type RegularListingResponseFragment = (
  { __typename?: 'Listing' }
  & Pick<Listing, 'name' | 'category' | 'pictureUrl' | 'description' | 'price' | 'beds' | 'guests' | 'latitude' | 'longitude' | 'amenities'>
);

export type RegularUserFragment = (
  { __typename?: 'User' }
  & Pick<User, 'id' | 'email'>
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

export type CreateListingMutationVariables = Exact<{
  options: ListingInput;
}>;


export type CreateListingMutation = (
  { __typename?: 'Mutation' }
  & { createListing: (
    { __typename?: 'ListingResponse' }
    & { listing?: Maybe<(
      { __typename?: 'Listing' }
      & RegularListingResponseFragment
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

export const RegularListingResponseFragmentDoc = gql`
    fragment RegularListingResponse on Listing {
  name
  category
  pictureUrl
  description
  price
  beds
  guests
  latitude
  longitude
  amenities
}
    `;
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
export const CreateListingDocument = gql`
    mutation CreateListing($options: ListingInput!) {
  createListing(options: $options) {
    listing {
      ...RegularListingResponse
    }
  }
}
    ${RegularListingResponseFragmentDoc}`;

export function useCreateListingMutation() {
  return Urql.useMutation<CreateListingMutation, CreateListingMutationVariables>(CreateListingDocument);
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