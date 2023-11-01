import { Link } from "react-router-dom";

function Property({ property }: any) {
  return (
    <li className="p-3 m-3 border-none flex justify-between">
      <Link to={`/${property.id}`}>
        <div className="max-w-sm rounded overflow-hidden shadow-lg">
          {property.hasImage && (
            <img
              className="w-full"
              src={property?.imgSrc}
              alt="Sunset in the mountains"
            />
          )}
          <div className="px-6 py-4">
            <div className="font-bold text-xl mb-2">{property.name}</div>
            <p className="text-gray-700 text-base">{property.address}</p>
            {property.type && 
              <p className="text-gray-700 text-base">
                Type: {property.type}
              </p>
            }
            <div className="font-bold text-xl mb-2">{property.price}</div>
          </div>
          <div className="px-6 py-4">
            {property.beds && (
              <span className="flex w-fit bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
                {property.beds}
                <img src="https://hirondelle-properties.com/assets/bed-rooms-aed6fad5.svg" />
              </span>
            )}
            {property.paths && (
              <span className="flex w-fit bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
                {property.paths}
                <img src="https://hirondelle-properties.com/assets/bath-rooms-afcecd61.svg" />
              </span>
            )}
          </div>
        </div>
      </Link>
    </li>
  );
}

export default Property;
