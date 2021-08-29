import Link from 'next/link';
import { Image } from 'cloudinary-react';
import { ListingsQuery_listings } from 'src/generated/ListingsQuery';

interface IProps {
  listings: ListingsQuery_listings[];
  setHighlightedId: (id: string | null) => void;
}

export default function ListingList({ listings, setHighlightedId }: IProps) {
  return (
    <>
      {listings.map((listing) => (
        <Link key={listing.id} href={`/listings/${listing.id}`}>
          <div
            className="px-6 pt-4 cursor-pointer flex flex-wrap"
            onMouseEnter={() => setHighlightedId(listing.id)}
            onMouseLeave={() => setHighlightedId(null)}
          >
            <div className="sm:w-full md:w-1/2">
              <Image
                cloudName={process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME}
                publicId={listing.publicId}
                alt={listing.address}
                secure
                dpr="auto"
                quality="auto"
                width={350}
                height={Math.floor((9 / 16) * 350)}
                crop="fill"
                gravity="auto"
              />
            </div>
            <div className="sm:w-full md:w-1/2 sm:pl-2 md:pl-4">
              <h2 className="text-lg">{listing.address}</h2>
              <p>
                {listing.bedrooms}
                {' '}
                bedroom listing
              </p>
            </div>
          </div>
        </Link>
      ))}
    </>
  );
}
