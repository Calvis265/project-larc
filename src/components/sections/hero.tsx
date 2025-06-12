
import type { FC } from "react";

export const HeroSection: FC = () => {
  return (
    <section id="home" className="bg-background py-20 md:py-32 text-center">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold font-headline mb-6 text-primary">
          Welcome To Larchcode Hub
        </h1>
        <p className="text-lg md:text-xl text-foreground max-w-3xl mx-auto">
          At Larchcode Hub, we transform spaces and lives. We create stunning, sustainable outdoor solutions while empowering urban youth with brighter futures.
        </p>
      </div>
    </section>
  );
};
