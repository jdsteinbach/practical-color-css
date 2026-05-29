#### Normalized Lightness

```css
:root {
  --surface-primary--dark: hsl(
    from var(--surface-primary) h s 20
  );
  --surface-primary--lighten: hsl(
    from var(--surface-primary) h s calc(l + 15)
  );
}
```
