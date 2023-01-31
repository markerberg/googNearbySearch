import React from 'react';

const LocationList = ({list, zeroResults}: ListProps) => {
  return (
    <ul className="location-list">
      {zeroResults && <h4>No Results Found</h4>}
      {list.map((item) => (
        <li key={item.id} className="location-result">
          <span className='location-detail'>
            <span>{item.name}</span>
            {/* <span>{JSON.stringify(item.geometry.location)}</span> */}
            <span>{item.address}</span>
          </span>
          <span>
            Rating - {item.rating ? item.rating : 'None yet'}
          </span>
        </li>
      ))}
    </ul>
  );
}

interface ListResult {
  id: number,
  name: string
  rating: number
  address: string
}

interface ListProps {
  list: ListResult[];
  zeroResults: boolean
}

export default LocationList;
