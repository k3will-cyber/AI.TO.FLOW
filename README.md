# Alto Flow OS

This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## 🎨 Design System

This project implements a comprehensive design system based on the [AutoFlow Design Specification](/design-systems/autoflow/DESIGN.md). The design system provides:

- **Color Palette**: Teal-primary, Amber-tertiary, and semantic colors
- **Typography**: Inter type scale using Inter font family with precise sizing
- **Spacing**: 8px baseline grid for consistent spacing
- **Components**: Reusable UI components following atomic design principles
- **Dark Mode**: Built-in support for dark mode (future-ready)

### Design Tokens

Design tokens are available via the `useDesignTokens` hook:

```typescript
import { useDesignTokens } from '@/lib/designTokens';

function MyComponent() {
  const { colors, typography, spacing } = useDesignTokens();
  
  return (
    <div style={{
      color: colors.text.primary,
      fontSize: typography.fontSizes.bodyMD,
      padding: spacing.md
    }}>
      {/* Component content */}
    </div>
  );
}
```

## 🧩 Component Library

The application features a growing library of reusable components organized by atomic design principles:

### Atoms
- `Button` - Primary, secondary, WhatsApp, outline, ghost variants
- `Input` - Text, email, tel, url inputs with label and helper text
- `Textarea` - Multi-line text input
- `Select` - Dropdown selection
- `Label` - Form labels with required indicators
- `Avatar` - User avatar with initials fallback
- `Badge` - Status indicators and tags

### Molecules
- `Card` - Flexible container with variants (default, elevated, outline)
- Form fields with integrated labels and validation

### Organisms
- Header navigation
- Footer with social links
- Hero section with animations
- Diagnostic form section

## 🚀 Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

### Design System Demo

Visit [http://localhost:3000/demo](http://localhost:3000/demo) to see the live style guide and component documentation.

## 📚 Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## 🚢 Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.