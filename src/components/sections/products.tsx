
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { FC } from "react";

const products = [
  {
    title: "Parcelian Paving",
    imageSrc: "https://placehold.co/400x300.png",
    description: "Durable and elegant paving solutions.",
    aiHint: "paving stone"
  },
  {
    title: "Aspire Paver",
    imageSrc: "https://placehold.co/400x300.png",
    description: "Modern designs for stylish pathways.",
    aiHint: "modern paver"
  },
  {
    title: "Sand Stone Paver",
    imageSrc: "https://placehold.co/400x300.png",
    description: "Natural look and feel for your outdoors.",
    aiHint: "sandstone paver"
  },
];

export const ProductsSection: FC = () => {
  return (
    <section id="portfolio" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-headline text-primary">Our Portfolio</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {products.map((product, index) => (
            <Card key={index} className="overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="aspect-video relative w-full">
                  <Image
                    src={product.imageSrc}
                    alt={product.title}
                    fill
                    className="object-cover rounded-t-lg"
                    data-ai-hint={product.aiHint}
                  />
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <CardTitle className="font-headline text-xl mb-2 text-primary">{product.title}</CardTitle>
                <CardDescription className="text-foreground/80">{product.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
