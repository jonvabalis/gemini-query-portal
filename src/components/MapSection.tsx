
import { useState } from "react";
import CoordinatesInput from "./CoordinatesInput";
import MapDisplay from "./MapDisplay";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const MapSection = () => {
  const [coordinates, setCoordinates] = useState({
    latitude: 54.6872, // Default to Vilnius, Lithuania
    longitude: 25.2797,
  });

  const handleCoordinatesSubmit = (latitude: number, longitude: number) => {
    setCoordinates({ latitude, longitude });
  };

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle>Map Coordinates Viewer</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <CoordinatesInput onSubmit={handleCoordinatesSubmit} />
        <MapDisplay 
          latitude={coordinates.latitude} 
          longitude={coordinates.longitude} 
        />
      </CardContent>
    </Card>
  );
};

export default MapSection;
