
import Image from "next/image";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import type { FC } from "react";

const teamMembers = [
  {
    name: "Loice Mugwe",
    title: "CEO Larchcode",
    description: "Experienced Finance & Operations Leader | Accredited Mediator | Strategic Management & Entrepreneurship Enthusiast | Stakeholder Engagement | Currently Improving Spanish Skills at UPV Valencia, Spain",
    imageSrc: "/loice.png",
    stars: "🌟🌟🌟🌟",
    aiHint: "female leader"
  },
  {
    name: "Calvis Onyango",
    title: "Head of Support",
    description: "Experienced Full stack Software Engineer | Currently Improving Tech Skills at Moringa school, Kenya",
    imageSrc: "/calvis.jpg",
    stars: "🌟🌟🌟🌟",
    aiHint: "male support"
  },
  {
    name: "Merceline Onyango",
    title: "Engineer",
    description: "Experienced Civil Engineer | Strategic Management & Entrepreneurship Enthusiast | Currently Improving Construction Skills at Machakos University, Kenya",
    imageSrc: "/mercy.png",
    stars: "🌟🌟🌟🌟",
    aiHint: "female engineer"
  },
  {
    name: "Michelle Troksa",
    title: "Program Manager",
    description: "Experienced Communications Program Manager | Strategic Management & Entrepreneurship Enthusiast | Stakeholder Engagement | Currently working at ,United States",
    imageSrc: "/troksa.png",
    stars: "🌟🌟🌟🌟",
    aiHint: "female manager"
  },
];

export const TeamSection: FC = () => {
  return (
    <section id="team" className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-4 font-headline text-primary">Meet Our Leadership Team</h2>
        <p className="text-center text-foreground/80 mb-12 max-w-2xl mx-auto">
          The Larchcode team is dedicated to driving the success of our company and community initiatives.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {teamMembers.map((member, index) => (
            <Card key={index} className="text-center shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader className="items-center">
                <div className="relative w-32 h-32 rounded-full overflow-hidden border-4 border-primary mb-4">
                  <Image
                    src={member.imageSrc}
                    alt={member.name}
                    fill
                    className="object-cover"
                    data-ai-hint={member.aiHint}
                  />
                </div>
                <CardTitle className="font-headline text-xl text-primary">{member.name}</CardTitle>
                <p className="text-sm text-accent font-semibold">{member.title}</p>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-foreground/70 text-sm mb-2">{member.description}</CardDescription>
                <p className="text-yellow-500 text-lg">{member.stars}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
