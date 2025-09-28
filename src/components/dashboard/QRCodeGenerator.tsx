import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Patient, DataService } from "@/lib/auth";
import { QrCode, Download, RefreshCw } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import QRCode from "qrcode";

interface QRCodeGeneratorProps {
  patient: Patient;
  onReportGenerated: (report: any) => void;
  existingReport: any;
}

export const QRCodeGenerator: React.FC<QRCodeGeneratorProps> = ({ 
  patient, 
  onReportGenerated, 
  existingReport 
}) => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string>("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [healthReport, setHealthReport] = useState<any>(null);

  useEffect(() => {
    if (existingReport) {
      setHealthReport(existingReport);
      generateQRCode(existingReport.qrCode);
    }
  }, [existingReport]);

  const generateQRCode = async (data: string) => {
    try {
      const url = await QRCode.toDataURL(data, {
        width: 300,
        margin: 2,
        color: {
          dark: '#1E90FF',
          light: '#FFFFFF'
        }
      });
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Failed to generate QR code:', error);
    }
  };

  const generateHealthReport = async () => {
    setIsGenerating(true);
    
    try {
      // Simulate AI analysis
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const report = {
        patientId: patient.id,
        generatedAt: new Date().toISOString(),
        summary: generateHealthSummary(),
        recommendations: generateRecommendations(),
        riskFactors: generateRiskFactors(),
        qrCode: `medivault://patient/${patient.id}/report/${Date.now()}`,
      };

      // Save report
      DataService.savePatientReport(patient.id, report);
      
      // Generate QR Code
      await generateQRCode(report.qrCode);
      
      setHealthReport(report);
      onReportGenerated(report);
      
      toast({
        title: "Report Generated",
        description: "Your health report and QR code have been generated successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate report. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const generateHealthSummary = () => {
    const bmi = patient.weight && patient.height ? 
      (patient.weight / Math.pow(patient.height / 100, 2)).toFixed(1) : null;
    
    return {
      basicInfo: {
        name: patient.name,
        age: patient.age,
        bloodGroup: patient.bloodGroup,
        bmi: bmi
      },
      vitals: {
        height: patient.height,
        weight: patient.weight,
        bloodPressure: patient.bloodPressure,
        spo2: patient.spo2
      },
      overallHealth: bmi ? 
        (parseFloat(bmi) < 18.5 ? "Underweight" : 
         parseFloat(bmi) < 25 ? "Normal" : 
         parseFloat(bmi) < 30 ? "Overweight" : "Obese") : "Assessment Pending"
    };
  };

  const generateRecommendations = () => {
    const recommendations = [];
    
    if (!patient.height || !patient.weight) {
      recommendations.push("Complete your physical measurements for better health assessment");
    }
    
    if (!patient.sleepSchedule) {
      recommendations.push("Maintain 7-9 hours of sleep for optimal health");
    }
    
    recommendations.push("Drink 8-10 glasses of water daily");
    recommendations.push("Engage in 30 minutes of physical activity");
    recommendations.push("Schedule regular health checkups");
    
    return recommendations;
  };

  const generateRiskFactors = () => {
    const risks = [];
    
    if (patient.allergies) {
      risks.push(`Allergies: ${patient.allergies}`);
    }
    
    if (patient.medicalHistory) {
      risks.push(`Medical History: ${patient.medicalHistory}`);
    }
    
    return risks;
  };

  const downloadQRCode = () => {
    if (!qrCodeUrl) return;
    
    const link = document.createElement('a');
    link.download = `medivault-qr-${patient.name.replace(/\s+/g, '-')}.png`;
    link.href = qrCodeUrl;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast({
      title: "QR Code Downloaded",
      description: "Your QR code has been saved to your downloads.",
    });
  };

  return (
    <div className="space-y-6">
      {/* Generate Report Section */}
      <Card className="shadow-medical">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <QrCode className="h-5 w-5" />
            Health Report & QR Code
          </CardTitle>
          <p className="text-muted-foreground">
            Generate your comprehensive health report and secure QR code for sharing with healthcare providers.
          </p>
        </CardHeader>
        <CardContent className="space-y-4">
          {!healthReport ? (
            <div className="text-center py-8">
              <QrCode className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No Report Generated Yet</h3>
              <p className="text-muted-foreground mb-6">
                Generate your personalized health report to create a secure QR code.
              </p>
              <Button 
                onClick={generateHealthReport} 
                disabled={isGenerating}
                size="lg"
                variant="medical"
                className="gap-2"
              >
                {isGenerating ? (
                  <>
                    <RefreshCw className="h-4 w-4 animate-spin" />
                    Generating Report...
                  </>
                ) : (
                  <>
                    <QrCode className="h-4 w-4" />
                    Generate Health Report
                  </>
                )}
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {/* QR Code Display */}
              <div className="text-center">
                <h3 className="text-lg font-semibold mb-4">Your Secure QR Code</h3>
                {qrCodeUrl && (
                  <div className="bg-white p-4 rounded-lg border-2 border-primary/20 inline-block">
                    <img src={qrCodeUrl} alt="Health QR Code" className="max-w-full" />
                  </div>
                )}
                <div className="mt-4 space-y-2">
                  <Button onClick={downloadQRCode} variant="outline" size="sm" className="gap-2">
                    <Download className="h-4 w-4" />
                    Download QR Code
                  </Button>
                  <Button onClick={generateHealthReport} variant="ghost" size="sm" className="gap-2">
                    <RefreshCw className="h-4 w-4" />
                    Regenerate
                  </Button>
                </div>
              </div>

              {/* Health Summary */}
              <div>
                <h3 className="text-lg font-semibold mb-4">Health Summary</h3>
                <div className="space-y-4">
                  <div className="p-4 bg-primary-soft rounded-lg">
                    <div className="flex justify-between items-center mb-2">
                      <span className="font-medium">Overall Health Status</span>
                      <Badge variant={healthReport.summary.overallHealth === "Normal" ? "default" : "secondary"}>
                        {healthReport.summary.overallHealth}
                      </Badge>
                    </div>
                    {healthReport.summary.basicInfo.bmi && (
                      <p className="text-sm text-muted-foreground">
                        BMI: {healthReport.summary.basicInfo.bmi}
                      </p>
                    )}
                  </div>

                  <div>
                    <h4 className="font-medium mb-2">Key Recommendations</h4>
                    <ul className="text-sm space-y-1">
                      {healthReport.recommendations.slice(0, 3).map((rec: string, index: number) => (
                        <li key={index} className="flex items-start gap-2">
                          <span className="text-primary">•</span>
                          <span>{rec}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="text-xs text-muted-foreground">
                    Generated: {new Date(healthReport.generatedAt).toLocaleString()}
                  </div>
                </div>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};