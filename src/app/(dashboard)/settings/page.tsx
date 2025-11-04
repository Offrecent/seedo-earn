import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Construction } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="flex items-center justify-center rounded-lg border-2 border-dashed p-12 text-center">
      <div className="flex flex-col items-center gap-4">
        <Construction className="h-16 w-16 text-muted-foreground" />
        <h2 className="text-2xl font-bold">Coming Soon</h2>
        <p className="text-muted-foreground">The Settings page is under construction. Check back later!</p>
      </div>
    </div>
  );
}
