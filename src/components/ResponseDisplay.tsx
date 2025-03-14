
import { useState } from "react";
import { Button } from "@/components/ui-custom/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Copy, Check } from "lucide-react";
import { toast } from "sonner";

interface ResponseDisplayProps {
  response: string;
  loading: boolean;
}

const ResponseDisplay = ({ response, loading }: ResponseDisplayProps) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(response);
    setCopied(true);
    toast.success("Response copied to clipboard");
    setTimeout(() => setCopied(false), 2000);
  };

  if (!response && !loading) return null;

  return (
    <Card className="w-full overflow-hidden animate-fade-in">
      <CardHeader className="pb-0 flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-medium">Response</CardTitle>
        {response && (
          <Button
            variant="outline"
            size="sm"
            onClick={handleCopy}
            className="h-8 px-2 text-xs"
          >
            {copied ? (
              <Check className="h-3.5 w-3.5 mr-1" />
            ) : (
              <Copy className="h-3.5 w-3.5 mr-1" />
            )}
            {copied ? "Copied" : "Copy"}
          </Button>
        )}
      </CardHeader>
      <CardContent className="pt-4">
        {loading ? (
          <div className="flex flex-col gap-2">
            <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-5/6 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-4 w-2/3 bg-gray-200 rounded animate-pulse"></div>
          </div>
        ) : (
          <div className="whitespace-pre-wrap">{response}</div>
        )}
      </CardContent>
    </Card>
  );
};

export default ResponseDisplay;
