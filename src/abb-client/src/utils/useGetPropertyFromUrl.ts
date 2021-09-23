import { usePropertyQuery } from '@src/generated/graphql';
import { useGetIntId } from './useGetIntId';

export const useGetPropertyFromUrl = () => {
  const intId = useGetIntId();
  return usePropertyQuery({
    pause: intId === -1,
    variables: {
      id: intId,
    },
  });
};
