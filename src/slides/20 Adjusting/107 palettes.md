```css
:root {
  --start: dodgerblue;

  --primary: hsl(
    from var(--start) h s l
  );
  --secondary: hsl(
    from var(--start) calc(h + 120) 67 33
  );
  --tertiary: hsl(
    from var(--start) calc(h + 240) 67 33
  );
}
```
