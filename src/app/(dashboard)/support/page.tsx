import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MessageSquarePlus } from "lucide-react";

export default function SupportPage() {
  return (
    <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
      <div className="flex flex-col items-center gap-4">
        <MessageSquarePlus className="h-16 w-16 text-muted-foreground" />
        <h2 className="text-2xl font-bold">AI Support</h2>
        <p className="text-muted-foreground">
            Please use the floating support widget at the bottom-right of your screen for assistance.
        </p>
      </div>
    </div>
  );
}
