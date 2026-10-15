```css
:root {
  --input-border: var(--base-border);
}

@media (prefers-contrast: more) and (forced-colors: none) {
  :root {
    --input-border: color-mix(
      in oklch,
      var(--base-border) 75%,
      CanvasText
    );
  }
}
```
