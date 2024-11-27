"use client"

import MainLayout from "@/components/layout/main-layout";
import React from "react";


export default function Layout({ children }: { children: React.ReactNode }) {
  return <MainLayout>{children}</MainLayout>;
}
