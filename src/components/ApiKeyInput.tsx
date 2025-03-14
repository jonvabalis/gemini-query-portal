
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui-custom/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { toast } from "sonner";
import { Eye, EyeOff, Key } from "lucide-react";

interface ApiKeyInputProps {
  apiKey: string;
  setApiKey: (apiKey: string) => void;
  isApiKeySet: boolean;
  setIsApiKeySet: (isSet: boolean) => void;
}

const ApiKeyInput = ({ apiKey, setApiKey, isApiKeySet, setIsApiKeySet }: ApiKeyInputProps) => {
  const [showApiKey, setShowApiKey] = useState(false);
  const [tempApiKey, setTempApiKey] = useState(apiKey);

  const handleSaveApiKey = () => {
    if (!tempApiKey.trim()) {
      toast.error("Įveskite galiojantį API raktą");
      return;
    }
    
    // Save API key to local storage
    localStorage.setItem("geminiApiKey", tempApiKey);
    setApiKey(tempApiKey);
    setIsApiKeySet(true);
    toast.success("API raktas sėkmingai išsaugotas!");
  };

  const handleClearApiKey = () => {
    localStorage.removeItem("geminiApiKey");
    setApiKey("");
    setTempApiKey("");
    setIsApiKeySet(false);
    toast.success("API raktas pašalintas!");
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5 text-primary" />
          Google AI Studio API raktas
        </CardTitle>
        <CardDescription>
          Įveskite savo Google AI Studio API raktą, kad pradėtumėte naudotis!
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">API Raktas</Label>
          <div className="relative">
            <Input
              id="api-key"
              type={showApiKey ? "text" : "password"}
              placeholder="Įvesk savo Gemini API raktą"
              value={tempApiKey}
              onChange={(e) => setTempApiKey(e.target.value)}
              className="pr-10 focus-premium"
            />
            <button
              type="button"
              onClick={() => setShowApiKey(!showApiKey)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
            >
              {showApiKey ? (
                <EyeOff className="h-4 w-4" />
              ) : (
                <Eye className="h-4 w-4" />
              )}
            </button>
          </div>
        </div>
        <div className="flex gap-2">
          <Button onClick={handleSaveApiKey} className="flex-1">
            Išsaugoti raktą
          </Button>
          {isApiKeySet && (
            <Button variant="outline" onClick={handleClearApiKey}>
              Išvalyti
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;
