#### Tints

```css
:root {
  --surface-primary--coolest: rgb(
    from var(--surface-primary) r g 255
  );
  --surface-primary--warmer: rgb(
    from light-dark(#eee, #111) calc(r + 150) g b
  );
}
```
