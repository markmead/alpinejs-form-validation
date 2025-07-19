# Alpine JS Form Validation

![](https://img.shields.io/npm/v/alpinejs-form-validation)(https://www.npmjs.com/package/alpinejs-form-validation)
![](https://img.shields.io/bundlephobia/min/alpinejs-form-validation)(https://bundlephobia.com/package/alpinejs-form-validation)
![](https://img.shields.io/npm/dt/alpinejs-form-validation)(https://www.npmjs.com/package/alpinejs-form-validation)
![](https://img.shields.io/github/license/markmead/alpinejs-form-validation)(https://github.com/markmead/alpinejs-form-validation/blob/main/LICENSE)

A lightweight, CSS-driven form validation plugin for Alpine.js that provides
real-time client-side validation with data attributes.

## ✨ Features

- 🪶 **Lightweight** - Minimal overhead, maximum performance
- 🎨 **CSS-driven** - Style validation states with data attributes
- ⚡ **Real-time** - Immediate feedback as users type
- 🔧 **Flexible** - Multiple validation rules per input
- 📱 **Accessible** - Works with screen readers and keyboard navigation
- � **Zero dependencies** - Only requires Alpine.js

## 📦 Installation

### With a CDN

```html
<script
  defer
  src="https://unpkg.com/alpinejs-form-validation@latest/dist/validation.min.js"
></script>

<script defer src="https://unpkg.com/alpinejs@latest/dist/cdn.min.js"></script>
```

### With a Package Manager

```shell
yarn add -D alpinejs-form-validation

npm install -D alpinejs-form-validation
```

```js
import Alpine from 'alpinejs'
import validation from 'alpinejs-form-validation'

Alpine.plugin(validation)

Alpine.start()
```

## 🚀 Quick Start

1. Add the validation directive to your inputs with `x-validation`
2. Use modifiers to specify validation rules (e.g., `x-validation.required`)
3. Trigger validation with `$dispatch('validate')`
4. Style validation states using data attributes

## 📋 Validation Rules

| Rule           | Example                       | Description              |
| -------------- | ----------------------------- | ------------------------ |
| `required`     | `x-validation.required`       | Field must have a value  |
| `min.X`        | `x-validation.min.18`         | Numeric minimum value    |
| `max.X`        | `x-validation.max.65`         | Numeric maximum value    |
| `min:length.X` | `x-validation.min:length.5`   | Minimum string length    |
| `max:length.X` | `x-validation.max:length.100` | Maximum string length    |
| `checked`      | `x-validation.checked`        | Checkbox must be checked |

### Combining Rules

You can combine multiple validation rules on a single input:

```html
<input x-model="age" x-validation.required.min.18.max.65="age" />

<textarea
  x-model="message"
  x-validation.required.min:length.10.max:length.500="message"
></textarea>
```

## 🎨 Data Attributes

The plugin automatically sets these data attributes on validated elements:

- `data-validation-valid` - `"true"` or `"false"`
- `data-validation-reason` - The specific validation rule that failed
- `data-validation-dirty` - `"true"` once the user has interacted with the field
- `data-validation-status` - JSON object with all validation results
- `data-validation-options` - JSON object with all validation rules

## 💡 Complete Example

_This example uses Tailwind CSS for styling but that is not required._

```html
<form
  x-data="{ contactName: '', contactAge: '', contactMessage: '', contactTerms: false }"
  class="max-w-xl mx-auto space-y-4"
  @submit.prevent="$dispatch('validate')"
>
  <div class="group">
    <label for="contactName" class="font-medium"> Name </label>

    <input
      id="contactName"
      type="text"
      x-model="contactName"
      x-validation.required="contactName"
      class="w-full mt-1 rounded data-[validation-valid=true]:border-green-500 data-[validation-valid=false]:border-red-500"
    />

    <small
      class="text-red-600 mt-1 hidden group-has-[[data-validation-valid=false]]:block"
    >
      Need a name
    </small>
  </div>

  <div class="group">
    <label for="contactAge" class="font-medium"> Age </label>

    <input
      id="contactAge"
      type="number"
      x-model="contactAge"
      x-validation.min.18.max.24="contactAge"
      class="w-full rounded mt-1 data-[validation-valid=true]:border-green-500 data-[validation-valid=false]:border-red-500"
    />

    <small
      class="text-red-600 mt-1 group-has-[[data-validation-reason=min]]:block hidden"
    >
      Must be at least 18 years old
    </small>

    <small
      class="text-red-600 mt-1 group-has-[[data-validation-reason=max]]:block hidden"
    >
      Can't be older than 24 years old
    </small>
  </div>

  <div class="group">
    <label for="contactMessage" class="font-medium"> Message </label>

    <textarea
      id="contactMessage"
      x-model="contactMessage"
      x-validation.min:length.10.max:length.50="contactMessage"
      class="rounded w-full mt-1 data-[validation-valid=true]:border-green-500 data-[validation-valid=false]:border-red-500"
    ></textarea>

    <small
      class="text-red-600 mt-1 group-has-[[data-validation-reason=minLength]]:block hidden"
    >
      Must be at least 10 characters
    </small>

    <small
      class="text-red-600 mt-1 group-has-[[data-validation-reason=maxLength]]:block hidden"
    >
      Can't be more than 50 characters
    </small>
  </div>

  <div class="group">
    <label for="contactTerms" class="inline-flex items-center gap-2">
      <input
        id="contactTerms"
        type="checkbox"
        value="true"
        x-model="contactTerms"
        x-validation.checked="contactTerms"
        class="size-5 rounded data-[validation-valid=false]:border-red-500"
      />

      <span class="font-medium">I accept the terms and conditions</span>
    </label>

    <small
      class="text-red-600 mt-1 group-has-[[data-validation-valid=false]]:block hidden"
    >
      Must accept
    </small>
  </div>

  <div class="flex justify-end gap-4">
    <button type="reset" class="px-5 py-2.5 rounded font-medium text-blue-600">
      Reset
    </button>

    <button class="px-5 py-2.5 rounded bg-blue-600 font-medium text-white">
      Submit
    </button>
  </div>
</form>
```

## 🎯 How It Works

### Triggering Validation

#### `$dispatch('validate')`

Dispatch the `validate` event to trigger validation for all inputs within the
target element:

```html
<!-- Validate entire form -->
<form @submit.prevent="$dispatch('validate')"> </form>
```

### Real-time Validation

Validation automatically runs as users interact with inputs. The plugin tracks
whether an input is "dirty" (has been interacted with) to avoid showing errors
prematurely.

## 🎨 Styling with CSS

### Basic Styling

```css
/* Valid inputs */
[data-validation-valid='true'] {
  border-color: #10b981;
}

/* Invalid inputs */
[data-validation-valid='false'] {
  border-color: #ef4444;
}

/* Error messages (hidden by default) */
.error-message {
  display: none;
  color: #ef4444;
}

/* Show error when parent contains invalid input */
.form-group:has([data-validation-valid='false']) .error-message {
  display: block;
}
```

### Specific Error Messages

Target specific validation failures for tailored messaging:

```css
/* Show specific error for minimum value */
.form-group:has([data-validation-reason='min']) .min-error {
  display: block;
}

/* Show specific error for required field */
.form-group:has([data-validation-reason='required']) .required-error {
  display: block;
}
```

### Advanced Example with Tailwind CSS

```html
<div class="group">
  <input
    x-model="email"
    x-validation.required.min:length.5="email"
    class="w-full border rounded px-3 py-2 data-[validation-valid=true]:border-green-500 data-[validation-valid=false]:border-red-500"
  />

  <!-- Different error messages for different validation failures -->
  <small
    class="text-red-600 mt-1 hidden group-has-[[data-validation-reason=required]]:block"
  >
    Email is required
  </small>

  <small
    class="text-red-600 mt-1 hidden group-has-[[data-validation-reason=minLength]]:block"
  >
    Email must be at least 5 characters
  </small>
</div>
```

## 🌐 Browser Support

This plugin uses modern CSS features like `:has()` selector in the examples. For
broader browser support, consider:

- Using JavaScript to toggle classes instead of CSS `:has()`
- Providing fallback styles for older browsers
- Using utility CSS frameworks that handle browser compatibility

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request. For major
changes, please open an issue first to discuss what you would like to change.

## 🔧 Advanced Usage

### How Error Messages Are Shown

This plugin relies primarily on CSS to show or hide error messages. When an
input is validated, data attributes such as `data-validation-valid` and
`data-validation-reason` are set on the input element.

**Why use `data-validation-reason`?**

The `data-validation-reason` attribute is useful for inputs with multiple
validation criteria. By targeting specific reasons, you can display different
error messages for each type of validation failure, improving the user
experience.

### Example CSS

```css
[data-validation-valid='false'] {
  border-color: red;
}

[data-validation-valid='true'] {
  border-color: green;
}

.group:has([data-validation-valid='false']) small {
  display: block;
}

.group small {
  display: none;
}

.group:has([data-validation-reason='min']) .min-error {
  display: block;
}
```

> **Note:** The `:has()` CSS selector is supported in all modern browsers. For
> older browser support, consider alternative approaches.
