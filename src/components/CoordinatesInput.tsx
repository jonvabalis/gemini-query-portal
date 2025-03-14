
import { useState } from "react";
import { Button } from "@/components/ui-custom/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";

interface CoordinatesInputProps {
  onSubmit: (latitude: number, longitude: number) => void;
}

const CoordinatesInput = ({ onSubmit }: CoordinatesInputProps) => {
  const [latitude, setLatitude] = useState("0");
  const [longitude, setLongitude] = useState("0");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const lat = parseFloat(latitude);
    const lng = parseFloat(longitude);
    
    if (isNaN(lat) || isNaN(lng)) {
      toast.error("Please enter valid coordinates");
      return;
    }
    
    if (lat < -90 || lat > 90) {
      toast.error("Latitude must be between -90 and 90");
      return;
    }
    
    if (lng < -180 || lng > 180) {
      toast.error("Longitude must be between -180 and 180");
      return;
    }
    
    onSubmit(lat, lng);
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="text"
                placeholder="e.g. 54.6872"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="text"
                placeholder="e.g. 25.2797"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
              />
            </div>
          </div>
          <Button 
            type="submit" 
            className="w-full"
          >
            Show on Map
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default CoordinatesInput;
