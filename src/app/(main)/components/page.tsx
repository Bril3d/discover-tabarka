import React from "react";
import AnimatedComponentsDemo from "@/components/examples/animated-components-demo";
import { AnimatedHeader } from "@/components/ui/animated-header";
import { AnimatedButton } from "@/components/ui/animated-button";
import { PageTransition } from "@/components/ui/page-transition";

export default function ComponentsPage() {
  return (
    <PageTransition pageKey="components-page">
      <AnimatedHeader className="px-6">
        <div className="container mx-auto flex items-center justify-between">
          <h1 className="text-xl font-bold">Discover Tabarka</h1>
          <nav className="hidden md:flex items-center space-x-6">
            <a href="#" className="text-sm font-medium hover:text-primary">Home</a>
            <a href="#" className="text-sm font-medium hover:text-primary">About</a>
            <a href="#" className="text-sm font-medium hover:text-primary">Destinations</a>
            <a href="#" className="text-sm font-medium hover:text-primary">Contact</a>
          </nav>
          <AnimatedButton variant="outline" size="sm">
            Sign In
          </AnimatedButton>
        </div>
      </AnimatedHeader>
      <main className="pt-24">
        <AnimatedComponentsDemo />
      </main>
    </PageTransition>
  );
} 