
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Circle1, Circle2, Circle3, CheckCircle2 } from "lucide-react";
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
              <InfoPoint icon={<Circle1 className="w-5 h-5" />}>
                Larchcode is a social enterprise dedicated to transforming outdoor spaces and empowering urban youth in Nairobi's informal settlements, such as Kibera, Kangemi, and Mathare. We believe that every child and youth deserves access to green, safe, and inspiring environments.
              </InfoPoint>
              <InfoPoint icon={<Circle2 className="w-5 h-5" />}>
                Our mission is to integrate environmental sustainability with life skills empowerment. By involving youth in hands-on projects like urban gardening, mural painting, and clean-up campaigns, we provide them with practical knowledge and purpose.
              </InfoPoint>
              <InfoPoint icon={<Circle3 className="w-5 h-5" />}>
                At the heart of our work is the belief that greener communities lead to healthier minds. Through mentorship programs, workshops, and collaborative events, we help young people discover their potential while building stronger, more connected neighborhoods.
              </InfoPoint>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">About Us</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
               <InfoPoint icon={<CheckCircle2 className="w-5 h-5" />}>
                Larchcode is a passionate social enterprise committed to reimagining and revitalizing outdoor spaces in Nairobi’s informal settlements. Our goal is to transform neglected environments into vibrant, functional, and sustainable landscapes while uplifting the lives of young people.
              </InfoPoint>
              <InfoPoint icon={<CheckCircle2 className="w-5 h-5" />}>
                By blending creativity, environmental care, and community engagement, we empower youth with practical skills, mentorship, and meaningful work opportunities. Through our landscaping projects, we not only beautify spaces but also inspire hope, pride, and a sense of belonging in the communities we serve.
              </InfoPoint>
              <Link href="#" className="text-primary hover:underline font-medium">
                Read More
              </Link>
            </CardContent>
          </Card>

          <Card className="shadow-lg">
            <CardHeader>
              <CardTitle className="font-headline text-2xl text-primary">Mission Statement</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <InfoPoint icon={<Circle1 className="w-5 h-5" />}>
                Our mission is to empower young men in Nairobi’s informal settlements by providing hands-on training, mentorship, and access to income-generating opportunities. We believe that with the right support, these youth can rise above their challenges and build a future full of purpose and stability.
              </InfoPoint>
              <InfoPoint icon={<Circle2 className="w-5 h-5" />}>
                We are committed to enhancing outdoor spaces through sustainable landscaping practices. Our projects focus on quality and creativity—turning underutilized spaces into vibrant, eco-friendly environments that inspire pride and ownership.
              </InfoPoint>
              <InfoPoint icon={<Circle3 className="w-5 h-5" />}>
                By combining modern finishes with environmental preservation, we aim to foster hope and dignity in communities often left behind. Every green space we touch becomes a symbol of renewal, potential, and the power of unity.
              </InfoPoint>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};
