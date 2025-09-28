import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MediVaultLogo } from "@/components/MediVaultLogo";
import { UserCheck, Stethoscope, ArrowLeft } from "lucide-react";
import { PatientRegistrationForm } from "@/components/forms/PatientRegistrationForm";
import { DoctorRegistrationForm } from "@/components/forms/DoctorRegistrationForm";

const Register = () => {
  const [userType, setUserType] = useState<"patient" | "doctor" | null>(null);
  const navigate = useNavigate();

  if (!userType) {
    return (
      <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <Card className="shadow-medical">
            <CardHeader className="text-center pb-8">
              <MediVaultLogo size="lg" className="justify-center mb-4" />
              <CardTitle className="text-2xl font-bold">Choose Your Account Type</CardTitle>
              <p className="text-muted-foreground">
                Select how you'll be using MediVault
              </p>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                variant="medical" 
                size="xl" 
                className="w-full h-20 flex-col gap-2"
                onClick={() => setUserType("patient")}
              >
                <UserCheck className="h-8 w-8" />
                <span className="text-lg font-semibold">Register as Patient</span>
                <span className="text-sm opacity-90">Manage your health records</span>
              </Button>

              <Button 
                variant="soft" 
                size="xl" 
                className="w-full h-20 flex-col gap-2"
                onClick={() => setUserType("doctor")}
              >
                <Stethoscope className="h-8 w-8" />
                <span className="text-lg font-semibold">Register as Doctor</span>
                <span className="text-sm opacity-90">Access patient records</span>
              </Button>

              <div className="text-center pt-4">
                <Link to="/" className="text-muted-foreground hover:text-primary inline-flex items-center gap-2">
                  <ArrowLeft className="h-4 w-4" />
                  Back to Home
                </Link>
              </div>

              <div className="text-center pt-2">
                <p className="text-muted-foreground">
                  Already have an account?{" "}
                  <Link to="/login" className="text-primary hover:underline font-medium">
                    Sign in here
                  </Link>
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-soft flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Card className="shadow-medical">
          <CardHeader className="text-center">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => setUserType(null)}
              className="absolute top-4 left-4"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back
            </Button>
            <MediVaultLogo size="md" className="justify-center mb-4" />
            <CardTitle className="text-2xl font-bold">
              {userType === "patient" ? "Patient Registration" : "Doctor Registration"}
            </CardTitle>
            <p className="text-muted-foreground">
              {userType === "patient" 
                ? "Create your secure health vault" 
                : "Join our healthcare provider network"}
            </p>
          </CardHeader>
          <CardContent>
            {userType === "patient" ? (
              <PatientRegistrationForm onSuccess={() => navigate("/dashboard")} />
            ) : (
              <DoctorRegistrationForm onSuccess={() => navigate("/dashboard")} />
            )}

            <div className="text-center pt-6">
              <p className="text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary hover:underline font-medium">
                  Sign in here
                </Link>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Register;