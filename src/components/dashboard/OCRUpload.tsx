import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Upload, FileText, Pill, Camera } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export const OCRUpload: React.FC = () => {
  const [selectedFiles, setSelectedFiles] = useState<FileList | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [extractedText, setExtractedText] = useState<string>("");

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      setSelectedFiles(files);
    }
  };

  const processDocuments = async () => {
    if (!selectedFiles || selectedFiles.length === 0) {
      toast({
        title: "No Files Selected",
        description: "Please select files to process.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);
    
    try {
      // Simulate OCR processing
      await new Promise(resolve => setTimeout(resolve, 3000));
      
      // Mock extracted text based on file type
      const mockText = generateMockOCRText(selectedFiles[0].name);
      setExtractedText(mockText);
      
      toast({
        title: "OCR Processing Complete",
        description: `Successfully extracted text from ${selectedFiles.length} document(s).`,
      });
    } catch (error) {
      toast({
        title: "Processing Error",
        description: "Failed to process documents. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const generateMockOCRText = (fileName: string): string => {
    const isRx = fileName.toLowerCase().includes('rx') || fileName.toLowerCase().includes('prescription');
    const isMedicine = fileName.toLowerCase().includes('med') || fileName.toLowerCase().includes('pill');
    
    if (isRx) {
      return `PRESCRIPTION

Dr. Sarah Johnson, MD
Internal Medicine
City General Hospital

Patient: John Doe
Date: ${new Date().toLocaleDateString()}

Rx:
1. Amoxicillin 500mg
   Take 1 tablet three times daily with food
   Duration: 7 days

2. Ibuprofen 400mg
   Take 1 tablet as needed for pain
   Maximum 3 tablets per day

3. Multivitamin
   Take 1 tablet daily with breakfast

Follow-up in 1 week

Dr. Sarah Johnson
License: MD12345`;
    } else if (isMedicine) {
      return `MEDICINE INFORMATION

Product Name: Paracetamol 500mg
Manufacturer: PharmaCorp Ltd.
Batch No: PC2024001
Exp. Date: 12/2025

Active Ingredient: Paracetamol 500mg
Excipients: Microcrystalline cellulose, Starch

Indications: Pain relief, Fever reduction
Dosage: Adults - 1-2 tablets every 6-8 hours
Maximum daily dose: 8 tablets

Storage: Store below 30°C in dry place
Keep out of reach of children

MRP: ₹45.00`;
    } else {
      return `MEDICAL REPORT

Patient Information:
Name: John Doe
Age: 32 years
Date of Visit: ${new Date().toLocaleDateString()}

Chief Complaint: Regular health checkup

Vital Signs:
- Blood Pressure: 120/80 mmHg
- Temperature: 98.6°F
- Pulse: 72 bpm
- Weight: 70 kg
- Height: 175 cm

Physical Examination:
General appearance: Well-developed, well-nourished
Heart: Regular rate and rhythm
Lungs: Clear to auscultation
Abdomen: Soft, non-tender

Assessment: Patient in good health
Plan: Continue current lifestyle, return in 6 months for routine follow-up

Dr. Michael Smith, MD`;
    }
  };

  return (
    <div className="space-y-6">
      <Card className="shadow-medical">
        <CardHeader>
          <CardTitle className="text-primary flex items-center gap-2">
            <FileText className="h-5 w-5" />
            Document Scanner & OCR
          </CardTitle>
          <p className="text-muted-foreground">
            Upload prescriptions, medicine covers, or medical documents to extract and digitize text.
          </p>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="prescription" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="prescription" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                Prescriptions
              </TabsTrigger>
              <TabsTrigger value="medicine" className="flex items-center gap-2">
                <Pill className="h-4 w-4" />
                Medicine Covers
              </TabsTrigger>
            </TabsList>

            <TabsContent value="prescription" className="space-y-4">
              <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center">
                <Upload className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Upload Prescription Documents</h3>
                <p className="text-muted-foreground mb-4">
                  Upload handwritten or printed prescriptions to convert to readable text
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*,.pdf"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="prescription-upload"
                />
                <label htmlFor="prescription-upload">
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <span>
                      <Camera className="h-4 w-4" />
                      Choose Files
                    </span>
                  </Button>
                </label>
              </div>
            </TabsContent>

            <TabsContent value="medicine" className="space-y-4">
              <div className="border-2 border-dashed border-primary/30 rounded-lg p-8 text-center">
                <Pill className="h-12 w-12 text-primary mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Scan Medicine Covers</h3>
                <p className="text-muted-foreground mb-4">
                  Upload medicine box or bottle images to extract product information
                </p>
                <input
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={handleFileUpload}
                  className="hidden"
                  id="medicine-upload"
                />
                <label htmlFor="medicine-upload">
                  <Button asChild variant="outline" size="lg" className="gap-2">
                    <span>
                      <Camera className="h-4 w-4" />
                      Choose Images
                    </span>
                  </Button>
                </label>
              </div>
            </TabsContent>
          </Tabs>

          {selectedFiles && selectedFiles.length > 0 && (
            <div className="mt-6 p-4 bg-primary-soft rounded-lg">
              <h4 className="font-medium mb-2">Selected Files:</h4>
              <ul className="text-sm space-y-1 mb-4">
                {Array.from(selectedFiles).map((file, index) => (
                  <li key={index} className="flex items-center gap-2">
                    <FileText className="h-4 w-4" />
                    {file.name}
                  </li>
                ))}
              </ul>
              <Button 
                onClick={processDocuments} 
                disabled={isProcessing}
                variant="medical"
                className="gap-2"
              >
                {isProcessing ? (
                  <>
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    Processing...
                  </>
                ) : (
                  <>
                    <FileText className="h-4 w-4" />
                    Extract Text
                  </>
                )}
              </Button>
            </div>
          )}

          {extractedText && (
            <Card className="mt-6 border-green-200">
              <CardHeader>
                <CardTitle className="text-green-700 flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  Extracted Text
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="bg-gray-50 p-4 rounded-lg font-mono text-sm whitespace-pre-wrap max-h-64 overflow-y-auto">
                  {extractedText}
                </div>
                <div className="mt-4 flex gap-2">
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => navigator.clipboard.writeText(extractedText)}
                  >
                    Copy Text
                  </Button>
                  <Button variant="outline" size="sm">
                    Save to Records
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
        </CardContent>
      </Card>
    </div>
  );
};