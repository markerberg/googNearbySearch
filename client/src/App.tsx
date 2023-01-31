import React, { useState, useEffect } from 'react';
import './App.css';
import LocationList from './components/LocationList';
import LocationSelection from './components/LocationSelection';
import SearchBar from './components/SearchBar';

// use hardcoded values for the selection option, this would usually come from an api call
const locations = [
  {"name": "Snowmass, CO", "coordinates": "39.2130, -106.9378"},
  {"name": "Malibu, CA", "coordinates": "34.0259, -118.7798"},
  {"name": "Catskill, NY", "coordinates": "42.2146, -73.9595"},
  {"name": "Grand Teton National Park, WY", "coordinates": "43.7904, -110.6818"},
  {"name": "Columbia River Gorge, OR", "coordinates": "45.7253, -121.7300"}
]

const PUBLIC_API_KEY = 'AIzaSyDIb6tuC5IBX5yf8pYBMs_hLkZicqDHZ9k';

function App() {
  const [userLocation, setUserLocation] = useState('');
  const [userActivity, setUserActivity] = useState('');
  const [userResults, setUserResults] = useState<any>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [noResults, setNoResults] = useState(false);

  const transFormAddresses = (data:any) => {
    let newData: NewItem[] =  [];
    data.forEach(async (item: Item, i: number) => {
      const { lat } = item.geometry.location;
      const { lng } = item.geometry.location;
      const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${PUBLIC_API_KEY}`
      // consider caching this
      const data = await fetch(url);
      const json = await data.json();
      const address = json.results[0].formatted_address;
      
      newData.push({
        "address": address,
        "name": item.name,
        "id": item.place_id,
        "rating": item.rating
      })
    });
    return newData;
  }


  const fetchData = async (location: string, activity: string): Promise<any> => {
    setIsLoading(true);
    const response = await fetch(`api/${location}/${activity}`);
    let json = await response.json();
    if(JSON.parse(json).status === "ZERO_RESULTS") {
      setNoResults(true);
    } else {
      setNoResults(false);
    }
    return JSON.parse(json).results;
  }

  useEffect(() => {
    if(userLocation && userActivity) {
      fetchData(userLocation, userActivity)
        .then(data => transFormAddresses(data))
        .then(res => {
          setIsLoading(false);
          setUserLocation('')
          setUserActivity('')
          setUserResults(res);
        });
    }
  }, [userLocation, userActivity, userResults])
  
  const captureLocation = (locationVal: string) => {
    setUserLocation(locationVal);
  }

  const captureSearchInput = (searchVal: string) => {
    setUserActivity(searchVal)
  }

  return (
    <div className="App">
      <div className="input-form">
        <LocationSelection locations={locations} location={userLocation} locationHandler={captureLocation}/>
        <SearchBar searchHandler={captureSearchInput}/>
      </div>
      <div className="input-results">
        {isLoading && <p>Loading...</p>}
        {userResults && <LocationList zeroResults={noResults} list={userResults} />}
      </div>
    </div>
  );
}

interface Location {
  lat: number,
  lng: number
}

interface Geometry {
  location: Location
}

interface Item {
  place_id: number,
  name: string,
  rating: number,
  geometry: Geometry
}

interface NewItem {
  address: number,
  name: string,
  rating: number,
  id: number
}

export default App;
