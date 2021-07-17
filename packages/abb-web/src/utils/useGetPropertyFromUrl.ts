import { usePropertyQuery } from '@src/generated/graphql';
import { useGetIntId } from './useGetIntId';

export const useGetPropertyFromUrl = () => {
  const intId = useGetIntId();
  return usePropertyQuery({
    skip: intId === -1,
    variables: {
      id: intId,
    },
  });
};
