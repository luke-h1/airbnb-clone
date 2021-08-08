/* eslint-disable no-underscore-dangle */
import React from 'react';
import { Link } from 'react-router-dom';
import { Property } from 'src/types/Property';
import Rating from './Rating';

interface PropertyCardProps {
  property: Property;
}

const PropertyCard: React.FC<PropertyCardProps> = ({ property }) => {
  return (
    <Link to={`/property/${property._id}`}>
      <a>
        <div className="rounded overflow-hidden shadow-lg mb-4">
          <img className="w-full" src={property.image} alt={property.name} />
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{property.name}</div>
            <p className="text-gray-700 text-base">{property.description}</p>
          </div>
          <div className="px-6 pt-4 pb-2">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">
              #
            </span>
            <Rating
              value={property.rating}
              text={`${property.numReviews} reviews`}
            />
            {/* <EditDeleteButtons id={p.id} creatorId={p.creator.id} /> */}
          </div>
        </div>
        <div />
      </a>
    </Link>
  );
};
export default PropertyCard;
