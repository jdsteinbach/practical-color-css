```css
:root,
[data-theme="light"] {
  color-scheme: light dark;
  /* vars: light values (>1K LOC) */
}
[data-theme="light"] {
  color-scheme: light; /* lock UA styles to light */
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

<div class="fragment noper">
  <svg role="presentation" aria-label="Nope" xmlns="http://www.w3.org/2000/svg" viewbox="0 0 16 16" focusable="false">
    <circle stroke="red" stroke-width="2" fill="none" cy="8" cx="8" r="7"/>
    <path stroke="red" stroke-width="2" fill="none" d="M13 3L3 13"/>
  </svg>
</div>
