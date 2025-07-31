import { cn } from "@/lib/utils";
import React from "react";

export default function GridBackgroundDemo() {
  return (
    <div className="relative flex h-screen w-full items-center justify-center bg-white dark:bg-gray-900">
      <div
        className={cn(
          "absolute inset-0 pointer-events-none",
          "[background-size:8px_8px]",
          "[background-image:linear-gradient(to_right,#fafafa_1px,transparent_1px),linear-gradient(to_bottom,#fafafa_1px,transparent_1px)]",
          "dark:[background-image:linear-gradient(to_right,#374151_1px,transparent_1px),linear-gradient(to_bottom,#374151_1px,transparent_1px)]",
        )}
      />
    </div>
  );
}