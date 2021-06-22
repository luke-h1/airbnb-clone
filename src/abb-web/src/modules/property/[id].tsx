import React from 'react';
import { createUrqlClient } from '@src/utils/createUrqlClient';
import { useGetPropertyFromUrl } from '@src/utils/useGetPropertyFromUrl';
import { withUrqlClient } from 'next-urql';

import Container from '@src/components/Container';
import styled from '@emotion/styled';
import { Flex } from '@src/components/Flex';
import { baseColors } from '@src/styles/Variables';

const SinglePropertyStyles = styled.div`
  img {
    height: 600px;
    width: 900px;
  }
  .title {
    font-size: 35px;
    margin-bottom: 1rem;
    color: ${baseColors.greyTextDark};
  }
  .reviews {
    margin-bottom: 0.2rem;
    display: flex;

    p {
      color: ${baseColors.greyTextLight};
      margin-bottom: 0.5rem;
    }
    .location {
      margin-left: 1rem;
    }

    .information {
      text-align: left;
      margin-bottom: 4rem;
    }
  }
  .hr {
    margin-bottom: 4rem;
  }
`;

const OfferTitle = styled.h2`
  text-align: left;
  margin-top: 2rem;
  margin-bottom: 3rem;
  font-size: 25px;
`;

const UnorderedList = styled.ul`
  text-align: left;
  line-height: 1.6;
  margin-bottom: 10px;
`;

const ListItem = styled.li`
  font-size: 22px;
  color: ${baseColors.greyTextLight};
`;

const Reviews = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  place-items: center;
  margin-bottom: 4rem;
`;

const MapSection = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  place-items: center;
`;

const SingleProperty: React.FC<{}> = () => {
  const [{ data, error, fetching }] = useGetPropertyFromUrl();
  if (fetching) {
    return <p>loading..</p>;
  }
  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data?.property) {
    return <p>no property found with that id </p>;
  }

  return (
    <Container>
      <Flex>
        <SinglePropertyStyles>
          <h1 className="title">{data.property.title}</h1>
          <span className="reviews">
            <p>Reviews here</p>
            <p className="location">location</p>
          </span>
          <img src={data.property.mainImage} alt="" />
          <div className="information">
            <h1>
              Full {data.property.propertyType} hosted by{' '}
              {data.property.propertyCreator.firstName}
            </h1>
            {/* profile image here */}
          </div>

          <hr />
          <OfferTitle>What this place offers</OfferTitle>
          <UnorderedList>
            {data.property.amenities
              && data.property.amenities.map((a) => <ListItem>{a}</ListItem>)}
          </UnorderedList>
          <hr className="hr" />
        </SinglePropertyStyles>
        <Reviews>reviews go here</Reviews>
        <MapSection>Map goes here</MapSection>
      </Flex>
    </Container>
  );
};
export default withUrqlClient(createUrqlClient, { ssr: false })(SingleProperty);
