# Alpine JS Form Validation

Add client side form validation with Alpine JS 🎉

## Install

### With a CDN

```html
<script
  defer
  src="https://unpkg.com/alpinejs-form-validation@latest/dist/validation.min.js"
></script>

<script defer src="https://unpkg.com/alpinejs@3.x.x/dist/cdn.min.js"></script>
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

_This example uses Tailwind CSS for styling but that is not mandatory._

```html
<form
  @submit.prevent="$dispatch('validate')"
  x-data="{ contactName: '', contactAge: '', contactMessage: '', contactTerms: false }"
  class="max-w-xl mx-auto space-y-4"
>
  <div
    x-data="{ required: false }"
    @error="required = $valid($event.detail, 'required')"
  >
    <label for="contactName" class="font-medium"> Name </label>

    <input
      id="contactName"
      type="text"
      x-model="contactName"
      x-validation.required="contactName"
      class="w-full mt-1 rounded data-[validation-valid=true]:border-green-500 data-[validation-valid=false]:border-red-500"
    />

    <small x-cloak x-show="required" class="text-red-600 mt-1 block">
      Need a name
    </small>
  </div>

  <div
    x-data="{ minAge: false, maxAge: false }"
    @error="
      minAge = $valid($event.detail, 'min')
      maxAge = $valid($event.detail, 'max')
    "
  >
    <label for="contactAge" class="font-medium"> Age </label>

    <input
      id="contactAge"
      type="number"
      x-model="contactAge"
      x-validation.min.18.max.24="contactAge"
      class="w-full rounded mt-1 data-[validation-valid=true]:border-green-500 data-[validation-valid=false]:border-red-500"
    />

    <small x-cloak x-show="minAge" class="text-red-600 mt-1 block">
      Must be at least 18 years old
    </small>

    <small x-cloak x-show="maxAge" class="text-red-600 mt-1 block">
      Can't be older than 24 years old
    </small>
  </div>

  <div
    x-data="{ minLetters: false, maxLetters: false }"
    @error="
      minLetters = $valid($event.detail, 'minLength')
      maxLetters = $valid($event.detail, 'maxLength')
    "
  >
    <label for="contactMessage" class="font-medium"> Message </label>

    <textarea
      id="contactMessage"
      x-model="contactMessage"
      x-validation.min:length.10.max:length.50="contactMessage"
      class="rounded w-full mt-1 data-[validation-valid=true]:border-green-500 data-[validation-valid=false]:border-red-500"
    ></textarea>

    <small x-cloak x-show="minLetters" class="text-red-600 mt-1 block">
      Must be at least 10 characters
    </small>

    <small x-cloak x-show="maxLetters" class="text-red-600 mt-1 block">
      Can't be more than 50 characters
    </small>
  </div>

  <div
    x-data="{ isAccepted: false }"
    @error="isAccepted = $valid($event.detail, 'checked')"
  >
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

    <small x-cloak x-show="isAccepted" class="text-red-600 mt-1 block">
      Must accept
    </small>
  </div>

  <button class="px-5 py-2.5 rounded bg-blue-600 font-medium text-white">
    Submit
  </button>
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

#### `@error="required = $valid($event.detail, 'required')"`

Here we have a few things going on.

We're listing for the `@error` event which is emitted once the input has run
through the validation checks. We're then setting `required` to either
true/false based on the response from the magic helper `$valid`.

**`$valid`**

This is a magic helper which returns true/false based on the validation status
of the input. You pass in the `$event.detail` which comes from the `@error`
event and the validation option, in the example that's `required`.

### Styling

You could style the inputs like this:

```css
[data-validation-valid='false'] {
  border-color: red;
}

[data-validation-valid='true'] {
  border-color: green;
}
```

### Stats

![](https://img.shields.io/bundlephobia/min/alpinejs-form-validation)
![](https://img.shields.io/npm/v/alpinejs-form-validation)
![](https://img.shields.io/npm/dt/alpinejs-form-validation)
![](https://img.shields.io/github/license/markmead/alpinejs-form-validation)
