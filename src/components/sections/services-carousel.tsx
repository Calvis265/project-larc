
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

interface Service {
  id: string; 
  src: string;
  alt: string;
}

const LOCAL_STORAGE_KEY = "larchcodeHubServices";

const initialServiceImages: Service[] = [
  { id: "1", src: "https://placehold.co/1200x600.png", alt: "Professional Cabro Installation" },
  { id: "2", src: "https://placehold.co/1200x600.png", alt: "Creative Landscape Design" },
  { id: "3", src: "https://placehold.co/1200x600.png", alt: "Ground Tilling and Preparation" },
  { id: "4", src: "https://placehold.co/1200x600.png", alt: "Site Clearing and Levelling" },
  { id: "5", src: "https://placehold.co/1200x600.png", alt: "Grass Planting and Seeding" },
  { id: "6", src: "https://placehold.co/1200x600.png", alt: "Ongoing Landscape Maintenance" },
];

export const ServicesCarousel: FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);
  const [serviceImages, setServiceImages] = useState<Service[]>([]);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const storedServices = localStorage.getItem(LOCAL_STORAGE_KEY);
      if (storedServices) {
        const parsedServices: Service[] = JSON.parse(storedServices);
        if (parsedServices.length > 0) {
          setServiceImages(parsedServices);
        } else {
           setServiceImages(initialServiceImages); 
        }
      } else {
        setServiceImages(initialServiceImages); 
      }
    } catch (error) {
      console.error("Failed to load services from localStorage for carousel", error);
      setServiceImages(initialServiceImages); 
    }
  }, []);


  useEffect(() => {
    if (!api || serviceImages.length === 0) {
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
  }, [api, serviceImages]);

  const scrollTo = useCallback(
    (index: number) => {
      api?.scrollTo(index);
      const autoplayPlugin = api?.plugins()?.autoplay as any;
      if (autoplayPlugin) {
        autoplayPlugin.stop();
      }
    },
    [api]
  );

  if (!isMounted) {
    return ( 
      <section id="services" className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 font-headline text-primary">Our Services</h2>
          <p>Loading services...</p>
        </div>
      </section>
    );
  }

  if (serviceImages.length === 0) {
    return (
      <section id="services" className="py-16 bg-background">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-12 font-headline text-primary">Our Services</h2>
          <p className="text-muted-foreground">No services are currently available. Please check back later or add services in the admin panel.</p>
        </div>
      </section>
    );
  }

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
                stopOnInteraction: false, 
              }),
            ]}
            className="w-full"
          >
            <CarouselContent>
              {serviceImages.map((image, index) => (
                <CarouselItem key={image.id || index}> 
                  <Card className="overflow-hidden shadow-lg">
                    <CardContent className="flex aspect-[2/1] items-center justify-center p-0">
                      <Image
                        src={image.src}
                        alt={image.alt}
                        width={1200}
                        height={600}
                        className="object-cover w-full h-full"
                        priority={index === 0} 
                      />
                    </CardContent>
                  </Card>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>

          {api && count > 0 && (
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
