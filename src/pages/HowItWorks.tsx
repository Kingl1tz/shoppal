import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import howItWorks1 from "@/assets/how-it-works-1.jpg";
import howItWorks2 from "@/assets/how-it-works-2.jpg";
import howItWorks3 from "@/assets/how-it-works-3.jpg";

const HowItWorks = () => {
  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-4">How Shoppal Works</h1>
          <p className="text-lg text-muted-foreground">
            Getting started is easy. Follow these simple steps to buy or sell items.
          </p>
        </div>

        <div className="space-y-16">
          {/* Step 1 */}
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="order-2 md:order-1">
              <div className="mb-4">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  1
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-4">Create Your Account</h2>
              <p className="text-muted-foreground mb-4">
                Sign up for free in less than a minute. Provide your basic contact information
                so buyers and sellers can reach you. Your information is kept secure and only
                shared when you choose to connect with others.
              </p>
              <Link to="/auth">
                <Button>
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="order-1 md:order-2">
              <Card className="overflow-hidden">
                <img
                  src={howItWorks1}
                  alt="Create account"
                  className="w-full h-64 object-cover"
                />
              </Card>
            </div>
          </div>

          {/* Step 2 */}
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <Card className="overflow-hidden">
                <img
                  src={howItWorks2}
                  alt="Browse items"
                  className="w-full h-64 object-cover"
                />
              </Card>
            </div>
            <div>
              <div className="mb-4">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  2
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-4">List or Browse Items</h2>
              <p className="text-muted-foreground mb-4">
                <strong>Selling?</strong> List your items with photos, descriptions, and pricing.
                It's completely free to post. <br/><br/>
                <strong>Buying?</strong> Browse thousands of items from our community. Use search
                and filters to find exactly what you need.
              </p>
              <Link to="/items">
                <Button variant="outline">
                  Browse Items
                </Button>
              </Link>
            </div>
          </div>

          {/* Step 3 */}
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="order-2 md:order-1">
              <div className="mb-4">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-primary text-primary-foreground font-semibold">
                  3
                </span>
              </div>
              <h2 className="text-2xl font-bold mb-4">Connect & Complete</h2>
              <p className="text-muted-foreground mb-4">
                Found something you like? Click "Show Interest" to share your contact information
                with the seller. Sellers will see who's interested in their items and can reach
                out directly. Complete your transaction safely with direct communication.
              </p>
            </div>
            <div className="order-1 md:order-2">
              <Card className="overflow-hidden">
                <img
                  src={howItWorks3}
                  alt="Connect with sellers"
                  className="w-full h-64 object-cover"
                />
              </Card>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-8">
            <h2 className="text-2xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="mb-6 opacity-90">
              Join our growing community of buyers and sellers today.
            </p>
            <Link to="/auth">
              <Button size="lg" variant="secondary">
                Create Your Free Account
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
