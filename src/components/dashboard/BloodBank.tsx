import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Droplets, Heart } from "lucide-react";
import { Patient } from "@/lib/auth";

interface BloodBankProps {
  patient: Patient;
}

export const BloodBank: React.FC<BloodBankProps> = ({ patient }) => {
  const [isDonor, setIsDonor] = useState(patient.isDonor || false);

  return (
    <Card className="shadow-medical">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <Droplets className="h-5 w-5" />
          Blood Bank
        </CardTitle>
        <p className="text-muted-foreground">Register as donor or request blood in emergencies</p>
      </CardHeader>
      <CardContent className="text-center py-8">
        <Heart className="h-24 w-24 text-red-500 mx-auto mb-4" />
        <div className="space-y-4">
          <div>
            <p className="font-semibold">Your Blood Group: {patient.bloodGroup}</p>
            <p className="text-sm text-muted-foreground">Location: {patient.place}</p>
          </div>
          <Button 
            variant={isDonor ? "secondary" : "medical"} 
            onClick={() => setIsDonor(!isDonor)}
          >
            {isDonor ? "Registered as Donor" : "Register as Blood Donor"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};