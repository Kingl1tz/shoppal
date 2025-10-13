import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { ArrowLeft } from "lucide-react";
import { Session } from "@supabase/supabase-js";

interface Product {
  id: string;
  title: string;
  description: string;
  price: number;
  image_url: string | null;
  user_id: string;
}

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState<Product | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [showInterestForm, setShowInterestForm] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (id) {
      fetchProduct();
    }
  }, [id]);

  const fetchProduct = async () => {
    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      console.error("Error fetching product:", error);
      toast.error("Product not found");
      navigate("/items");
    } else {
      setProduct(data);
    }
  };

  const handleInterestSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session) {
      toast.error("Please sign in to show interest");
      navigate("/auth");
      return;
    }

    if (!formData.name.trim() || !formData.email.trim()) {
      toast.error("Please fill in all required fields");
      return;
    }

    try {
      const { error } = await supabase.from("interests").insert({
        product_id: id,
        user_id: session.user.id,
        contact_name: formData.name,
        contact_email: formData.email,
        contact_phone: formData.phone,
        message: formData.message,
      });

      if (error) throw error;

      toast.success("Interest submitted! The seller will contact you soon.");
      setShowInterestForm(false);
      setFormData({ name: "", email: "", phone: "", message: "" });
    } catch (error: any) {
      if (error.code === "23505") {
        toast.error("You've already shown interest in this item");
      } else {
        toast.error("Failed to submit interest");
      }
    }
  };

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12">
      <div className="container mx-auto px-4 max-w-6xl">
        <Button
          variant="ghost"
          onClick={() => navigate("/items")}
          className="mb-6"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to Items
        </Button>

        <div className="grid gap-8 md:grid-cols-2">
          <div>
            <div className="aspect-square bg-muted rounded-lg overflow-hidden mb-4">
              {product.image_url ? (
                <img
                  src={product.image_url}
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-muted-foreground">
                  No image available
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div>
              <h1 className="text-3xl font-bold mb-2">{product.title}</h1>
              <p className="text-4xl font-bold text-primary mb-4">
                ${product.price.toFixed(2)}
              </p>
              <p className="text-muted-foreground whitespace-pre-wrap">
                {product.description}
              </p>
            </div>

            {!showInterestForm ? (
              <Button
                size="lg"
                className="w-full"
                onClick={() => {
                  if (!session) {
                    navigate("/auth");
                  } else {
                    setShowInterestForm(true);
                  }
                }}
              >
                Show Interest
              </Button>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Contact Seller</CardTitle>
                  <CardDescription>
                    Fill in your details to show interest in this item
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleInterestSubmit} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="name">Your Name *</Label>
                      <Input
                        id="name"
                        required
                        value={formData.name}
                        onChange={(e) =>
                          setFormData({ ...formData, name: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email">Your Email *</Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          setFormData({ ...formData, email: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Your Phone</Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          setFormData({ ...formData, phone: e.target.value })
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="message">Message (Optional)</Label>
                      <Textarea
                        id="message"
                        rows={3}
                        value={formData.message}
                        onChange={(e) =>
                          setFormData({ ...formData, message: e.target.value })
                        }
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        Submit Interest
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => setShowInterestForm(false)}
                      >
                        Cancel
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
