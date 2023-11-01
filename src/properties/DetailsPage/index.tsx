import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchWrapper } from "../../helpers";

const DetailsPage = () => {
  const [data, setData] = useState<any>({});
  const params = useParams();

  const fetchProperty = async () => {
    const response = await fetchWrapper.get(
      `${process.env.REACT_APP_API_URL}/properties?id=${params.id}`
    );
    setData(response);
  };
  useEffect(() => {
    fetchProperty();
  }, []);

  return (
    <div>
      <img
        src={data[0]?.imgSrc}
        style={{
          borderRadius: "10px",
          margin: "1rem 0"
        }}
      />
      <p>#{data[0]?.id}</p>
      {data[0]?.name && (
        <p className="text-gray-700 text-base">Name: {data[0]?.name}</p>
      )}
      {data[0]?.type && (
        <p className="text-gray-700 text-base">Type: {data[0]?.type}</p>
      )}
      <p className="text-gray-700 text-base">Address: {data[0]?.address}</p>
      <p className="text-gray-700 text-base">Lat: {data[0]?.latitude}</p>
      <p className="text-gray-700 text-base">Lang: {data[0]?.longitude}</p>
      <p className="text-gray-700 text-base">Area: {data[0]?.area}</p>
    </div>
  );
};

export default DetailsPage;
