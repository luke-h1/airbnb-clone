import UploadImage from '@src/components/UploadImage';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { withUrqlClient } from 'next-urql';
import React from 'react';

interface imageProps {}

const image: React.FC<imageProps> = () => {
  return <UploadImage />;
};
export default withUrqlClient(createUrqlClient, { ssr: false })(image);
