
"use client";

import { useState, type FC, type FormEvent } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Loader2 } from "lucide-react";
import { suggestProducts, type ProductSuggestionInput } from "@/ai/flows/product-suggestion";

export const ProductSuggestion: FC = () => {
  const [purchaseHistory, setPurchaseHistory] = useState("");
  const [category, setCategory] = useState("");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError(null);
    setSuggestions([]);

    try {
      const input: ProductSuggestionInput = { purchaseHistory, category };
      const result = await suggestProducts(input);
      setSuggestions(result.suggestions);
    } catch (err) {
      console.error("Error fetching product suggestions:", err);
      setError("Failed to get suggestions. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="ai-suggestions" className="py-16 bg-muted">
      <div className="container mx-auto px-4 max-w-2xl">
        <Card className="shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center font-headline text-primary">AI Material Suggestions</CardTitle>
            <CardDescription className="text-center text-foreground/80">
              Get personalized material recommendations for your landscaping or cabro project.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <Label htmlFor="purchase-history" className="text-primary">Project Details / Existing Materials</Label>
                <Textarea
                  id="purchase-history"
                  value={purchaseHistory}
                  onChange={(e) => setPurchaseHistory(e.target.value)}
                  placeholder="e.g., Grey Cabro Blocks, Topsoil, Lawn Grass Seeds, Driveway paving for 50sqm"
                  required
                  className="mt-1 min-h-[100px]"
                />
                <p className="text-sm text-muted-foreground mt-1">Enter materials you have or describe your project.</p>
              </div>
              <div>
                <Label htmlFor="category" className="text-primary">Material/Product Category</Label>
                <Input
                  id="category"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g., Paving Materials, Landscaping Supplies, Plants, Tools"
                  required
                  className="mt-1"
                />
              </div>
              <Button type="submit" className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-headline text-lg py-3" disabled={isLoading}>
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Get Suggestions"}
              </Button>
            </form>

            {error && <p className="mt-4 text-sm text-destructive text-center">{error}</p>}

            {suggestions.length > 0 && (
              <div className="mt-8">
                <h3 className="text-xl font-semibold mb-3 text-primary">Recommended for you:</h3>
                <ul className="list-disc list-inside space-y-1 text-foreground/90">
                  {suggestions.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
