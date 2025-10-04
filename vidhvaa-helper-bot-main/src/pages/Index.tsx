import { ChatWidget } from "@/components/ChatWidget";
import { Button } from "@/components/ui/button";
import { GraduationCap, Trophy, Clock, Users } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[hsl(var(--gradient-hero))] to-background">
        <div className="container mx-auto px-4 py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 mb-6">
              <GraduationCap className="h-4 w-4 text-primary" />
              <span className="text-sm font-medium text-primary">Vidhvaa Careermate</span>
            </div>
            
            <h1 className="text-5xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              50 Days Challenge
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Transform your future with India's most exciting competitive exam challenge. 
              Build discipline, enhance intelligence, and win up to ₹10,00,000!
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
                Register Now
              </Button>
              <Button size="lg" variant="outline">
                Learn More
              </Button>
            </div>
          </div>
        </div>
        
        {/* Decorative gradient orbs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-3xl -z-0" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/10 rounded-full blur-3xl -z-0" />
      </section>

      {/* Features Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-[var(--shadow-soft)] transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Trophy className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Win Big Prizes</h3>
              <p className="text-muted-foreground">
                1st Prize ₹5,00,000 with a Bumper Prize of ₹10,00,000 for top performers
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-[var(--shadow-soft)] transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-secondary/10 flex items-center justify-center mb-4">
                <Clock className="h-6 w-6 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Daily at 6 AM</h3>
              <p className="text-muted-foreground">
                Build discipline with 30 questions daily for 50 consecutive days
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-[var(--shadow-soft)] transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-accent/10 flex items-center justify-center mb-4">
                <GraduationCap className="h-6 w-6 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Learn Current Affairs</h3>
              <p className="text-muted-foreground">
                Master important current affairs for competitive entrance exams
              </p>
            </div>

            <div className="p-6 rounded-2xl bg-card border border-border hover:shadow-[var(--shadow-soft)] transition-shadow">
              <div className="h-12 w-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <Users className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Join Thousands</h3>
              <p className="text-muted-foreground">
                Be part of a community committed to excellence and growth
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Future?</h2>
            <p className="text-xl text-muted-foreground mb-8">
              Join the 50 Days Challenge and unlock your potential. Register now for just ₹250 
              and get it back doubled if you complete all 50 days!
            </p>
            <Button size="lg" className="bg-gradient-to-r from-primary to-accent hover:opacity-90 transition-opacity">
              Start Your Journey Today
            </Button>
          </div>
        </div>
      </section>

      {/* Chat Widget */}
      <ChatWidget />
    </div>
  );
};

export default Index;
