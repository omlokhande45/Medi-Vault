import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Patient, DataService } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { MediVaultLogo } from "@/components/MediVaultLogo";
import { 
  User, 
  Heart, 
  QrCode, 
  Upload, 
  MessageCircle, 
  Droplets, 
  LogOut,
  Activity,
  FileText,
  Camera
} from "lucide-react";
import { ProfileForm } from "@/components/dashboard/ProfileForm";
import { QRCodeGenerator } from "@/components/dashboard/QRCodeGenerator";
import { OCRUpload } from "@/components/dashboard/OCRUpload";
import { AIAssistant } from "@/components/dashboard/AIAssistant";
import { BloodBank } from "@/components/dashboard/BloodBank";
import { useNavigate } from "react-router-dom";

const PatientDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("profile");
  const [patientReport, setPatientReport] = useState<any>(null);

  const patient = user as Patient;

  useEffect(() => {
    if (!user || user.type !== 'patient') {
      navigate('/login');
      return;
    }

    // Load existing patient report
    const report = DataService.getPatientReport(user.id);
    setPatientReport(report);
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleReportGenerated = (report: any) => {
    setPatientReport(report);
  };

  if (!patient) return null;

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <MediVaultLogo size="md" />
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-primary">{patient.name}</p>
                <p className="text-sm text-muted-foreground">Patient ID: {patient.id}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-primary mb-2">Welcome back, {patient.name}!</h1>
          <p className="text-muted-foreground">Manage your health records and stay on top of your wellness journey.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-soft rounded-lg">
                  <Heart className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Blood Group</p>
                  <p className="font-semibold">{patient.bloodGroup}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-soft rounded-lg">
                  <Activity className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Age</p>
                  <p className="font-semibold">{patient.age} years</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-soft rounded-lg">
                  <QrCode className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">QR Status</p>
                  <Badge variant={patientReport ? "default" : "secondary"}>
                    {patientReport ? "Generated" : "Pending"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-soft rounded-lg">
                  <Droplets className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Donor Status</p>
                  <Badge variant={patient.isDonor ? "default" : "secondary"}>
                    {patient.isDonor ? "Active" : "Not Registered"}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 lg:w-fit">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="qrcode" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              QR Code
            </TabsTrigger>
            <TabsTrigger value="documents" className="flex items-center gap-2">
              <Upload className="h-4 w-4" />
              Documents
            </TabsTrigger>
            <TabsTrigger value="ai-assistant" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
            <TabsTrigger value="blood-bank" className="flex items-center gap-2">
              <Droplets className="h-4 w-4" />
              Blood Bank
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <ProfileForm patient={patient} />
          </TabsContent>

          <TabsContent value="qrcode">
            <QRCodeGenerator 
              patient={patient} 
              onReportGenerated={handleReportGenerated}
              existingReport={patientReport}
            />
          </TabsContent>

          <TabsContent value="documents">
            <OCRUpload />
          </TabsContent>

          <TabsContent value="ai-assistant">
            <AIAssistant patient={patient} />
          </TabsContent>

          <TabsContent value="blood-bank">
            <BloodBank patient={patient} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default PatientDashboard;