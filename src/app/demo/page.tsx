"use client";

import { useState } from "react";
import { Button, Input, Label, Textarea, Avatar, Badge } from "@/components/atoms";
import { useDesignTokens } from "@/lib/designTokens";

export default function DemoPage() {
  const { colors, typography, spacing, radius } = useDesignTokens();
  const [value, setValue] = useState("");
  const [textareaValue, setTextareaValue] = useState("");
  const [selectValue, setSelectValue] = useState("");

  return (
    <div className="min-h-screen bg-background text-text">
      <header className="container mx-auto py-8">
        <h1 className="text-text-xl font-bold mb-6">Design System Demo</h1>
        <p className="text-text-lg text-text-muted">
          Living style guide showcasing the Alto Flow OS design system components
        </p>
      </header>

      <main className="container mx-auto px-4 pb-12">
        {/* Color Palette */}
        <section className="mb-16">
          <h2 className="text-text-lg font-semibold mb-4">Color Palette</h2>
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <h3 className="font-medium">Primary</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-md" style={{ backgroundColor: colors.primary }}></div>
                <span className="text-text-sm font-mono">{colors.primary}</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Secondary</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-md" style={{ backgroundColor: colors.secondary }}></div>
                <span className="text-text-sm font-mono">{colors.secondary}</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Tertiary</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-md" style={{ backgroundColor: colors.tertiary }}></div>
                <span className="text-text-sm font-mono">{colors.tertiary}</span>
              </div>
            </div>
            <div className="space-y-2">
              <h3 className="font-medium">Text</h3>
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-md" style={{ backgroundColor: colors.text }}></div>
                <span className="text-text-sm font-mono">{colors.text}</span>
              </div>
            </div>
          </div>
        </section>

        {/* Typography */}
        <section className="mb-16">
          <h2 className="text-text-lg font-semibold mb-4">Typography</h2>
          <div className="space-y-4">
            <p className="text-text-display-xl font-bold">Display XL</p>
            <p className="text-text-h1 font-bold">H1</p>
            <p className="text-text-h2 font-semibold">H2</p>
            <p className="text-text-h3 font-medium">H3</p>
            <p className="text-text-body-lg">Body LG</p>
            <p className="text-text-body-md">Body MD</p>
            <p className="text-text-body-sm">Body SM</p>
            <p className="text-text-mono">Mono</p>
            <p className="text-text-label-caps">LABEL CAPS</p>
          </div>
        </section>

        {/* Buttons */}
        <section className="mb-16">
          <h2 className="text-text-lg font-semibold mb-4">Buttons</h2>
          <div className="flex flex-wrap gap-4">
            <Button variant="primary">Primary</Button>
            <Button variant="secondary">Secondary</Button>
            <Button variant="whatsapp">WhatsApp</Button>
            <Button variant="outline">Outline</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="destructive">Destructive</Button>
            <Button variant="primary" disabled>
              Disabled
            </Button>
            <Button variant="primary" size="sm">
              Small
            </Button>
            <Button variant="primary" size="lg">
              Large
            </Button>
          </div>
        </section>

        {/* Inputs */}
        <section className="mb-16">
          <h2 className="text-text-lg font-semibold mb-4">Inputs</h2>
          <div className="space-y-6">
            <div className="space-y-3">
              <Label htmlFor="demo-input">Text Input</Label>
              <Input
                id="demo-input"
                placeholder="Enter text..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
                startIcon={<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-text-muted"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="demo-email">Email Input</Label>
              <Input
                id="demo-email"
                type="email"
                placeholder="Enter email..."
                value={value}
                onChange={(e) => setValue(e.target.value)}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="demo-textarea">Textarea</Label>
              <Textarea
                value={textareaValue}
                onChange={(e) => setTextareaValue(e.target.value)}
                placeholder="Enter longer text..."
                rows={4}
              />
            </div>

            <div className="space-y-3">
              <Label htmlFor="demo-select">Select</Label>
              <select
                id="demo-select"
                value={selectValue}
                onChange={(e) => setSelectValue(e.target.value)}
                className="block w-full pl-9 pr-4 py-3 text-text-sm font-medium text-text bg-background border border-border
                  rounded-xl focus:ring-2 focus-ring-primary/20 focus:border-primary
                  disabled:opacity-50 disabled:cursor-not-allowed
                  transition-all duration-200 appearance-none
                  bg-[url('data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' fill=\'none\' viewBox=\'0 0 24 24\' stroke=\'%235A6B72\'><path d=\'M19 9l-7 7-7-7\'/></svg>')_right-3_center_no-repeat]"
              >
                <option value="">Select an option</option>
                <option value="option1">Option 1</option>
                <option value="option2">Option 2</option>
                <option value="option3">Option 3</option>
              </select>
            </div>
          </div>
        </section>

        {/* Avatars */}
        <section className="mb-16">
          <h2 className="text-text-lg font-semibold mb-4">Avatars</h2>
          <div className="flex flex-wrap gap-4">
            <Avatar name="João Silva" size="xs" />
            <Avatar name="Maria Santos" size="sm" />
            <Avatar name="Pedro Alves" size="md" />
            <Avatar name="Ana Costa" size="lg" />
            <Avatar name="Rafa Lima" size="xl" />
            <Avatar src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100" alt="Random person" size="md" />
            <Avatar name="TC" shape="square" size="md" />
          </div>
        </section>

        {/* Badges */}
        <section className="mb-16">
          <h2 className="text-text-lg font-semibold mb-4">Badges</h2>
          <div className="flex flex-wrap gap-3">
            <Badge variant="primary">Primary</Badge>
            <Badge variant="secondary">Secondary</Badge>
            <Badge variant="success">Success</Badge>
            <Badge variant="warning">Warning</Badge>
            <Badge variant="destructive">Destructive</Badge>
            <Badge variant="ghost">Ghost</Badge>
          </div>
        </section>

        {/* Spacing Scale */}
        <section className="mb-16">
          <h2 className="text-text-lg font-semibold mb-4">Spacing Scale (8px baseline)</h2>
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <span className="w-20 text-text-xs font-mono">4px:</span>
              <div className="h-0.5 w-16 bg-text/20" style={{ marginBottom: '4px' }}></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-20 text-text-xs font-mono">8px:</span>
              <div className="h-0.5 w-16 bg-text/20" style={{ marginBottom: '8px' }}></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-20 text-text-xs font-mono">16px:</span>
              <div className="h-0.5 w-16 bg-text/20" style={{ marginBottom: '16px' }}></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-20 text-text-xs font-mono">24px:</span>
              <div className="h-0.5 w-16 bg-text/20" style={{ marginBottom: '24px' }}></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-20 text-text-xs font-mono">32px:</span>
              <div className="h-0.5 w-16 bg-text/20" style={{ marginBottom: '32px' }}></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-20 text-text-xs font-mono">48px:</span>
              <div className="h-0.5 w-16 bg-text/20" style={{ marginBottom: '48px' }}></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-20 text-text-xs font-mono">72px:</span>
              <div className="h-0.5 w-16 bg-text/20" style={{ marginBottom: '72px' }}></div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-20 text-text-xs font-mono">96px:</span>
              <div className="h-0.5 w-16 bg-text/20" style={{ marginBottom: '96px' }}></div>
            </div>
          </div>
        </section>

        {/* Border Radius */}
        <section className="mb-16">
          <h2 className="text-text-lg font-semibold mb-4">Border Radius</h2>
          <div className="flex flex-wrap gap-4">
            <div className="w-16 h-16 bg-text/20 rounded-xs">xs</div>
            <div className="w-16 h-16 bg-text/20 rounded-sm">sm</div>
            <div className="w-16 h-16 bg-text/20 rounded-md">md</div>
            <div className="w-16 h-16 bg-text/20 rounded-lg">lg</div>
            <div className="w-16 h-16 bg-text/20 rounded-xl">xl</div>
            <div className="w-16 h-16 bg-text/20 rounded-full">full</div>
          </div>
        </section>
      </main>
    </div>
  );
}