import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Scan } from "lucide-react";
import { Doctor } from "@/lib/auth";

interface QRScannerProps {
  doctor: Doctor;
}

export const QRScanner: React.FC<QRScannerProps> = ({ doctor }) => {
  const [scanResult, setScanResult] = useState<string>("");
  const [isScanning, setIsScanning] = useState(false);

  const simulateScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setScanResult(`medivault://patient/12345/report/${Date.now()}`);
      setIsScanning(false);
    }, 2000);
  };

  return (
    <Card className="shadow-medical">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <QrCode className="h-5 w-5" />
          QR Code Scanner
        </CardTitle>
        <p className="text-muted-foreground">Scan patient QR codes to access their medical records</p>
      </CardHeader>
      <CardContent className="text-center py-8">
        <QrCode className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
        <Button onClick={simulateScan} disabled={isScanning} variant="medical" size="lg" className="gap-2">
          {isScanning ? "Scanning..." : <><Scan className="h-4 w-4" />Start Scanner</>}
        </Button>
        {scanResult && (
          <div className="mt-4 p-4 bg-green-50 rounded-lg">
            <p className="text-green-700">Scan successful! Patient record loaded.</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
};