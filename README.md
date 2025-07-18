# Alpine JS Form Validation

Add client side form validation with Alpine JS 🎉

## Install

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

## Example

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

### Functionality

Breaking down the example we have the following.

#### `$dispatch('validate')`

Emitting the event `validate` will trigger each input within the element that
the event was emitted from to run through the validation checks.

#### `x-validation.required="contactName"`

Here we are setting up the directive `x-validation` and passing the modifier
`required` which says, the value of `contactName` must exist to pass validation.

**Validation Options**

- `required`
- `min.X` (Where "X" is an integer)
- `max.X` (Where "X" is an integer)
- `min:length.X` (Where "X" is an integer)
- `max:length.X` (Where "X" is an integer)

### Styling

#### How Error Messages Are Shown

This plugin now relies primarily on CSS, not JavaScript (since v1.2), to show or
hide error messages. When an input is validated, data attributes such as
`data-validation-valid` and `data-validation-reason` are set on the input
element. You can use these attributes in your CSS to control the appearance of
error messages and input borders.

For example, you can show or hide error messages based on the validation state
using the `group-has-[[data-validation-reason=...]]` or
`group-has-[[data-validation-valid=false]]` selectors. This means you do not
need to write any JavaScript to toggle error messages, just use the appropriate
CSS selectors.

**Why use `data-validation-reason`?**

The `data-validation-reason` attribute is especially useful for inputs that have
multiple validation criteria (such as both `min` and `max` length, or a numeric
range). By targeting specific reasons, you can display a different error message
for each type of validation failure.

For example, a text input might need to be at least 10 characters but no more
than 50; using `data-validation-reason`, you can show a unique message for each
case, improving the user experience.

#### Example CSS

```css
[data-validation-valid='false'] {
  border-color: red;
}

[data-validation-valid='true'] {
  border-color: green;
}

/* Show error message when input is invalid */
.group:has([data-validation-valid='false']) small {
  display: block;
}

/* Hide error message by default */
.group small {
  display: none;
}

/* Show specific error message for a reason */
.group:has([data-validation-reason='min']) .min-error {
  display: block;
}
.group:has([data-validation-reason='max']) .max-error {
  display: block;
}
```

> **Note:** The example above uses the `:has()` CSS selector, which is supported
> in all modern browsers. If you need to support older browsers, consider using
> utility classes or alternative approaches.

```

### Stats

![](https://img.shields.io/bundlephobia/min/alpinejs-form-validation)
![](https://img.shields.io/npm/v/alpinejs-form-validation)
![](https://img.shields.io/npm/dt/alpinejs-form-validation)
![](https://img.shields.io/github/license/markmead/alpinejs-form-validation)
```
