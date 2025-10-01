"use client";

import React from "react";

/**
 * Test component to verify the new color scheme is working
 * This component can be temporarily added to any page to test colors
 */
export default function ColorSchemeTest() {
  return (
    <div className="p-8 space-y-4">
      <h2 className="text-2xl font-bold text-flyverr-primary mb-6">
        Color Scheme Test
      </h2>

      {/* Primary Colors */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-flyverr-text">
          Primary Colors
        </h3>
        <div className="flex gap-4">
          <div className="bg-flyverr-primary text-white p-4 rounded">
            Primary Background
          </div>
          <div className="text-flyverr-primary p-4 border border-flyverr-primary rounded">
            Primary Text & Border
          </div>
        </div>
      </div>

      {/* Neutral Colors */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-flyverr-text">
          Neutral Colors
        </h3>
        <div className="flex gap-4">
          <div className="bg-flyverr-neutral text-flyverr-text p-4 border border-flyverr-border rounded">
            Neutral Background
          </div>
          <div className="text-flyverr-text-muted p-4 border border-flyverr-border rounded">
            Muted Text
          </div>
        </div>
      </div>

      {/* Hover States */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-flyverr-text">
          Hover States
        </h3>
        <div className="flex gap-4">
          <button className="bg-flyverr-primary text-white px-4 py-2 rounded hover:bg-flyverr-hover hover:text-flyverr-primary transition-colors">
            Primary Button
          </button>
          <button className="text-flyverr-primary px-4 py-2 border border-flyverr-primary rounded hover:bg-flyverr-hover transition-colors">
            Secondary Button
          </button>
        </div>
      </div>

      {/* Tailwind Classes */}
      <div className="space-y-2">
        <h3 className="text-lg font-semibold text-flyverr-text">
          Tailwind Classes
        </h3>
        <div className="flex gap-4">
          <div className="bg-flyverr-primary text-flyverr-neutral p-4 rounded">
            bg-flyverr-primary + text-flyverr-neutral
          </div>
          <div className="text-flyverr-text-muted border-flyverr-border border p-4 rounded">
            text-flyverr-text-muted + border-flyverr-border
          </div>
        </div>
      </div>
    </div>
  );
}
