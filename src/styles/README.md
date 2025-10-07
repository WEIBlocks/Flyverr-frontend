# Flyverr Color Scheme System

This directory contains the global color scheme system for the Flyverr application.

## Files

- `colors.css` - CSS custom properties and utility classes
- `colors.ts` - TypeScript definitions and utilities
- `README.md` - This documentation file

## Color Palette

### Light Theme

- **Primary Dark**: `#1B1C25` - Main dark color for text, borders, and primary elements
- **Background White**: `#FFFFFF` - Main background color
- **Text Muted**: `#6B7280` - Secondary text color
- **Border**: `#E5E7EB` - Border color
- **Hover**: `#F9FAFB` - Hover state background

### Dark Theme

- **Primary**: `#4f46e5` - Main accent color
- **Background**: `#1f2937` - Main background color
- **Text**: `#f9fafb` - Main text color
- **Text Muted**: `#9CA3AF` - Secondary text color
- **Border**: `#374151` - Border color
- **Hover**: `#374151` - Hover state background

## Usage

### CSS Classes

Use the predefined utility classes:

```html
<!-- Primary elements -->
<div class="bg-flyverr-primary text-white">Primary background</div>
<div class="text-flyverr-primary">Primary text</div>
<div class="border-flyverr-primary">Primary border</div>

<!-- Neutral elements -->
<div class="bg-flyverr-neutral text-flyverr-text">Neutral background</div>
<div class="text-flyverr-text-muted">Muted text</div>

<!-- Hover states -->
<div class="hover:bg-flyverr-hover hover:text-flyverr-primary">
  Hover effect
</div>
```

### Tailwind CSS

Use the Tailwind color system:

```html
<!-- Using Tailwind classes -->
<div class="bg-flyverr-primary text-flyverr-neutral">Primary background</div>
<div class="text-flyverr-text-muted">Muted text</div>
<div class="border-flyverr-border">Border</div>
```

### TypeScript

Use the TypeScript utilities:

```typescript
import { colors, getColor, tailwindClasses } from "@/styles/colors";

// Get color by theme
const primaryColor = getColor("light", "primary"); // '#1B1C25'

// Use predefined classes
const primaryClasses = tailwindClasses.primary; // 'text-flyverr-primary bg-flyverr-primary border-flyverr-primary'
```

## CSS Custom Properties

The system uses CSS custom properties that automatically switch between light and dark themes:

```css
/* These variables change based on the theme */
.my-element {
  background-color: var(--flyverr-primary);
  color: var(--flyverr-text);
  border-color: var(--flyverr-border);
}
```

## Adding New Colors

To add new colors to the system:

1. Add the color to `colors.css` in both `:root` and `.dark` sections
2. Add the color to `colors.ts` in the `colors` object
3. Add utility classes to `colors.css` if needed
4. Update this README with the new color

## Theme Switching

The color scheme automatically switches based on the `dark` class on the HTML element:

```javascript
// Switch to dark theme
document.documentElement.classList.add("dark");

// Switch to light theme
document.documentElement.classList.remove("dark");
```

## Best Practices

1. **Use semantic color names**: Use `flyverr-primary` instead of specific color values
2. **Consistent usage**: Always use the predefined classes and variables
3. **Accessibility**: Ensure sufficient contrast between text and background colors
4. **Future-proofing**: Use the CSS custom properties system for easy theme updates
