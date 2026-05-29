```css
:root {
  color-scheme: light dark;
  /* vars: light values (>1K LOC) */
}
@media (prefers-color-scheme: dark) {
  :root {
    /* vars: dark values (>1K LOC) */
  }
}
[data-theme="dark"] {
  color-scheme: dark; /* lock UA styles to dark */
  /* vars: dark values (>1K LOC repeated!) */
}
```
