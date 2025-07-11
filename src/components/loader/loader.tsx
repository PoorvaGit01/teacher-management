import React from "react";
import { Loader2 } from "lucide-react"; 
import { cn } from "@/lib/utils"; 

const Loader = ({
  message = "Loading...",
  className = "",
  size = 48,
  fullScreen = true,
}) => {
  return (
    <div
      className={cn(
        "z-50 flex flex-col items-center justify-center gap-4",
        fullScreen
          ? "fixed inset-0 backdrop-blur-sm bg-background/70"
          : "absolute top-0 left-0 w-full h-full backdrop-blur-sm bg-background/70",
        className
      )}
    >
      <Loader2
        className="animate-spin text-muted-foreground"
        size={size}
        strokeWidth={2.5}
      />
      <p className="text-sm text-muted-foreground">{message}</p>
    </div>
  );
};

export default Loader;
