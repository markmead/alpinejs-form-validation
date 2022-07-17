# Alpine JS Form Validation

✅ Alpine JS plugin that prevents your form getting unwanted submissions through the use of an image puzzle

### [Try it out on CodePen](https://codepen.io/markmead/full/zYWNmwZ)

## Example 👀

```html
<form x-data="{ name: '', age: '', bio: '', awesome: '' }">
  <div
    x-data="{ required: false }"
    x-on:error="required = !$json($event.detail).required"
  >
    <input type="text" x-model="name" x-validation.required="name" />

    <span x-show="required">Need to pass a name</span>
  </div>

  <div
    x-data="{ min: false, max: false }"
    x-on:error="
      min = !$json($event.detail).min
      max = !$json($event.detail).max
    "
  >
    <input type="number" x-model="age" x-validation.min.18.max.24="age" />

    <span x-show="min">Must be at least 18 years old</span>

    <span x-show="max">Can't be older than 24 years old</span>
  </div>

  <div
    x-data="{ min: false, max: false }"
    x-on:error="
      min = !$json($event.detail).minLength
      max = !$json($event.detail).maxLength
    "
  >
    <textarea
      x-model="bio"
      x-validation.min:length.10.max:length.50="bio"
    ></textarea>

    <span x-show="min">Must be at least 10 characters</span>

    <span x-show="max">Can't be more than 50 characters</span>
  </div>

  <div
    x-data="{ checked: false }"
    x-on:error="checked = !$json($event.detail).checked"
  >
    <input
      type="checkbox"
      x-model="awesome"
      value="true"
      x-validation.checked="awesome"
    />

    <span x-show="checked">Need to check this</span>
  </div>

  <button> Submit </button>
</form>
```

### Styling

You can style inputs with the the following HTML attribute.

```css
[x-validation-valid='false'] {
  outline-color: red;
}

[x-validation-valid='true'] {
  outline-color: green;
}
```

## Install 🌟

It's very easy to install Alpine JS plugins! 🙌

### CDN

```html
<script
  defer
  src="https://unpkg.com/alpinejs-form-validation@latest/dist/validation.min.js"
></script>

<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
```

### NPM/Yarn

```shell
npm i -D alpinejs-form-validation

yarn add -D alpinejs-form-validation
```

Then you can register the plugin.

```js
import Alpine from 'alpinejs'
import validation from 'alpinejs-form-validation'

Alpine.plugin(validation)

window.Alpine = Alpine

Alpine.start()
```

### Stats 📊

![](https://img.shields.io/bundlephobia/min/alpinejs-form-validation)
![](https://img.shields.io/npm/v/alpinejs-form-validation)
![](https://img.shields.io/npm/dt/alpinejs-form-validation)
![](https://img.shields.io/github/license/markmead/alpinejs-form-validation)
