
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle, CheckCircle2 } from "lucide-react";
import type { FC } from "react";
import Link from "next/link";

const InfoPoint: FC<{ icon: React.ReactNode; children: React.ReactNode }> = ({ icon, children }) => (
  <div className="flex items-start space-x-3 mb-3">
    <span className="text-primary mt-1">{icon}</span>
    <p className="text-foreground/80">{children}</p>
  </div>
);

export const AboutMissionSection: FC = () => {
  return (
    <section id="about" className="py-16 bg-secondary">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Who We Are</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoPoint icon={<Circle className="w-5 h-5" />}>
                Larchcode specializes in professional cabro installation and comprehensive landscaping services. We transform outdoor areas with quality paving and thoughtful landscape design.
              </InfoPoint>
              <InfoPoint icon={<Circle className="w-5 h-5" />}>
                Our expertise includes meticulous land preparation: from design and tilling to clearing, levelling, and planting. We ensure a perfect foundation for every project.
              </InfoPoint>
              <InfoPoint icon={<Circle className="w-5 h-5" />}>
                We are committed to delivering durable and aesthetically pleasing outdoor solutions, enhancing both the value and usability of your space.
              </InfoPoint>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">About Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <InfoPoint icon={<CheckCircle2 className="w-5 h-5" />}>
                Larchcode is your dedicated partner for all cabro and landscaping needs. We handle everything from initial landscape design to the final touches of planting and maintenance.
              </InfoPoint>
              <InfoPoint icon={<CheckCircle2 className="w-5 h-5" />}>
                Our services encompass ground tilling, site clearance, precise levelling, expert grass planting, and ongoing maintenance to ensure your landscape thrives.
              </InfoPoint>
              <Link href="#contact" className="text-primary hover:underline font-medium">
                Learn More About Our Services
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Our Mission</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoPoint icon={<Circle className="w-5 h-5" />}>
                Our mission is to provide top-tier cabro installation and landscaping services, focusing on quality craftsmanship, sustainable practices, and client satisfaction.
              </InfoPoint>
              <InfoPoint icon={<Circle className="w-5 h-5" />}>
                We are dedicated to transforming grounds through expert preparation, including designing, tilling, clearing, levelling, and planting, creating functional and beautiful outdoor spaces.
              </InfoPoint>
              <InfoPoint icon={<Circle className="w-5 h-5" />}>
                 We aim to be leaders in creating stunning and enduring landscapes, offering comprehensive maintenance to keep them pristine.
              </InfoPoint>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
