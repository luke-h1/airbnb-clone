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
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type DeleteResponse = {
  __typename?: 'DeleteResponse';
  errors?: Maybe<Array<FieldError>>;
  success?: Maybe<Scalars['Boolean']>;
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
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  deleteUser: DeleteResponse;
};

export type MutationCreatePropertyArgs = {
  image?: Maybe<Scalars['Upload']>;
  options: PropertyInput;
};

export type MutationUpdatePropertyArgs = {
  image?: Maybe<Scalars['Upload']>;
  id: Scalars['Int'];
  options: PropertyInput;
};

export type MutationDeletePropertyArgs = {
  id: Scalars['Int'];
};

export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};

export type MutationRegisterArgs = {
  image?: Maybe<Scalars['Upload']>;
  options: UserRegisterInput;
};

export type MutationLoginArgs = {
  options: UsernamePasswordInput;
};

export type MutationDeleteUserArgs = {
  id: Scalars['Float'];
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
  likeStatus?: Maybe<Scalars['Int']>;
  propertyType: Scalars['String'];
  image: Scalars['String'];
  beds: Scalars['Int'];
  baths: Scalars['Int'];
  bedrooms: Scalars['Int'];
  description: Scalars['String'];
  pricePerNight: Scalars['Int'];
  address: Scalars['String'];
  amenities: Array<Scalars['String']>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  creator: User;
};

export type PropertyFieldError = {
  __typename?: 'PropertyFieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type PropertyInput = {
  title: Scalars['String'];
  propertyType: Scalars['String'];
  description: Scalars['String'];
  pricePerNight: Scalars['Int'];
  beds: Scalars['Int'];
  baths: Scalars['Int'];
  bedrooms: Scalars['Int'];
  address: Scalars['String'];
  amenities: Array<Scalars['String']>;
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
  me?: Maybe<User>;
};

export type QueryPropertiesArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};

export type QueryPropertyArgs = {
  id: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  image: Scalars['String'];
  lastName: Scalars['String'];
  properties: Array<Property>;
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
  fullName: Scalars['String'];
};

export type UserRegisterInput = {
  firstName: Scalars['String'];
  lastName: Scalars['String'];
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

export type RegularErrorFragment = {
  __typename?: 'FieldError';
  field: string;
  message: string;
};

export type RegularUserFragment = {
  __typename?: 'User';
  id: number;
  email: string;
  fullName: string;
  firstName: string;
  lastName: string;
  image: string;
};

export type RegularUserResponseFragment = {
  __typename?: 'UserResponse';
  errors?: Maybe<
    Array<{ __typename?: 'FieldError'; field: string; message: string }>
  >;
  user?: Maybe<{
    __typename?: 'User';
    id: number;
    email: string;
    fullName: string;
    firstName: string;
    lastName: string;
    image: string;
  }>;
};

export type CreatePropertyMutationVariables = Exact<{
  options: PropertyInput;
  image: Scalars['Upload'];
}>;

export type CreatePropertyMutation = {
  __typename?: 'Mutation';
  createProperty: {
    __typename?: 'PropertyResponse';
    errors?: Maybe<
      Array<{
        __typename?: 'PropertyFieldError';
        field: string;
        message: string;
      }>
    >;
    property?: Maybe<{
      __typename?: 'Property';
      id: number;
      image: string;
      title: string;
      propertyType: string;
      description: string;
      pricePerNight: number;
      address: string;
      amenities: Array<string>;
      baths: number;
      beds: number;
      bedrooms: number;
      createdAt: string;
      updatedAt: string;
      creator: {
        __typename?: 'User';
        id: number;
        email: string;
        image: string;
        fullName: string;
      };
    }>;
  };
};

export type DeletePropertyMutationVariables = Exact<{
  id: Scalars['Int'];
}>;

export type DeletePropertyMutation = {
  __typename?: 'Mutation';
  deleteProperty: boolean;
};

export type LoginMutationVariables = Exact<{
  options: UsernamePasswordInput;
}>;

export type LoginMutation = {
  __typename?: 'Mutation';
  login: {
    __typename?: 'UserResponse';
    errors?: Maybe<
      Array<{ __typename?: 'FieldError'; field: string; message: string }>
    >;
    user?: Maybe<{
      __typename?: 'User';
      id: number;
      email: string;
      fullName: string;
      firstName: string;
      lastName: string;
      image: string;
    }>;
  };
};

export type LogoutMutationVariables = Exact<{ [key: string]: never }>;

export type LogoutMutation = { __typename?: 'Mutation'; logout: boolean };

export type RegisterMutationVariables = Exact<{
  options: UserRegisterInput;
  image: Scalars['Upload'];
}>;

export type RegisterMutation = {
  __typename?: 'Mutation';
  register: {
    __typename?: 'UserResponse';
    errors?: Maybe<
      Array<{ __typename?: 'FieldError'; field: string; message: string }>
    >;
    user?: Maybe<{
      __typename?: 'User';
      id: number;
      email: string;
      fullName: string;
      firstName: string;
      lastName: string;
      image: string;
    }>;
  };
};

export type UpdatePropertyMutationVariables = Exact<{
  options: PropertyInput;
  id: Scalars['Int'];
  image: Scalars['Upload'];
}>;

export type UpdatePropertyMutation = {
  __typename?: 'Mutation';
  updateProperty?: Maybe<{
    __typename?: 'Property';
    id: number;
    title: string;
    beds: number;
    baths: number;
    bedrooms: number;
    propertyType: string;
    description: string;
    address: string;
    amenities: Array<string>;
    createdAt: string;
    updatedAt: string;
    creator: {
      __typename?: 'User';
      id: number;
      email: string;
      fullName: string;
      image: string;
      createdAt: string;
      updatedAt: string;
    };
  }>;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = {
  __typename?: 'Query';
  me?: Maybe<{
    __typename?: 'User';
    id: number;
    email: string;
    fullName: string;
    firstName: string;
    lastName: string;
    image: string;
  }>;
};

export type PropertiesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;

export type PropertiesQuery = {
  __typename?: 'Query';
  properties: {
    __typename?: 'PaginatedProperties';
    hasMore: boolean;
    properties: Array<{
      __typename?: 'Property';
      id: number;
      title: string;
      propertyType: string;
      image: string;
      description: string;
      beds: number;
      baths: number;
      bedrooms: number;
      pricePerNight: number;
      address: string;
      amenities: Array<string>;
      createdAt: string;
      updatedAt: string;
      creator: {
        __typename?: 'User';
        id: number;
        email: string;
        image: string;
        fullName: string;
      };
    }>;
  };
};

export type PropertyQueryVariables = Exact<{
  id: Scalars['Int'];
}>;

export type PropertyQuery = {
  __typename?: 'Query';
  property: {
    __typename?: 'Property';
    id: number;
    title: string;
    propertyType: string;
    image: string;
    description: string;
    pricePerNight: number;
    address: string;
    beds: number;
    baths: number;
    bedrooms: number;
    amenities: Array<string>;
    createdAt: string;
    updatedAt: string;
    creator: {
      __typename?: 'User';
      id: number;
      email: string;
      image: string;
      fullName: string;
    };
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
    image
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
  mutation CreateProperty($options: PropertyInput!, $image: Upload!) {
    createProperty(options: $options, image: $image) {
      errors {
        field
        message
      }
      property {
        id
        image
        title
        propertyType
        description
        pricePerNight
        address
        amenities
        baths
        beds
        bedrooms
        createdAt
        updatedAt
        creator {
          id
          email
          image
          fullName
        }
      }
    }
  }
`;

export function useCreatePropertyMutation() {
  return Urql.useMutation<
    CreatePropertyMutation,
    CreatePropertyMutationVariables
  >(CreatePropertyDocument);
}
export const DeletePropertyDocument = gql`
  mutation DeleteProperty($id: Int!) {
    deleteProperty(id: $id)
  }
`;

export function useDeletePropertyMutation() {
  return Urql.useMutation<
    DeletePropertyMutation,
    DeletePropertyMutationVariables
  >(DeletePropertyDocument);
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
  mutation Register($options: UserRegisterInput!, $image: Upload!) {
    register(options: $options, image: $image) {
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
export const UpdatePropertyDocument = gql`
  mutation UpdateProperty(
    $options: PropertyInput!
    $id: Int!
    $image: Upload!
  ) {
    updateProperty(options: $options, id: $id, image: $image) {
      id
      title
      creator {
        id
        email
        fullName
        image
        createdAt
        updatedAt
      }
      beds
      baths
      bedrooms
      propertyType
      description
      propertyType
      address
      amenities
      createdAt
      updatedAt
    }
  }
`;

export function useUpdatePropertyMutation() {
  return Urql.useMutation<
    UpdatePropertyMutation,
    UpdatePropertyMutationVariables
  >(UpdatePropertyDocument);
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
  query Properties($limit: Int!, $cursor: String) {
    properties(limit: $limit, cursor: $cursor) {
      hasMore
      properties {
        id
        title
        propertyType
        image
        description
        beds
        baths
        bedrooms
        pricePerNight
        address
        amenities
        createdAt
        updatedAt
        creator {
          id
          email
          image
          fullName
        }
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
      image
      description
      pricePerNight
      address
      beds
      baths
      bedrooms
      amenities
      createdAt
      updatedAt
      creator {
        id
        email
        image
        fullName
      }
    }
  }
`;

export function usePropertyQuery(
  options: Omit<Urql.UseQueryArgs<PropertyQueryVariables>, 'query'> = {}
) {
  return Urql.useQuery<PropertyQuery>({ query: PropertyDocument, ...options });
}
