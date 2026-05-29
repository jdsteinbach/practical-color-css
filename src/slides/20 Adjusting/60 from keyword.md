### CSS Relative Colors

```css
:root {
  --red: #f00;
}

.button.red {
  background: var(--red);
}

.button.red:hover {
  background: rgb(from var(--red) r, g, b, 0.8);
}
```
