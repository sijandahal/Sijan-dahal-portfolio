// components/LoaderLogic.tsx
"use client";

import { useState, useEffect, ReactNode } from "react";
import Loader from "./Loader";

interface LoaderComponentProps {
  children: ReactNode;
}

export default function LoaderComponent({ children }: LoaderComponentProps) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsLoading(false), 3000); // Adjust timeout as needed
  }, []);

  if (isLoading) return <Loader />;

  return <>{children}</>;
}
