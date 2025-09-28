import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { AuthService } from "@/lib/auth";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const doctorSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  uid: z.string().min(6, "UID must be at least 6 characters"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
  dateOfBirth: z.string().min(1, "Date of birth is required"),
  place: z.string().min(2, "Place is required"),
  hospitalName: z.string().min(2, "Hospital name is required"),
  speciality: z.string().min(2, "Speciality is required"),
});

type DoctorFormData = z.infer<typeof doctorSchema>;

const specialities = [
  "Cardiology", "Dermatology", "Emergency Medicine", "Family Medicine",
  "General Surgery", "Internal Medicine", "Neurology", "Obstetrics and Gynecology",
  "Oncology", "Ophthalmology", "Orthopedics", "Pediatrics", "Psychiatry",
  "Radiology", "Urology", "Other"
];

interface DoctorRegistrationFormProps {
  onSuccess: () => void;
}

export const DoctorRegistrationForm: React.FC<DoctorRegistrationFormProps> = ({ onSuccess }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { login } = useAuth();
  
  const form = useForm<DoctorFormData>({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      name: "",
      uid: "",
      email: "",
      password: "",
      dateOfBirth: "",
      place: "",
      hospitalName: "",
      speciality: "",
    },
  });

  const onSubmit = async (data: DoctorFormData) => {
    setIsSubmitting(true);
    
    try {
      const result = AuthService.registerDoctor({
        name: data.name,
        uid: data.uid,
        email: data.email,
        password: data.password,
        dateOfBirth: data.dateOfBirth,
        place: data.place,
        hospitalName: data.hospitalName,
        speciality: data.speciality,
        type: 'doctor' as const,
      });

      if (result.success && result.user) {
        toast({
          title: "Registration Successful",
          description: "Welcome to MediVault! You can now access your healthcare dashboard.",
        });
        login(result.user);
        onSuccess();
      } else {
        toast({
          title: "Registration Failed",
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
        <CardTitle className="text-2xl font-bold text-primary">Doctor Registration</CardTitle>
        <p className="text-muted-foreground">Join our healthcare provider network</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your full name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="uid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>UID (Unique ID)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your medical UID" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Email Address</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Enter email address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <Input type="password" placeholder="Create a secure password" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="dateOfBirth"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date of Birth</FormLabel>
                    <FormControl>
                      <Input type="date" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="place"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>City/Place</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter your city" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="hospitalName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hospital/Clinic Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter hospital or clinic name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="speciality"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Speciality</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your speciality" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {specialities.map((speciality) => (
                        <SelectItem key={speciality} value={speciality}>
                          {speciality}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
              {isSubmitting ? "Creating Account..." : "Create Doctor Account"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};