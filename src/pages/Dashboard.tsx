import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";
import { Plus, Package, Heart, User, Pencil } from "lucide-react";
import { toast } from "sonner";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string | null;
}

interface Interest {
  id: string;
  contact_name: string;
  contact_email: string;
  contact_phone: string | null;
  message: string | null;
  created_at: string;
  product_id: string;
  products: Product;
}

interface UserInterest {
  id: string;
  created_at: string;
  products: Product;
}

const Dashboard = () => {
  const navigate = useNavigate();
  const [session, setSession] = useState<Session | null>(null);
  const [myProducts, setMyProducts] = useState<Product[]>([]);
  const [interests, setInterests] = useState<Interest[]>([]);
  const [myInterests, setMyInterests] = useState<UserInterest[]>([]);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  useEffect(() => {
    if (session) {
      fetchMyProducts();
      fetchInterests();
      fetchMyInterests();
    }
  }, [session]);

  const fetchMyProducts = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("user_id", session?.user.id)
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching products:", error);
    } else {
      setMyProducts(data || []);
    }
  };

  const fetchInterests = async () => {
    // First get products owned by the user
    const { data: userProducts } = await supabase
      .from("products")
      .select("id")
      .eq("user_id", session?.user.id);

    if (!userProducts || userProducts.length === 0) {
      setInterests([]);
      return;
    }

    const productIds = userProducts.map(p => p.id);

    // Then get interests for those products
    const { data, error } = await supabase
      .from("interests")
      .select(`
        *,
        products (*)
      `)
      .in("product_id", productIds);

    if (error) {
      console.error("Error fetching interests:", error);
    } else {
      setInterests(data || []);
    }
  };

  const fetchMyInterests = async () => {
    const { data, error } = await supabase
      .from("interests")
      .select(`
        id,
        created_at,
        products (*)
      `)
      .eq("user_id", session?.user.id);

    if (error) {
      console.error("Error fetching my interests:", error);
    } else {
      setMyInterests(data || []);
    }
  };

  const handleDeleteProduct = async (id: string) => {
    const { error } = await supabase.from("products").delete().eq("id", id);

    if (error) {
      toast.error("Failed to delete product");
    } else {
      toast.success("Product deleted successfully");
      fetchMyProducts();
    }
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold mb-2">My Dashboard</h1>
            <p className="text-muted-foreground">Manage your listings and track your activity</p>
          </div>
          <Link to="/dashboard/new-product">
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              New Listing
            </Button>
          </Link>
        </div>

        <Tabs defaultValue="products" className="space-y-6">
          <TabsList>
            <TabsTrigger value="products">
              <Package className="h-4 w-4 mr-2" />
              My Listings
            </TabsTrigger>
            <TabsTrigger value="received">
              <User className="h-4 w-4 mr-2" />
              Interests Received
            </TabsTrigger>
            <TabsTrigger value="interested">
              <Heart className="h-4 w-4 mr-2" />
              Items I'm Interested In
            </TabsTrigger>
          </TabsList>

          <TabsContent value="products">
            {myProducts.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground mb-4">You haven't listed any items yet</p>
                <Link to="/dashboard/new-product">
                  <Button>Create Your First Listing</Button>
                </Link>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {myProducts.map((product) => (
                  <Card key={product.id}>
                    <CardHeader className="p-0">
                      <div className="aspect-square bg-muted rounded-t-lg overflow-hidden">
                        {product.image_url ? (
                          <img
                            src={product.image_url}
                            alt={product.title}
                            className="w-full h-full object-cover"
                          />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                            No image
                          </div>
                        )}
                      </div>
                    </CardHeader>
                    <CardContent className="p-4">
                      <h3 className="font-semibold mb-2">{product.title}</h3>
                      <p className="text-2xl font-bold text-primary mb-4">
                        ${product.price.toFixed(2)}
                      </p>
                      <div className="flex gap-2">
                        <Link to={`/items/${product.id}`} className="flex-1">
                          <Button variant="outline" className="w-full">
                            View
                          </Button>
                        </Link>
                        <Link to={`/dashboard/edit-product/${product.id}`}>
                          <Button variant="secondary">
                            <Pencil className="h-4 w-4" />
                          </Button>
                        </Link>
                        <Button
                          variant="destructive"
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          Delete
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="received">
            {interests.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground">
                  No one has shown interest in your items yet
                </p>
              </Card>
            ) : (
              <div className="space-y-4">
                {interests.map((interest) => (
                  <Card key={interest.id}>
                    <CardHeader>
                      <CardTitle>{interest.contact_name}</CardTitle>
                      <CardDescription>
                        Interested in: {interest.products.title}
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <p>
                          <strong>Email:</strong> {interest.contact_email}
                        </p>
                        {interest.contact_phone && (
                          <p>
                            <strong>Phone:</strong> {interest.contact_phone}
                          </p>
                        )}
                        {interest.message && (
                          <p>
                            <strong>Message:</strong> {interest.message}
                          </p>
                        )}
                        <p className="text-sm text-muted-foreground">
                          Received: {new Date(interest.created_at).toLocaleDateString()}
                        </p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="interested">
            {myInterests.length === 0 ? (
              <Card className="p-12 text-center">
                <p className="text-muted-foreground mb-4">
                  You haven't shown interest in any items yet
                </p>
                <Link to="/items">
                  <Button>Browse Items</Button>
                </Link>
              </Card>
            ) : (
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {myInterests.map((interest) => (
                  <Link key={interest.id} to={`/items/${interest.products.id}`}>
                    <Card className="h-full hover:shadow-lg transition-all">
                      <CardHeader className="p-0">
                        <div className="aspect-square bg-muted rounded-t-lg overflow-hidden">
                          {interest.products.image_url ? (
                            <img
                              src={interest.products.image_url}
                              alt={interest.products.title}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                              No image
                            </div>
                          )}
                        </div>
                      </CardHeader>
                      <CardContent className="p-4">
                        <h3 className="font-semibold mb-2">{interest.products.title}</h3>
                        <p className="text-2xl font-bold text-primary">
                          ${interest.products.price.toFixed(2)}
                        </p>
                      </CardContent>
                    </Card>
                  </Link>
                ))}
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;
