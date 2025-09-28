import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { MediVaultLogo } from "@/components/MediVaultLogo";
import { Shield, Users, Smartphone, Heart, Stethoscope, FileText } from "lucide-react";
import heroImage from "@/assets/healthcare-hero.jpg";

const Home = () => {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50 shadow-soft">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <MediVaultLogo size="md" />
          <div className="flex gap-3">
            <Link to="/login">
              <Button variant="ghost" size="lg">Login</Button>
            </Link>
            <Link to="/register">
              <Button variant="medical" size="lg">Register</Button>
            </Link>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4 bg-gradient-soft">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <MediVaultLogo size="lg" className="justify-center mb-8" />
            
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6 leading-tight">
              Your Personal Digital 
              <span className="text-primary block">Health Vault</span>
            </h1>
            
            <p className="text-xl text-muted-foreground mb-12 max-w-2xl mx-auto leading-relaxed">
              Securely store, manage, and share your medical history with QR codes, 
              AI assistance, and advanced OCR technology. Connect patients and doctors 
              in a revolutionary healthcare platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
              <Link to="/register">
                <Button variant="hero" size="xl" className="min-w-48">
                  <Users className="mr-2 h-5 w-5" />
                  Get Started Today
                </Button>
              </Link>
              <Link to="/login">
                <Button variant="outline" size="xl" className="min-w-48">
                  <Shield className="mr-2 h-5 w-5" />
                  Secure Login
                </Button>
              </Link>
            </div>

            <div className="relative rounded-2xl overflow-hidden shadow-medical">
              <img 
                src={heroImage} 
                alt="Healthcare professionals using MediVault platform" 
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-foreground mb-4">
              Revolutionary Healthcare Features
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Experience the future of healthcare with our cutting-edge platform
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="shadow-medical hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="bg-primary-soft rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Smartphone className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">QR Code Sharing</h3>
                <p className="text-muted-foreground">
                  Generate secure QR codes for instant medical history sharing with healthcare providers
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-medical hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="bg-primary-soft rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">AI Health Assistant</h3>
                <p className="text-muted-foreground">
                  Get personalized health recommendations and symptom analysis powered by AI
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-medical hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="bg-primary-soft rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <FileText className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">OCR Prescription Scanning</h3>
                <p className="text-muted-foreground">
                  Convert handwritten prescriptions and medicine labels to digital text instantly
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-medical hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="bg-primary-soft rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Stethoscope className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Doctor Dashboard</h3>
                <p className="text-muted-foreground">
                  Healthcare providers can access, review, and update patient records securely
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-medical hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="bg-primary-soft rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Blood Bank Network</h3>
                <p className="text-muted-foreground">
                  Register as donor or find blood in emergencies with our integrated blood bank
                </p>
              </CardContent>
            </Card>

            <Card className="shadow-medical hover:shadow-glow transition-all duration-300 transform hover:-translate-y-2">
              <CardContent className="p-8 text-center">
                <div className="bg-primary-soft rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
                  <Shield className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-4">Bank-Level Security</h3>
                <p className="text-muted-foreground">
                  Your medical data is protected with enterprise-grade encryption and security
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-primary">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto">
            <h2 className="text-4xl font-bold text-white mb-6">
              Ready to Transform Your Healthcare Experience?
            </h2>
            <p className="text-xl text-white/90 mb-10">
              Join thousands of patients and healthcare providers who trust MediVault 
              for secure, efficient medical record management.
            </p>
            <Link to="/register">
              <Button variant="secondary" size="xl" className="shadow-glow">
                <Users className="mr-2 h-5 w-5" />
                Start Your Health Journey
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-card border-t py-12 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <MediVaultLogo size="md" className="mb-6" />
              <p className="text-muted-foreground">
                Revolutionizing healthcare through secure digital medical record management.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Platform</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><Link to="/register" className="hover:text-primary">Register</Link></li>
                <li><Link to="/login" className="hover:text-primary">Login</Link></li>
                <li><a href="#" className="hover:text-primary">Features</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Support</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">Help Center</a></li>
                <li><a href="#" className="hover:text-primary">Contact Us</a></li>
                <li><a href="#" className="hover:text-primary">Privacy Policy</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-foreground">Company</h4>
              <ul className="space-y-2 text-muted-foreground">
                <li><a href="#" className="hover:text-primary">About Us</a></li>
                <li><a href="#" className="hover:text-primary">Careers</a></li>
                <li><a href="#" className="hover:text-primary">Terms of Service</a></li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-12 pt-8 text-center text-muted-foreground">
            <p>&copy; 2024 MediVault. All rights reserved. Your Personal Digital Health Vault.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;