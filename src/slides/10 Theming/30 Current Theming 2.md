```css
:root {
  color-scheme: light dark;
  /* vars: light values (>1K LOC) */
}
@media (prefers-color-scheme: dark) {
  :root {
    --surface-primary: #111;
    --surface-secondary: #333;
    --text-primary: #eee;
    --text-secondary: #ccc;
    /* expand to >1K LOC… */
  }
}
```
