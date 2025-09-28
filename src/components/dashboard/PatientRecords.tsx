import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";
import { Doctor } from "@/lib/auth";

interface PatientRecordsProps {
  doctor: Doctor;
}

export const PatientRecords: React.FC<PatientRecordsProps> = ({ doctor }) => {
  return (
    <Card className="shadow-medical">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <FileText className="h-5 w-5" />
          Patient Records
        </CardTitle>
        <p className="text-muted-foreground">Access and manage patient medical records</p>
      </CardHeader>
      <CardContent className="text-center py-8">
        <FileText className="h-24 w-24 text-muted-foreground mx-auto mb-4" />
        <p>No patient records accessed yet. Scan a patient QR code to view records.</p>
      </CardContent>
    </Card>
  );
};