import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export default function AdminPage() {
  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <div className="flex flex-col items-center gap-4 rounded-lg border-2 border-dashed p-12 text-center">
        <ShieldAlert className="h-16 w-16 text-destructive" />
        <h2 className="text-2xl font-bold">Admin Area</h2>
        <p className="text-muted-foreground">This section is restricted and currently under construction.</p>
      </div>
    </div>
  );
}
