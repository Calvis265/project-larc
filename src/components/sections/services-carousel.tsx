
"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import type { FC } from "react";

const serviceImages = [
  { src: "https://placehold.co/1200x600.png?text=Service+1", alt: "Landscaping Service 1", hint: "landscaping garden" },
  { src: "https://placehold.co/1200x600.png?text=Service+2", alt: "Urban Gardening Service", hint: "urban gardening" },
  { src: "https://placehold.co/1200x600.png?text=Service+3", alt: "Mural Painting Service", hint: "mural art" },
  { src: "https://placehold.co/1200x600.png?text=Service+4", alt: "Outdoor Revitalization", hint: "outdoor space" },
  { src: "https://placehold.co/1200x600.png?text=Service+5", alt: "Community Cleanup Projects", hint: "community project" },
  { src: "https://placehold.co/1200x600.png?text=Service+6", alt: "Youth Empowerment Programs", hint: "youth program" },
];

export const ServicesCarousel: FC = () => {
  return (
    <section id="services" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 font-headline text-primary">Our Services</h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          plugins={[
            Autoplay({
              delay: 5000,
            }),
          ]}
          className="w-full max-w-4xl mx-auto"
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
          <CarouselPrevious className="ml-12 text-primary bg-background/80 hover:bg-background" />
          <CarouselNext className="mr-12 text-primary bg-background/80 hover:bg-background" />
        </Carousel>
      </div>
    </section>
  );
};
