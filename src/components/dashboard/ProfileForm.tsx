import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Patient } from "@/lib/auth";
import { useAuth } from "@/contexts/AuthContext";
import { toast } from "@/hooks/use-toast";

const profileSchema = z.object({
  height: z.number().optional(),
  weight: z.number().optional(),
  bloodPressure: z.string().optional(),
  spo2: z.number().min(0).max(100).optional(),
  eyeSight: z.string().optional(),
  sleepSchedule: z.string().optional(),
  medicalHistory: z.string().optional(),
  allergies: z.string().optional(),
});

type ProfileFormData = z.infer<typeof profileSchema>;

interface ProfileFormProps {
  patient: Patient;
}

export const ProfileForm: React.FC<ProfileFormProps> = ({ patient }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { updateUser } = useAuth();
  
  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      height: patient.height || undefined,
      weight: patient.weight || undefined,
      bloodPressure: patient.bloodPressure || "",
      spo2: patient.spo2 || undefined,
      eyeSight: patient.eyeSight || "",
      sleepSchedule: patient.sleepSchedule || "",
      medicalHistory: patient.medicalHistory || "",
      allergies: patient.allergies || "",
    },
  });

  const onSubmit = async (data: ProfileFormData) => {
    setIsSubmitting(true);
    
    try {
      updateUser(data);
      toast({
        title: "Profile Updated",
        description: "Your health profile has been updated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="shadow-medical">
      <CardHeader>
        <CardTitle className="text-primary">Health Profile</CardTitle>
        <p className="text-muted-foreground">Update your medical information for accurate health reports</p>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            {/* Basic Health Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="height"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Height (cm)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter height in cm" 
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="weight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Weight (kg)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        placeholder="Enter weight in kg" 
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseFloat(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="bloodPressure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Blood Pressure</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 120/80" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="spo2"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>SpO2 (%)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        max="100" 
                        placeholder="e.g., 98" 
                        {...field}
                        onChange={(e) => field.onChange(e.target.value ? parseInt(e.target.value) : undefined)}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="eyeSight"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Eye Sight</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 20/20, -2.5D" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="sleepSchedule"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Sleep Schedule</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., 10 PM - 6 AM" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="medicalHistory"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Medical History</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List any previous surgeries, chronic conditions, medications..."
                      className="min-h-[100px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="allergies"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Allergies</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="List any known allergies to medications, foods, or environmental factors..."
                      className="min-h-[80px]"
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button 
              type="submit" 
              className="w-full md:w-auto" 
              size="lg"
              disabled={isSubmitting}
              variant="medical"
            >
              {isSubmitting ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};