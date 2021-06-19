import { useRouter } from 'next/router';

export const useGetIntId = () => {
  const router = useRouter();
  // eslint-disable-next-line radix
  const intId =
    typeof router.query.id === 'string' ? parseInt(router.query.id) : -1;

  return intId;
};
