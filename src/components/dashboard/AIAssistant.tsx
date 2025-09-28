import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, User } from "lucide-react";
import { Patient, Doctor } from "@/lib/auth";

interface Message {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface AIAssistantProps {
  patient?: Patient;
  doctor?: Doctor;
}

export const AIAssistant: React.FC<AIAssistantProps> = ({ patient, doctor }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'assistant',
      content: `Hello ${patient?.name || doctor?.name}! I'm your AI health assistant. I can help you with:

• Health recommendations based on your profile
• Symptom analysis and possible causes
• Medication information and interactions
• Lifestyle and wellness tips
• Medical questions and general health guidance

How can I assist you today?`,
      timestamp: new Date(),
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputMessage,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage("");
    setIsTyping(true);

    // Simulate AI response
    setTimeout(() => {
      const aiResponse = generateAIResponse(inputMessage, patient);
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: 'assistant',
        content: aiResponse,
        timestamp: new Date(),
      };

      setMessages(prev => [...prev, assistantMessage]);
      setIsTyping(false);
    }, 2000);
  };

  const generateAIResponse = (query: string, patient?: Patient): string => {
    const lowerQuery = query.toLowerCase();

    // Health recommendations
    if (lowerQuery.includes('recommendation') || lowerQuery.includes('advice')) {
      return `Based on your profile, here are personalized recommendations:

🏃‍♀️ **Physical Activity**: Aim for 30 minutes of moderate exercise daily
💧 **Hydration**: Drink 8-10 glasses of water throughout the day
🥗 **Nutrition**: Include plenty of fruits, vegetables, and lean proteins
😴 **Sleep**: Maintain 7-9 hours of quality sleep each night
🧘‍♀️ **Stress Management**: Practice meditation or deep breathing exercises

${patient?.bloodGroup ? `As someone with blood group ${patient.bloodGroup}, consider iron-rich foods in your diet.` : ''}

Would you like specific advice on any of these areas?`;
    }

    // Symptom analysis
    if (lowerQuery.includes('symptom') || lowerQuery.includes('pain') || lowerQuery.includes('fever')) {
      return `I understand you're experiencing symptoms. While I can provide general information, please remember that serious symptoms require professional medical attention.

**Common symptom patterns:**
• **Fever + Headache**: Could indicate viral infection, stay hydrated and rest
• **Chest pain**: Seek immediate medical attention if severe
• **Persistent cough**: May need respiratory evaluation
• **Abdominal pain**: Location and severity matter for diagnosis

**When to seek immediate care:**
⚠️ Difficulty breathing
⚠️ Severe chest pain
⚠️ High fever (>103°F)
⚠️ Severe abdominal pain

Please consult your healthcare provider for proper diagnosis and treatment. Would you like general wellness tips instead?`;
    }

    // Medication queries
    if (lowerQuery.includes('medicine') || lowerQuery.includes('medication') || lowerQuery.includes('drug')) {
      return `I can provide general medication information:

**Important reminders:**
💊 Take medications as prescribed by your doctor
⏰ Follow the correct timing and dosage
🍽️ Check if medication should be taken with or without food
🚫 Never share prescription medications
💧 Stay hydrated when taking most medications

**Common interactions to be aware of:**
• Antibiotics + Dairy products (may reduce effectiveness)
• Blood thinners + Aspirin (increased bleeding risk)
• Heart medications + Grapefruit (can be dangerous)

${patient?.allergies ? `⚠️ Your recorded allergies: ${patient.allergies}` : ''}

Always consult your pharmacist or doctor before starting new medications. What specific medication information do you need?`;
    }

    // General health query
    if (lowerQuery.includes('health') || lowerQuery.includes('wellness')) {
      return `Here's a comprehensive wellness overview:

**Daily Health Habits:**
🌅 Start your day with hydration and light stretching
🥗 Eat balanced meals with proper portions
🚶‍♀️ Take regular breaks for movement if you have a desk job
🧠 Practice mindfulness or meditation for mental health

**Preventive Care:**
📅 Schedule regular checkups with your primary care physician
🦷 Don't neglect dental health - visit your dentist regularly
👁️ Get regular eye exams
💉 Stay up to date with vaccinations

${patient ? `**Your Profile Summary:**
Blood Group: ${patient.bloodGroup}
Age: ${patient.age} years
${patient.height && patient.weight ? `BMI: ${(patient.weight / Math.pow(patient.height / 100, 2)).toFixed(1)}` : 'Complete your measurements for BMI calculation'}` : ''}

What aspect of your health would you like to focus on?`;
    }

    // Default response
    return `I'm here to help with your health-related questions! I can assist with:

🔍 **Symptom Analysis**: Describe symptoms for possible causes
💊 **Medication Info**: General drug information and interactions  
🏥 **Health Recommendations**: Personalized wellness advice
🍎 **Nutrition Guidance**: Diet and lifestyle suggestions
🏃‍♂️ **Exercise Tips**: Safe workout recommendations

Please ask me about any health topic, and I'll do my best to provide helpful, accurate information. Remember, for serious medical concerns, always consult with a healthcare professional.

What would you like to know more about?`;
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      sendMessage();
    }
  };

  return (
    <Card className="shadow-medical h-[600px] flex flex-col">
      <CardHeader>
        <CardTitle className="text-primary flex items-center gap-2">
          <MessageCircle className="h-5 w-5" />
          AI Health Assistant
        </CardTitle>
        <div className="flex gap-2">
          <Badge variant="secondary">24/7 Available</Badge>
          <Badge variant="outline">HIPAA Compliant</Badge>
        </div>
      </CardHeader>
      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea className="flex-1 p-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex items-start gap-3 ${
                  message.type === 'user' ? 'justify-end' : 'justify-start'
                }`}
              >
                {message.type === 'assistant' && (
                  <div className="p-2 bg-primary-soft rounded-full">
                    <Bot className="h-4 w-4 text-primary" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] p-3 rounded-lg ${
                    message.type === 'user'
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-gray-100'
                  }`}
                >
                  <div className="whitespace-pre-wrap text-sm">{message.content}</div>
                  <div className="text-xs mt-1 opacity-70">
                    {message.timestamp.toLocaleTimeString()}
                  </div>
                </div>
                {message.type === 'user' && (
                  <div className="p-2 bg-primary-soft rounded-full">
                    <User className="h-4 w-4 text-primary" />
                  </div>
                )}
              </div>
            ))}
            {isTyping && (
              <div className="flex items-start gap-3">
                <div className="p-2 bg-primary-soft rounded-full">
                  <Bot className="h-4 w-4 text-primary" />
                </div>
                <div className="bg-gray-100 p-3 rounded-lg">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </ScrollArea>
        <div className="border-t p-4">
          <div className="flex gap-2">
            <Input
              placeholder="Ask me about your health, symptoms, or wellness tips..."
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1"
            />
            <Button 
              onClick={sendMessage} 
              disabled={!inputMessage.trim() || isTyping}
              variant="medical"
              size="sm"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2">
            This AI assistant provides general health information only. For medical emergencies, contact your doctor immediately.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};