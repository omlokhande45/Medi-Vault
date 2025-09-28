import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AuthService } from "@/lib/auth";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const loginSchema = z.object({
  uid: z.string().min(1, "UID is required"),
  password: z.string().min(1, "Password is required"),
});

type LoginFormData = z.infer<typeof loginSchema>;

interface DoctorLoginFormProps {
  onSuccess: () => void;
}

export const DoctorLoginForm: React.FC<DoctorLoginFormProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  
  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      uid: "",
      password: "",
    },
  });

  const onSubmit = async (data: LoginFormData) => {
    setIsSubmitting(true);
    
    try {
      const result = AuthService.loginDoctor(data.uid, data.password);

      if (result.success && result.user) {
        toast({
          title: "Login Successful",
          description: "Welcome back, Dr. " + result.user.name + "!",
        });
        login(result.user);
        onSuccess();
      } else {
        toast({
          title: "Login Failed",
          description: result.message,
          variant: "destructive",
        });
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-medical">
      <CardHeader className="text-center">
        <CardTitle className="text-2xl font-bold text-primary">Doctor Login</CardTitle>
        <p className="text-muted-foreground">Access your healthcare dashboard</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="uid"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>UID (Unique Identification Number)</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your medical UID" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Enter your password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full" 
              size="lg"
              disabled={isSubmitting}
              variant="medical"
            >
              {isSubmitting ? "Signing In..." : "Sign In"}
            </Button>

            <div className="text-center">
              <Link to="#" className="text-sm text-primary hover:underline">
                Forgot Password?
              </Link>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};