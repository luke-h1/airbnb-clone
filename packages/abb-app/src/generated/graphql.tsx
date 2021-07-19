import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = {
  [K in keyof T]: T[K];
};
export type MakeOptional<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> &
  { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {};
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

export type CreatePropertyInput = {
  title: Scalars['String'];
  propertyType: Scalars['String'];
  description: Scalars['String'];
  pricePerNight: Scalars['Int'];
  address: Scalars['String'];
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
  image: Scalars['Upload'];
  options: CreatePropertyInput;
};

export type MutationUpdatePropertyArgs = {
  image: Scalars['Upload'];
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
  image: Scalars['Upload'];
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
  image: Scalars['String'];
  description: Scalars['String'];
  pricePerNight: Scalars['Int'];
  address: Scalars['String'];
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
  propertyId: Scalars['Int'];
  property: Property;
  creator: User;
  title: Scalars['String'];
  body: Scalars['String'];
};

export type UpdatePropertyInput = {
  title: Scalars['String'];
  propertyType: Scalars['String'];
  description: Scalars['String'];
  pricePerNight: Scalars['Int'];
  address: Scalars['String'];
  amenities: Array<Scalars['String']>;
};

export type User = {
  __typename?: 'User';
  id: Scalars['Int'];
  email: Scalars['String'];
  firstName: Scalars['String'];
  image?: Maybe<Scalars['String']>;
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
  'id' | 'email' | 'fullName' | 'firstName' | 'lastName' | 'image'
>;

export type RegularUserResponseFragment = { __typename?: 'UserResponse' } & {
  errors?: Maybe<Array<{ __typename?: 'FieldError' } & RegularErrorFragment>>;
  user?: Maybe<{ __typename?: 'User' } & RegularUserFragment>;
};

export type CreatePropertyMutationVariables = Exact<{
  options: CreatePropertyInput;
  image: Scalars['Upload'];
}>;

export type CreatePropertyMutation = { __typename?: 'Mutation' } & {
  createProperty: { __typename?: 'PropertyResponse' } & {
    errors?: Maybe<
      Array<
        { __typename?: 'PropertyFieldError' } & Pick<
          PropertyFieldError,
          'field' | 'message'
        >
      >
    >;
    property?: Maybe<
      { __typename?: 'Property' } & Pick<
        Property,
        | 'id'
        | 'image'
        | 'title'
        | 'propertyType'
        | 'description'
        | 'pricePerNight'
        | 'address'
        | 'amenities'
        | 'createdAt'
        | 'updatedAt'
      > & {
          creator: { __typename?: 'User' } & Pick<
            User,
            'id' | 'email' | 'image' | 'fullName'
          >;
          reviews?: Maybe<
            Array<
              { __typename?: 'Review' } & Pick<
                Review,
                'id' | 'title' | 'body'
              > & {
                  creator: { __typename?: 'User' } & Pick<
                    User,
                    'id' | 'email' | 'fullName'
                  >;
                }
            >
          >;
        }
    >;
  };
};

export type DeletePropertyMutationVariables = Exact<{
  id: Scalars['Int'];
}>;

export type DeletePropertyMutation = { __typename?: 'Mutation' } & Pick<
  Mutation,
  'deleteProperty'
>;

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
  image: Scalars['Upload'];
}>;

export type RegisterMutation = { __typename?: 'Mutation' } & {
  register: { __typename?: 'UserResponse' } & RegularUserResponseFragment;
};

export type UpdatePropertyMutationVariables = Exact<{
  options: UpdatePropertyInput;
  id: Scalars['Int'];
  image: Scalars['Upload'];
}>;

export type UpdatePropertyMutation = { __typename?: 'Mutation' } & {
  updateProperty?: Maybe<
    { __typename?: 'Property' } & Pick<
      Property,
      | 'id'
      | 'title'
      | 'propertyType'
      | 'description'
      | 'address'
      | 'amenities'
      | 'createdAt'
      | 'updatedAt'
    > & {
        creator: { __typename?: 'User' } & Pick<
          User,
          'id' | 'email' | 'fullName' | 'image' | 'createdAt' | 'updatedAt'
        >;
        reviews?: Maybe<
          Array<
            { __typename?: 'Review' } & Pick<
              Review,
              'id' | 'title' | 'body'
            > & {
                creator: { __typename?: 'User' } & Pick<
                  User,
                  'id' | 'email' | 'fullName'
                >;
              }
          >
        >;
      }
  >;
};

export type MeQueryVariables = Exact<{ [key: string]: never }>;

export type MeQuery = { __typename?: 'Query' } & {
  me?: Maybe<{ __typename?: 'User' } & RegularUserFragment>;
};

export type PropertiesQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;

export type PropertiesQuery = { __typename?: 'Query' } & {
  properties: { __typename?: 'PaginatedProperties' } & Pick<
    PaginatedProperties,
    'hasMore'
  > & {
      properties: Array<
        { __typename?: 'Property' } & Pick<
          Property,
          | 'id'
          | 'title'
          | 'propertyType'
          | 'image'
          | 'description'
          | 'pricePerNight'
          | 'address'
          | 'amenities'
          | 'createdAt'
          | 'updatedAt'
        > & {
            creator: { __typename?: 'User' } & Pick<
              User,
              'id' | 'email' | 'image' | 'fullName'
            >;
            reviews?: Maybe<
              Array<
                { __typename?: 'Review' } & Pick<
                  Review,
                  'id' | 'title' | 'body'
                > & {
                    creator: { __typename?: 'User' } & Pick<
                      User,
                      'id' | 'email' | 'fullName'
                    >;
                  }
              >
            >;
          }
      >;
    };
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
    | 'image'
    | 'description'
    | 'pricePerNight'
    | 'address'
    | 'amenities'
    | 'createdAt'
    | 'updatedAt'
  > & {
      creator: { __typename?: 'User' } & Pick<
        User,
        'id' | 'email' | 'image' | 'fullName'
      >;
      reviews?: Maybe<
        Array<
          { __typename?: 'Review' } & Pick<Review, 'id' | 'title' | 'body'> & {
              creator: { __typename?: 'User' } & Pick<
                User,
                'id' | 'email' | 'fullName'
              >;
            }
        >
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
  mutation CreateProperty($options: CreatePropertyInput!, $image: Upload!) {
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
        createdAt
        updatedAt
        creator {
          id
          email
          image
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
export type CreatePropertyMutationFn = Apollo.MutationFunction<
  CreatePropertyMutation,
  CreatePropertyMutationVariables
>;

/**
 * __useCreatePropertyMutation__
 *
 * To run a mutation, you first call `useCreatePropertyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreatePropertyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createPropertyMutation, { data, loading, error }] = useCreatePropertyMutation({
 *   variables: {
 *      options: // value for 'options'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useCreatePropertyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreatePropertyMutation,
    CreatePropertyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreatePropertyMutation,
    CreatePropertyMutationVariables
  >(CreatePropertyDocument, options);
}
export type CreatePropertyMutationHookResult = ReturnType<
  typeof useCreatePropertyMutation
>;
export type CreatePropertyMutationResult =
  Apollo.MutationResult<CreatePropertyMutation>;
export type CreatePropertyMutationOptions = Apollo.BaseMutationOptions<
  CreatePropertyMutation,
  CreatePropertyMutationVariables
>;
export const DeletePropertyDocument = gql`
  mutation DeleteProperty($id: Int!) {
    deleteProperty(id: $id)
  }
`;
export type DeletePropertyMutationFn = Apollo.MutationFunction<
  DeletePropertyMutation,
  DeletePropertyMutationVariables
>;

/**
 * __useDeletePropertyMutation__
 *
 * To run a mutation, you first call `useDeletePropertyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeletePropertyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deletePropertyMutation, { data, loading, error }] = useDeletePropertyMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeletePropertyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeletePropertyMutation,
    DeletePropertyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeletePropertyMutation,
    DeletePropertyMutationVariables
  >(DeletePropertyDocument, options);
}
export type DeletePropertyMutationHookResult = ReturnType<
  typeof useDeletePropertyMutation
>;
export type DeletePropertyMutationResult =
  Apollo.MutationResult<DeletePropertyMutation>;
export type DeletePropertyMutationOptions = Apollo.BaseMutationOptions<
  DeletePropertyMutation,
  DeletePropertyMutationVariables
>;
export const LoginDocument = gql`
  mutation Login($options: UsernamePasswordInput!) {
    login(options: $options) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
export type LoginMutationFn = Apollo.MutationFunction<
  LoginMutation,
  LoginMutationVariables
>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      options: // value for 'options'
 *   },
 * });
 */
export function useLoginMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LoginMutation,
    LoginMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LoginMutation, LoginMutationVariables>(
    LoginDocument,
    options,
  );
}
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<
  LoginMutation,
  LoginMutationVariables
>;
export const LogoutDocument = gql`
  mutation Logout {
    logout
  }
`;
export type LogoutMutationFn = Apollo.MutationFunction<
  LogoutMutation,
  LogoutMutationVariables
>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(
  baseOptions?: Apollo.MutationHookOptions<
    LogoutMutation,
    LogoutMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(
    LogoutDocument,
    options,
  );
}
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<
  LogoutMutation,
  LogoutMutationVariables
>;
export const RegisterDocument = gql`
  mutation Register($options: UserRegisterInput!, $image: Upload!) {
    register(options: $options, image: $image) {
      ...RegularUserResponse
    }
  }
  ${RegularUserResponseFragmentDoc}
`;
export type RegisterMutationFn = Apollo.MutationFunction<
  RegisterMutation,
  RegisterMutationVariables
>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      options: // value for 'options'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useRegisterMutation(
  baseOptions?: Apollo.MutationHookOptions<
    RegisterMutation,
    RegisterMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(
    RegisterDocument,
    options,
  );
}
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<
  RegisterMutation,
  RegisterMutationVariables
>;
export const UpdatePropertyDocument = gql`
  mutation UpdateProperty(
    $options: UpdatePropertyInput!
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
      propertyType
      description
      propertyType
      address
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
export type UpdatePropertyMutationFn = Apollo.MutationFunction<
  UpdatePropertyMutation,
  UpdatePropertyMutationVariables
>;

/**
 * __useUpdatePropertyMutation__
 *
 * To run a mutation, you first call `useUpdatePropertyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdatePropertyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updatePropertyMutation, { data, loading, error }] = useUpdatePropertyMutation({
 *   variables: {
 *      options: // value for 'options'
 *      id: // value for 'id'
 *      image: // value for 'image'
 *   },
 * });
 */
export function useUpdatePropertyMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdatePropertyMutation,
    UpdatePropertyMutationVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdatePropertyMutation,
    UpdatePropertyMutationVariables
  >(UpdatePropertyDocument, options);
}
export type UpdatePropertyMutationHookResult = ReturnType<
  typeof useUpdatePropertyMutation
>;
export type UpdatePropertyMutationResult =
  Apollo.MutationResult<UpdatePropertyMutation>;
export type UpdatePropertyMutationOptions = Apollo.BaseMutationOptions<
  UpdatePropertyMutation,
  UpdatePropertyMutationVariables
>;
export const MeDocument = gql`
  query Me {
    me {
      ...RegularUser
    }
  }
  ${RegularUserFragmentDoc}
`;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(
  baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export function useMeLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, options);
}
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
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

/**
 * __usePropertiesQuery__
 *
 * To run a query within a React component, call `usePropertiesQuery` and pass it any options that fit your needs.
 * When your component renders, `usePropertiesQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePropertiesQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function usePropertiesQuery(
  baseOptions: Apollo.QueryHookOptions<
    PropertiesQuery,
    PropertiesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PropertiesQuery, PropertiesQueryVariables>(
    PropertiesDocument,
    options,
  );
}
export function usePropertiesLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PropertiesQuery,
    PropertiesQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PropertiesQuery, PropertiesQueryVariables>(
    PropertiesDocument,
    options,
  );
}
export type PropertiesQueryHookResult = ReturnType<typeof usePropertiesQuery>;
export type PropertiesLazyQueryHookResult = ReturnType<
  typeof usePropertiesLazyQuery
>;
export type PropertiesQueryResult = Apollo.QueryResult<
  PropertiesQuery,
  PropertiesQueryVariables
>;
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
      amenities
      createdAt
      updatedAt
      creator {
        id
        email
        image
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

/**
 * __usePropertyQuery__
 *
 * To run a query within a React component, call `usePropertyQuery` and pass it any options that fit your needs.
 * When your component renders, `usePropertyQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = usePropertyQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function usePropertyQuery(
  baseOptions: Apollo.QueryHookOptions<PropertyQuery, PropertyQueryVariables>,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<PropertyQuery, PropertyQueryVariables>(
    PropertyDocument,
    options,
  );
}
export function usePropertyLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    PropertyQuery,
    PropertyQueryVariables
  >,
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<PropertyQuery, PropertyQueryVariables>(
    PropertyDocument,
    options,
  );
}
export type PropertyQueryHookResult = ReturnType<typeof usePropertyQuery>;
export type PropertyLazyQueryHookResult = ReturnType<
  typeof usePropertyLazyQuery
>;
export type PropertyQueryResult = Apollo.QueryResult<
  PropertyQuery,
  PropertyQueryVariables
>;
