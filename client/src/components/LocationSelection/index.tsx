const LocationSelection = ({locations, location, locationHandler}: LocationProps) => {
  
  const triggerSelect = (e: any) => {
    locationHandler(e.target.value);
  }

  return (
    <div className="location-selection">
      <h4>Select a Location</h4>
      <form className="locations">
        {locations.map((place, i) => (
          <div key={i} className="location">
            <input
              type="radio"
              name={place.name}
              value={place.coordinates}
              checked={location === place.coordinates} 
              onChange={triggerSelect} />
            {place.name}
          </div>
        ))}
      </form>
    </div>
  );
}

interface Locations {
  name: string,
  coordinates: string
}

interface LocationProps {
  locations: Locations[],
  locationHandler: any,
  location: string
}


export default LocationSelection;