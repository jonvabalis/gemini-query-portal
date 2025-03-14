
import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui-custom/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui-custom/card";
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
      toast.error("Please enter a valid API key");
      return;
    }
    
    // Save API key to local storage
    localStorage.setItem("geminiApiKey", tempApiKey);
    setApiKey(tempApiKey);
    setIsApiKeySet(true);
    toast.success("API key saved successfully");
  };

  const handleClearApiKey = () => {
    localStorage.removeItem("geminiApiKey");
    setApiKey("");
    setTempApiKey("");
    setIsApiKeySet(false);
    toast.success("API key removed");
  };

  return (
    <Card className="w-full max-w-md mx-auto animate-fade-in">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5 text-primary" />
          Google Gemini API Key
        </CardTitle>
        <CardDescription>
          Enter your Google Gemini API key to start using the service
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="api-key">API Key</Label>
          <div className="relative">
            <Input
              id="api-key"
              type={showApiKey ? "text" : "password"}
              placeholder="Enter your Gemini API key"
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
            Save Key
          </Button>
          {isApiKeySet && (
            <Button variant="outline" onClick={handleClearApiKey}>
              Clear
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ApiKeyInput;
