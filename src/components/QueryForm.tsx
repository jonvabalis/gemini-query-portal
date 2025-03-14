
import { useState, KeyboardEvent } from "react";
import { Button } from "@/components/ui-custom/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { SendHorizontal } from "lucide-react";

interface QueryFormProps {
  onSubmit: (query: string) => void;
  isLoading: boolean;
}

const QueryForm = ({ onSubmit, isLoading }: QueryFormProps) => {
  const [query, setQuery] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      onSubmit(query);
      setQuery(""); // Clear the query after submission
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    // Submit on Enter press (without Shift key)
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (query.trim() && !isLoading) {
        onSubmit(query);
        setQuery(""); // Clear the query after submission
      }
    }
  };

  return (
    <Card className="w-full animate-fade-in">
      <CardContent className="pt-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="query">Koks būtų jūsų klausimas?</Label>
            <Textarea
              id="query"
              placeholder="Įvesk savo klausimą čia..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              className="min-h-[120px] resize-none focus-premium"
              disabled={isLoading}
            />
          </div>
          <Button 
            type="submit" 
            disabled={isLoading || !query.trim()} 
            className="w-full flex items-center justify-center gap-2"
          >
            <SendHorizontal className="h-4 w-4" />
            {isLoading ? "Klausiama..." : "Užklausk"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default QueryForm;
