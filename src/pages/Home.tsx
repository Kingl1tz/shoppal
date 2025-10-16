import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";
import { ArrowRight, Search, Package, MessageSquare } from "lucide-react";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import heroImage from "@/assets/hero-image.jpg";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string | null;
  tags: string[] | null;
  created_at: string;
}

const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    loadFeaturedProducts();
  }, []);

  const loadFeaturedProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("created_at", { ascending: false })
      .limit(6);

    if (error) {
      console.error("Error loading products:", error);
      return;
    }

    if (data) {
      setFeaturedProducts(data);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-background to-background" />
        <div className="container relative mx-auto px-4 py-20 md:py-32">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
                Share and Borrow in Your{" "}
                <span className="text-primary">Community</span>
              </h1>
              <p className="text-lg text-muted-foreground md:text-xl">
                Join your neighbors in sharing items you own and borrowing what you need. Build a stronger, more connected community.
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

      {/* Featured Listings */}
      {featuredProducts.length > 0 && (
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex justify-between items-center mb-12">
              <div>
                <h2 className="text-3xl font-bold mb-2">Featured Listings</h2>
                <p className="text-muted-foreground">Check out the latest items from our community</p>
              </div>
              <Link to="/items">
                <Button variant="outline">
                  View All
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Link key={product.id} to={`/items/${product.id}`}>
                  <Card className="h-full hover:shadow-lg transition-all duration-300 hover:scale-[1.02]">
                    {product.image_url ? (
                      <div className="aspect-video w-full overflow-hidden rounded-t-lg bg-muted">
                        <img
                          src={product.image_url}
                          alt={product.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="aspect-video w-full bg-gradient-to-br from-primary/10 to-muted rounded-t-lg flex items-center justify-center">
                        <Package className="h-16 w-16 text-muted-foreground/50" />
                      </div>
                    )}
                    <CardHeader>
                      <div className="flex justify-between items-start mb-2">
                        <CardTitle className="line-clamp-1">{product.title}</CardTitle>
                        <Badge variant="secondary" className="shrink-0 ml-2">
                          ${product.price.toFixed(2)}
                        </Badge>
                      </div>
                      <CardDescription className="line-clamp-2">
                        {product.description}
                      </CardDescription>
                    </CardHeader>
                    {product.tags && product.tags.length > 0 && (
                      <CardFooter>
                        <div className="flex flex-wrap gap-2">
                          {product.tags.slice(0, 3).map((tag, index) => (
                            <Badge key={index} variant="outline" className="text-xs">
                              {tag}
                            </Badge>
                          ))}
                          {product.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{product.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                      </CardFooter>
                    )}
                  </Card>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Features Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Why Choose Shoppal?</h2>
            <p className="text-lg text-muted-foreground">Everything you need for seamless community sharing</p>
          </div>
          <div className="grid gap-8 md:grid-cols-3">
            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Search className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Easy Discovery</h3>
              <p className="text-muted-foreground">
                Browse items from your neighbors. Find what you need and connect with people in your community who have it.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <Package className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Share Items Free</h3>
              <p className="text-muted-foreground">
                Listing items is completely free. Upload photos, share what you have, and help your community thrive.
              </p>
            </Card>
            <Card className="p-6 hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                <MessageSquare className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">Direct Connect</h3>
              <p className="text-muted-foreground">
                Connect directly with your neighbors. Build relationships while sharing resources and reducing waste.
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <Card className="bg-gradient-to-br from-primary to-primary/80 text-primary-foreground p-12 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Get Started?</h2>
            <p className="text-lg mb-8 opacity-90">
              Join our community today and start sharing with your neighbors.
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
