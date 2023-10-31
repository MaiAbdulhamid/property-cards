import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchWrapper } from '../../helpers';

const DetailsPage = () => {
  const [data, setData] = useState<any>({})
  const params = useParams();
  
  const fetchProperty = async () => {
    const response = await fetchWrapper.get(`${process.env.REACT_APP_API_URL}/properties/${params.id}`);
    setData(response)
  }
  useEffect(() => {
    fetchProperty()
  }, []);

  return (
    <div>
      <p>#{data.id}</p>
      <p className="text-gray-700 text-base">Address: {data.address}</p>

    </div>
  )
}

export default DetailsPage