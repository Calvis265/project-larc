
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { FC } from "react";
import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const serviceImages = [
  { src: "https://placehold.co/1200x600.png", alt: "Professional Cabro Installation", hint: "cabro paving" },
  { src: "https://placehold.co/1200x600.png", alt: "Creative Landscape Design", hint: "landscape design" },
  { src: "https://placehold.co/1200x600.png", alt: "Ground Tilling and Preparation", hint: "ground tilling" },
  { src: "https://placehold.co/1200x600.png", alt: "Site Clearing and Levelling", hint: "site clearing" },
  { src: "https://placehold.co/1200x600.png", alt: "Grass Planting and Seeding", hint: "grass planting" },
  { src: "https://placehold.co/1200x600.png", alt: "Ongoing Landscape Maintenance", hint: "landscape maintenance" },
];

export const ServicesCarousel: FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    const onSelectHandler = () => {
      setCurrent(api.selectedScrollSnap());
    };

    const onReInitHandler = () => {
      setCount(api.scrollSnapList().length);
      setCurrent(api.selectedScrollSnap());
    };
    
    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap());

    api.on("select", onSelectHandler);
    api.on("reInit", onReInitHandler);

    return () => {
      api.off("select", onSelectHandler);
      api.off("reInit", onReInitHandler);
    };
  }, [api]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
    },
    [api]
  );

  return (
    <section id="services" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-headline text-primary">Our Services</h2>
        <div className="w-full max-w-4xl mx-auto">
          <Carousel
            setApi={setApi}
            opts={{
              align: "start",
              loop: true,
              duration: 40, 
            }}
            plugins={[
              Autoplay({
                delay: 5000,
                stopOnInteraction: true, 
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {serviceImages.map((image, index) => (
                <CarouselItem key={index}>
                  <Card className="overflow-hidden shadow-lg">
                    <CardContent className="flex aspect-[2/1] items-center justify-center p-0">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={1200}
                        height={600}
                        className="object-cover w-full h-full"
                        data-ai-hint={image.hint}
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {api && (
            <div className="flex justify-center space-x-2 pt-6">
              {Array.from({ length: count }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => scrollTo(index)}
                  className={cn(
                    "w-3 h-3 rounded-full transition-colors duration-150 ease-in-out",
                    current === index
                      ? "bg-primary scale-110"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
                  )}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
