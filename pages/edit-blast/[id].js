import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { GoogleMap, LoadScript, Circle, Marker } from "@react-google-maps/api";
import Button from "../../components/ui/button";
import Input from "../../components/ui/input";

const radiusOptions = [
  { miles: 3, agents: 1000, price: 14.99 },
  { miles: 5, agents: 1500, price: 19.99 },
  { miles: 10, agents: 2500, price: 24.99 },
  { miles: 15, agents: 3500, price: 29.99 },
  { miles: 20, agents: 5000, price: 34.99 },
  { miles: 40, agents: 8000, price: 59.99 },
  { miles: 50, agents: 10000, price: 69.99 },
];

const mapContainerStyle = {
  width: "100%",
  height: "400px",
};

export default function EditBlast() {
  const router = useRouter();
  const { id } = router.query;

  const [center, setCenter] = useState({ lat: 25.7617, lng: -80.1918 }); // Default to Miami, FL
  const [radius, setRadius] = useState(3 * 1609.34); // Default to 3 miles
  const [address, setAddress] = useState("");
  const mapRef = useRef(null);

  useEffect(() => {
    // Fetch blast details based on ID (Mock Example)
    if (id) {
      // Example: Fetch blast details from API
      // setCenter({ lat: fetchedLat, lng: fetchedLng });
    }
  }, [id]);

  const handleRadiusChange = (event) => {
    const selected = radiusOptions.find((r) => r.miles === parseInt(event.target.value));
    if (selected) {
      setRadius(selected.miles * 1609.34);
      if (mapRef.current) {
        mapRef.current.setZoom(getZoomLevel(selected.miles));
      }
    }
  };

  const handleAddressChange = (event) => {
    setAddress(event.target.value);
  };

  const handleSearch = () => {
    // Use Google Maps Geocoding API to find new location
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK" && results[0]) {
        const location = results[0].geometry.location;
        setCenter({ lat: location.lat(), lng: location.lng() });
      }
    });
  };

  const getZoomLevel = (miles) => {
    return Math.max(10 - Math.log2(miles), 5);
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Edit Blast - Target Area Selection</h1>

      {/* Mile Radius Selection */}
      <label className="block font-semibold mb-2">Select Mile Radius:</label>
      <select
        onChange={handleRadiusChange}
        className="border p-2 rounded mb-4 w-full"
      >
        {radiusOptions.map((option) => (
          <option key={option.miles} value={option.miles}>
            {option.miles} Miles (up to {option.agents} agents | ${option.price.toFixed(2)})
          </option>
        ))}
      </select>

      {/* Address Search Bar */}
      <div className="flex mb-4">
        <Input
          type="text"
          placeholder="Enter address or ZIP code"
          value={address}
          onChange={handleAddressChange}
          className="border p-2 rounded w-full"
        />
        <Button onClick={handleSearch} className="ml-2">Search</Button>
      </div>

      {/* Google Map with Circle Overlay */}
      <LoadScript googleMapsApiKey="YOUR_GOOGLE_MAPS_API_KEY">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          center={center}
          zoom={getZoomLevel(radius / 1609.34)}
          onLoad={(map) => (mapRef.current = map)}
        >
          <Marker position={center} draggable onDragEnd={(e) => setCenter({ lat: e.latLng.lat(), lng: e.latLng.lng() })} />
          <Circle center={center} radius={radius} options={{ strokeColor: "#FF0000", fillColor: "#FF000020" }} />
        </GoogleMap>
      </LoadScript>
    </div>
  );
}
