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
};

export type BoundsInput = {
  sw: CoordiantesInput;
  ne: CoordiantesInput;
};

export type CoordiantesInput = {
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
};

export type ImageSignature = {
  __typename?: 'ImageSignature';
  signature: Scalars['String'];
  timestamp: Scalars['Int'];
};

export type Listing = {
  __typename?: 'Listing';
  id: Scalars['ID'];
  userId: Scalars['String'];
  latitude: Scalars['Float'];
  longitude: Scalars['Float'];
  propertyType: Scalars['String'];
  address: Scalars['String'];
  image: Scalars['String'];
  publicId: Scalars['String'];
  bedrooms: Scalars['Int'];
  nearby: Array<Listing>;
};

export type ListingInput = {
  address: Scalars['String'];
  image: Scalars['String'];
  coordinates: CoordiantesInput;
  propertyType: Scalars['String'];
  bedrooms: Scalars['Int'];
};

export type Mutation = {
  __typename?: 'Mutation';
  createImageSignature: ImageSignature;
  createListing?: Maybe<Listing>;
  updateListing?: Maybe<Listing>;
  deleteListing: Scalars['Boolean'];
};

export type MutationCreateListingArgs = {
  input: ListingInput;
};

export type MutationUpdateListingArgs = {
  input: ListingInput;
  id: Scalars['String'];
};

export type MutationDeleteListingArgs = {
  id: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  listing?: Maybe<Listing>;
  listings: Array<Listing>;
};

export type QueryListingArgs = {
  id: Scalars['String'];
};

export type QueryListingsArgs = {
  bounds: BoundsInput;
};

export type CreateListingMutationVariables = Exact<{
  input: ListingInput;
}>;

export type CreateListingMutation = {
  __typename?: 'Mutation';
  createListing?: Maybe<{ __typename?: 'Listing'; id: string }>;
};

export type DeleteListingMutationVariables = Exact<{
  id: Scalars['String'];
}>;

export type DeleteListingMutation = {
  __typename?: 'Mutation';
  deleteListing: boolean;
};

export type UpdateListingMutationVariables = Exact<{
  id: Scalars['String'];
  input: ListingInput;
}>;

export type UpdateListingMutation = {
  __typename?: 'Mutation';
  updateListing?: Maybe<{
    __typename?: 'Listing';
    id: string;
    image: string;
    publicId: string;
    latitude: number;
    propertyType: string;
    longitude: number;
    bedrooms: number;
    address: string;
  }>;
};

export type ListingQueryVariables = Exact<{
  id: Scalars['String'];
}>;

export type ListingQuery = {
  __typename?: 'Query';
  listing?: Maybe<{
    __typename?: 'Listing';
    id: string;
    userId: string;
    address: string;
    publicId: string;
    bedrooms: number;
    propertyType: string;
    latitude: number;
    longitude: number;
    nearby: Array<{
      __typename?: 'Listing';
      id: string;
      latitude: number;
      longitude: number;
    }>;
  }>;
};

export type ListingsQueryVariables = Exact<{
  bounds: BoundsInput;
}>;

export type ListingsQuery = {
  __typename?: 'Query';
  listings: Array<{
    __typename?: 'Listing';
    id: string;
    latitude: number;
    longitude: number;
    address: string;
    propertyType: string;
    publicId: string;
    bedrooms: number;
  }>;
};

export const CreateListingDocument = gql`
  mutation CreateListing($input: ListingInput!) {
    createListing(input: $input) {
      id
    }
  }
`;
export type CreateListingMutationFn = Apollo.MutationFunction<
  CreateListingMutation,
  CreateListingMutationVariables
>;

/**
 * __useCreateListingMutation__
 *
 * To run a mutation, you first call `useCreateListingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateListingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createListingMutation, { data, loading, error }] = useCreateListingMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useCreateListingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    CreateListingMutation,
    CreateListingMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    CreateListingMutation,
    CreateListingMutationVariables
  >(CreateListingDocument, options);
}
export type CreateListingMutationHookResult = ReturnType<
  typeof useCreateListingMutation
>;
export type CreateListingMutationResult = Apollo.MutationResult<
  CreateListingMutation
>;
export type CreateListingMutationOptions = Apollo.BaseMutationOptions<
  CreateListingMutation,
  CreateListingMutationVariables
>;
export const DeleteListingDocument = gql`
  mutation DeleteListing($id: String!) {
    deleteListing(id: $id)
  }
`;
export type DeleteListingMutationFn = Apollo.MutationFunction<
  DeleteListingMutation,
  DeleteListingMutationVariables
>;

/**
 * __useDeleteListingMutation__
 *
 * To run a mutation, you first call `useDeleteListingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteListingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteListingMutation, { data, loading, error }] = useDeleteListingMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteListingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    DeleteListingMutation,
    DeleteListingMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    DeleteListingMutation,
    DeleteListingMutationVariables
  >(DeleteListingDocument, options);
}
export type DeleteListingMutationHookResult = ReturnType<
  typeof useDeleteListingMutation
>;
export type DeleteListingMutationResult = Apollo.MutationResult<
  DeleteListingMutation
>;
export type DeleteListingMutationOptions = Apollo.BaseMutationOptions<
  DeleteListingMutation,
  DeleteListingMutationVariables
>;
export const UpdateListingDocument = gql`
  mutation UpdateListing($id: String!, $input: ListingInput!) {
    updateListing(id: $id, input: $input) {
      id
      image
      publicId
      latitude
      propertyType
      longitude
      bedrooms
      address
    }
  }
`;
export type UpdateListingMutationFn = Apollo.MutationFunction<
  UpdateListingMutation,
  UpdateListingMutationVariables
>;

/**
 * __useUpdateListingMutation__
 *
 * To run a mutation, you first call `useUpdateListingMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateListingMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateListingMutation, { data, loading, error }] = useUpdateListingMutation({
 *   variables: {
 *      id: // value for 'id'
 *      input: // value for 'input'
 *   },
 * });
 */
export function useUpdateListingMutation(
  baseOptions?: Apollo.MutationHookOptions<
    UpdateListingMutation,
    UpdateListingMutationVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useMutation<
    UpdateListingMutation,
    UpdateListingMutationVariables
  >(UpdateListingDocument, options);
}
export type UpdateListingMutationHookResult = ReturnType<
  typeof useUpdateListingMutation
>;
export type UpdateListingMutationResult = Apollo.MutationResult<
  UpdateListingMutation
>;
export type UpdateListingMutationOptions = Apollo.BaseMutationOptions<
  UpdateListingMutation,
  UpdateListingMutationVariables
>;
export const ListingDocument = gql`
  query Listing($id: String!) {
    listing(id: $id) {
      id
      userId
      address
      publicId
      bedrooms
      propertyType
      latitude
      longitude
      nearby {
        id
        latitude
        longitude
      }
    }
  }
`;

/**
 * __useListingQuery__
 *
 * To run a query within a React component, call `useListingQuery` and pass it any options that fit your needs.
 * When your component renders, `useListingQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListingQuery({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useListingQuery(
  baseOptions: Apollo.QueryHookOptions<ListingQuery, ListingQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ListingQuery, ListingQueryVariables>(
    ListingDocument,
    options
  );
}
export function useListingLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<ListingQuery, ListingQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ListingQuery, ListingQueryVariables>(
    ListingDocument,
    options
  );
}
export type ListingQueryHookResult = ReturnType<typeof useListingQuery>;
export type ListingLazyQueryHookResult = ReturnType<typeof useListingLazyQuery>;
export type ListingQueryResult = Apollo.QueryResult<
  ListingQuery,
  ListingQueryVariables
>;
export const ListingsDocument = gql`
  query Listings($bounds: BoundsInput!) {
    listings(bounds: $bounds) {
      id
      latitude
      longitude
      address
      propertyType
      publicId
      bedrooms
    }
  }
`;

/**
 * __useListingsQuery__
 *
 * To run a query within a React component, call `useListingsQuery` and pass it any options that fit your needs.
 * When your component renders, `useListingsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useListingsQuery({
 *   variables: {
 *      bounds: // value for 'bounds'
 *   },
 * });
 */
export function useListingsQuery(
  baseOptions: Apollo.QueryHookOptions<ListingsQuery, ListingsQueryVariables>
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useQuery<ListingsQuery, ListingsQueryVariables>(
    ListingsDocument,
    options
  );
}
export function useListingsLazyQuery(
  baseOptions?: Apollo.LazyQueryHookOptions<
    ListingsQuery,
    ListingsQueryVariables
  >
) {
  const options = { ...defaultOptions, ...baseOptions };
  return Apollo.useLazyQuery<ListingsQuery, ListingsQueryVariables>(
    ListingsDocument,
    options
  );
}
export type ListingsQueryHookResult = ReturnType<typeof useListingsQuery>;
export type ListingsLazyQueryHookResult = ReturnType<
  typeof useListingsLazyQuery
>;
export type ListingsQueryResult = Apollo.QueryResult<
  ListingsQuery,
  ListingsQueryVariables
>;
