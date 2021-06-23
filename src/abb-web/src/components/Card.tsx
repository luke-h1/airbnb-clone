import React from 'react';
import Link from 'next/link';
import ListingStyles from './CardStyles';

export interface PropertyProps {
  id: number;
  title: string;
  propertyType: string;
  mainImage: string;
  amenities: string[];
  pricePerNight: number;
  creator: { fullName: string };
}

const Card: React.FC<PropertyProps> = ({
  id,
  title,
  propertyType,
  mainImage,
  amenities,
  creator,
  pricePerNight,
}) => {
  console.log(creator);
  return (
    <ListingStyles>
      <Link href={`/property/${id}`}>
        <div className="listings__item" key={id}>
          <div className="listings__image">
            <button type="button">
              <img src="/icons/chevronLeft.svg" alt="left" />
            </button>
            <button type="button">
              <img src="/icons/chevronRight.svg" alt="right" />
            </button>
            <img src={mainImage} alt="" />
          </div>
          <div className="listings__content">
            <div className="listings__title">
              <div className="listings__icon__text">
                <span className="greyText">{propertyType}</span>
                <h2>{title}</h2>
                <h3>
                  Posted by {creator.fullName}
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
              {/* <span className="greyText"> 2 Guests . 1 Bedroom </span>
            <span className="greyText"> Kitchen . Wifi . Heating </span> */}
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
                {/* <div className="listings__price__total">
                  <span>$56 total</span>
                </div> */}
              </div>
            </div>
          </div>
        </div>
      </Link>
    </ListingStyles>
  );
};
export default Card;
