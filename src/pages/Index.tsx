
import { useState, useEffect } from "react";
import ApiKeyInput from "@/components/ApiKeyInput";
import QueryForm from "@/components/QueryForm";
import ResponseDisplay from "@/components/ResponseDisplay";
import MapSection from "@/components/MapSection";
import { generateResponse } from "@/services/geminiService";
import { toast } from "sonner";

const Index = () => {
  const [apiKey, setApiKey] = useState("");
  const [isApiKeySet, setIsApiKeySet] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState("");
  const [currentQuestion, setCurrentQuestion] = useState(""); // Add state for current question

  useEffect(() => {
    // Check if API key is saved in local storage
    const savedApiKey = localStorage.getItem("geminiApiKey");
    if (savedApiKey) {
      setApiKey(savedApiKey);
      setIsApiKeySet(true);
    }
  }, []);

  const handleSubmitQuery = async (query: string) => {
    if (!isApiKeySet) {
      toast.error("Please set your Google AI Studio API key first");
      return;
    }

    setIsLoading(true);
    setResponse("");
    setCurrentQuestion(query); // Save the current question

    try {
      const result = await generateResponse(apiKey, query);
      setResponse(result);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Failed to get response from Gemini");
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="max-w-4xl mx-auto px-4 py-16 sm:py-24">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            <span className="inline-block animate-slide-up" style={{ animationDelay: "0ms" }}>NFQ</span>{" "}
            <span className="inline-block animate-slide-up" style={{ animationDelay: "150ms" }}>Tech-park</span>{" "}
            <span className="inline-block animate-slide-up" style={{ animationDelay: "300ms" }}>Iššūkis</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 opacity-0 animate-fade-in" style={{ animationDelay: "450ms", animationFillMode: "forwards" }}>
            Virtualus asistentas, informuojantis apie vietos verslų paslaugas
          </p>
        </div>

        <div className="space-y-8">
          {!isApiKeySet && (
            <ApiKeyInput 
              apiKey={apiKey}
              setApiKey={setApiKey}
              isApiKeySet={isApiKeySet}
              setIsApiKeySet={setIsApiKeySet}
            />
          )}
          
          {isApiKeySet && (
            <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2 lg:gap-8">
              <div className="space-y-6">
                <QueryForm onSubmit={handleSubmitQuery} isLoading={isLoading} />
                
                <div className="flex items-center justify-between px-2">
                  <p className="text-sm text-gray-500">
                    API Key: {apiKey.substring(0, 4)}...{apiKey.substring(apiKey.length - 4)}
                  </p>
                  <button 
                    onClick={() => setIsApiKeySet(false)} 
                    className="text-sm text-primary hover:underline"
                  >
                    Pakeisti raktą
                  </button>
                </div>
              </div>
              
              <ResponseDisplay 
                response={response} 
                loading={isLoading} 
                question={currentQuestion}
              />
            </div>
          )}
          
          {/* Map Section */}
          <div className="mt-12">
            <MapSection />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
