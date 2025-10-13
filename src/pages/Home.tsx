import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Package, MessageSquare } from "lucide-react";
import heroImage from "@/assets/hero-image.jpg";

const Home = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Buy and Sell with{" "}
                <span className="text-primary">Confidence</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Join thousands of users buying and selling items in a safe, trusted marketplace. List your items for free and connect with buyers instantly.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/auth">
                  <Button size="lg" className="w-full sm:w-auto">
                    Get Started
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </Button>
                </Link>
                <Link to="/items">
                  <Button size="lg" variant="outline" className="w-full sm:w-auto">
                    Browse Items
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative animate-fade-in delay-200">
              <div className="absolute -inset-4 bg-gradient-to-r from-primary/20 to-accent/20 blur-2xl" />
              <img
                src={heroImage}
                alt="Shoppal Marketplace"
                className="relative rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Shoppal?</h2>
            <p className="text-lg text-muted-foreground">Everything you need for seamless buying and selling</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Discovery</h3>
              <p className="text-muted-foreground">
                Browse through countless items with our intuitive search and filtering system. Find exactly what you're looking for.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">List Items Free</h3>
              <p className="text-muted-foreground">
                Post your items for sale at no cost. Add photos, descriptions, and set your price in minutes.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Direct Connect</h3>
              <p className="text-muted-foreground">
                Express interest in items and connect directly with sellers. No middleman, just simple communication.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Selling?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join our community of buyers and sellers today. It's free and takes less than a minute.
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary">
                Create Your Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Home;
