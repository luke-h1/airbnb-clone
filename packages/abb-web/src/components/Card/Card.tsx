import React from 'react';
import Link from 'next/link';
import { ListingStyles } from './CardStyles';
import EditDeleteButtons from '../EditDeleteButtons';

export interface PropertyProps {
  id: number;
  title: string;
  propertyType: string;
  image: string;
  amenities: string[];
  pricePerNight: number;
  owner: { fullName: string };
  ownerId: number;
}

const Card: React.FC<PropertyProps> = ({
  id,
  title,
  propertyType,
  image,
  amenities,
  owner,
  pricePerNight,
  ownerId,
}) => {
  return (
    <ListingStyles>
      <div className="listings__item" key={id}>
        <Link href={`/property/${id}`}>
          <div className="listings__image">
            <img src={image} alt={title} />
          </div>
        </Link>
        <div className="listings__content">
          <div className="listings__title">
            <div className="listings__icon__text">
              <span className="greyText">
                Property Type: <br />
                {propertyType}
              </span>
              <h2>{title}</h2>
              <h3>
                Posted by <br />
                {owner.fullName}
              </h3>
            </div>
            <div className="listings__title__icon">
              <button type="button">
                <img src="/icons/heart.svg" alt="Heart" />
              </button>
            </div>
          </div>

          <div className="seperator" />
          <div className="listings__description">
            {amenities
              && amenities.map((a) => <span className="greyText">{a}</span>)}
          </div>
          <div className="listings__details">
            {/* <div className="listings__rating">
              <img src="/icons/star.svg" alt="Star" />
              <span>
                5 <span>(14)</span>
              </span>
            </div> */}
            <div className="listings__price">
              <div className="listings__price__night">
                £{pricePerNight}
                <span>/ night</span>
              </div>

              <EditDeleteButtons id={id} ownerId={ownerId} />
            </div>
          </div>
        </div>
      </div>
    </ListingStyles>
  );
};
export default Card;
