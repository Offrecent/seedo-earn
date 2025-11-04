import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Landmark, ClipboardCheck, Ticket, Users } from "lucide-react";

const features = [
  {
    icon: <Landmark className="h-8 w-8 text-primary" />,
    title: "Paid Registration",
    description: "Secure your spot in our exclusive network with a one-time activation fee.",
  },
  {
    icon: <ClipboardCheck className="h-8 w-8 text-primary" />,
    title: "Daily Tasks",
    description: "Complete simple daily tasks to earn rewards and boost your income.",
  },
  {
    icon: <Ticket className="h-8 w-8 text-primary" />,
    title: "Daily Raffle",
    description: "Participate in our daily raffle for a chance to win exciting cash prizes.",
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: "Partner Network",
    description: "Grow your earnings by inviting friends and building your referral network.",
  },
];

export function Features() {
  return (
    <section id="features" className="w-full py-12 md:py-24 lg:py-32">
      <div className="container mx-auto px-4 md:px-6">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">How It Works</h2>
          <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
            A simple process to start your earning journey with Seedo.
          </p>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <div key={index} className="glass-card p-4 transition-transform duration-300 hover:scale-105 hover:shadow-2xl">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-lg font-medium">
                  {feature.title}
                </CardTitle>
                {feature.icon}
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
