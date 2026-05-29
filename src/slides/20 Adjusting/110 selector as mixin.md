```css
.button {
  --button-color: var(--blue);

  color: hsl(from var(--button-color) h s calc(l - 15));
  border-color: var(--button-color);
  background: hsl(from var(--button-color) h s 90);
}
.button:hover {
  color: hsl(from var(--button-color) h s calc(l - 25));
  border-color: hsl(
    from var(--button-color) h s calc(l - 15)
  );
  background: hsl(from var(--button-color) h s 80);
}
```
