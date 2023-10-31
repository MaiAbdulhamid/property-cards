import { Link } from "react-router-dom";

function Property({ property } : any) {

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
            <div className="font-bold text-xl mb-2">{property.statusText}</div>
            <p className="text-gray-700 text-base">{property.address}</p>
            <p className="text-gray-700 text-base">Type: {property.statusType}</p>
            <div className="font-bold text-xl mb-2">{property.price}</div>
          </div>
          <div className="px-6 py-4">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2">
              #{property.beds ?? 0} Bed Rooms
            </span>
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              #{property.paths ?? 0} Path Rooms
            </span>
          </div>
        </div>
      </Link>
    </li>
  );
}

export default Property;
