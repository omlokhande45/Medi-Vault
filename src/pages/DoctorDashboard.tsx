import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Doctor } from "@/lib/auth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { MediVaultLogo } from "@/components/MediVaultLogo";
import { 
  Stethoscope, 
  QrCode, 
  Users, 
  MessageCircle, 
  LogOut,
  FileText,
  Calendar,
  Activity
} from "lucide-react";
import { QRScanner } from "@/components/dashboard/QRScanner";
import { PatientRecords } from "@/components/dashboard/PatientRecords";
import { AIAssistant } from "@/components/dashboard/AIAssistant";
import { useNavigate } from "react-router-dom";

const DoctorDashboard = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("scanner");

  const doctor = user as Doctor;

  useEffect(() => {
    if (!user || user.type !== 'doctor') {
      navigate('/login');
      return;
    }
  }, [user, navigate]);

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  if (!doctor) return null;

  return (
    <div className="min-h-screen bg-gradient-soft">
      {/* Header */}
      <header className="bg-white/80 backdrop-blur-md border-b border-primary/20 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <MediVaultLogo size="md" />
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="font-semibold text-primary">Dr. {doctor.name}</p>
                <p className="text-sm text-muted-foreground">{doctor.speciality} • {doctor.hospitalName}</p>
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
          <h1 className="text-3xl font-bold text-primary mb-2">Doctor Dashboard</h1>
          <p className="text-muted-foreground">Access and manage patient records securely.</p>
        </div>

        {/* Quick Stats */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
          <Card className="border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-soft rounded-lg">
                  <Stethoscope className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Speciality</p>
                  <p className="font-semibold">{doctor.speciality}</p>
                </div>
              </div>
            </CardContent>
          </Card>
          
          <Card className="border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-soft rounded-lg">
                  <Users className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Hospital</p>
                  <p className="font-semibold text-sm">{doctor.hospitalName}</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-primary/20">
            <CardContent className="p-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-primary-soft rounded-lg">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-sm text-muted-foreground">Joined</p>
                  <p className="font-semibold text-sm">
                    {new Date(doctor.createdAt).toLocaleDateString()}
                  </p>
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
                  <p className="text-sm text-muted-foreground">Status</p>
                  <p className="font-semibold text-green-600">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Dashboard Tabs */}
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 lg:w-fit">
            <TabsTrigger value="scanner" className="flex items-center gap-2">
              <QrCode className="h-4 w-4" />
              QR Scanner
            </TabsTrigger>
            <TabsTrigger value="records" className="flex items-center gap-2">
              <FileText className="h-4 w-4" />
              Patient Records
            </TabsTrigger>
            <TabsTrigger value="ai-assistant" className="flex items-center gap-2">
              <MessageCircle className="h-4 w-4" />
              AI Assistant
            </TabsTrigger>
          </TabsList>

          <TabsContent value="scanner">
            <QRScanner doctor={doctor} />
          </TabsContent>

          <TabsContent value="records">
            <PatientRecords doctor={doctor} />
          </TabsContent>

          <TabsContent value="ai-assistant">
            <AIAssistant doctor={doctor} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default DoctorDashboard;