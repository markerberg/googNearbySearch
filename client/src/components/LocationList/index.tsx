import React from 'react';

const LocationList = ({list, zeroResults}: ListProps) => {
  return (
    <ul className="location-list">
      {zeroResults && <h4>No Results Found</h4>}
      {list.length > 0 && list.map((item) => (
        <li key={item.place_id} className="location-result">
          <span className='location-detail'>
            <span>{item.name}</span>
            <span>{JSON.stringify(item.geometry.location)}</span>
          </span>
          <span>
            Rating - {item.rating ? item.rating : 'None yet'}
          </span>
        </li>
      ))}
    </ul>
  );
}

interface Geometry {
  location: string
}

interface List {
  place_id: number,
  name: string
  rating: number
  geometry: Geometry
}

interface ListProps {
  list: List[];
  zeroResults: boolean
}

export default LocationList;
