
import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from "@react-google-maps/api";
import { Card, CardContent } from "@/components/ui/card";

interface MapDisplayProps {
  latitude: number;
  longitude: number;
}

const containerStyle = {
  width: '100%',
  height: '400px',
  borderRadius: '0.5rem'
};

const defaultCenter = {
  lat: 54.6872,
  lng: 25.2797 // Default to Vilnius, Lithuania
};

const MapDisplay = ({ latitude, longitude }: MapDisplayProps) => {
  const [map, setMap] = useState<google.maps.Map | null>(null);
  
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: ""  // User needs to provide this in the UI
  });

  const onLoad = useCallback(function callback(map: google.maps.Map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback() {
    setMap(null);
  }, []);

  const center = {
    lat: latitude,
    lng: longitude
  };

  return (
    <Card className="w-full overflow-hidden animate-fade-in">
      <CardContent className="p-0">
        {isLoaded ? (
          <GoogleMap
            mapContainerStyle={containerStyle}
            center={center}
            zoom={10}
            onLoad={onLoad}
            onUnmount={onUnmount}
            options={{
              mapTypeControl: true,
              streetViewControl: true,
              fullscreenControl: true,
            }}
          >
            <Marker position={center} />
          </GoogleMap>
        ) : (
          <div className="h-[400px] flex items-center justify-center bg-gray-100">
            <p>Loading map...</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default MapDisplay;
