export default function (Alpine) {
  Alpine.directive(
    'validation',
    (el, { modifiers, expression }, { evaluateLater, effect }) => {
      const getInputValue = evaluateLater(expression)

      const getModifierItem = (key) =>
        modifiers.filter((modifier) => modifier === key)[0] ?? false

      let validationOptions = {}

      if (getModifierItem('required')) {
        validationOptions.required = true
      }

      if (getModifierItem('min')) {
        const modifierIndex = modifiers.indexOf(getModifierItem('min'))

        validationOptions.min = Number(modifiers[modifierIndex + 1])
      }

      if (getModifierItem('max')) {
        const modifierIndex = modifiers.indexOf(getModifierItem('max'))

        validationOptions.max = Number(modifiers[modifierIndex + 1])
      }

      if (getModifierItem('min:length')) {
        const modifierIndex = modifiers.indexOf(getModifierItem('min:length'))

        validationOptions.minLength = Number(modifiers[modifierIndex + 1])
      }

      if (getModifierItem('max:length')) {
        const modifierIndex = modifiers.indexOf(getModifierItem('max:length'))

        validationOptions.maxLength = Number(modifiers[modifierIndex + 1])
      }

      if (getModifierItem('checked')) {
        validationOptions.checked = true
      }

      effect(() => {
        getInputValue((inputValue) => {
          // We don't check validation if there is no input value,
          // or if the input has not been interacted with
          if (!inputValue && !el.getAttribute('x-validation-dirty')) {
            return
          }

          let validationStatus = {}

          if (getModifierItem('required')) {
            validationStatus.required = inputValue ? true : false
          }

          if (getModifierItem('min')) {
            validationStatus.min = inputValue >= validationOptions.min
          }

          if (getModifierItem('max')) {
            validationStatus.max = inputValue <= validationOptions.max
          }

          if (getModifierItem('min:length')) {
            validationStatus.minLength =
              inputValue.length >= validationOptions.minLength
          }

          if (getModifierItem('max:length')) {
            validationStatus.maxLength =
              inputValue.length <= validationOptions.maxLength
          }

          if (getModifierItem('checked')) {
            validationStatus.checked = inputValue ? true : false
          }

          const inputValid = Object.values(validationStatus).every(
            (validation) => validation
          )

          el.setAttribute('x-validation-dirty', true)
          el.setAttribute('x-validation-valid', inputValid)

          el.setAttribute(
            'x-validation-options',
            JSON.stringify(validationOptions)
          )

          el.setAttribute(
            'x-validation-status',
            JSON.stringify(validationStatus)
          )

          el.dispatchEvent(
            new CustomEvent('error', {
              bubbles: true,
              cancelable: true,
              detail: JSON.stringify(validationStatus),
            })
          )
        })
      })
    }
  )

  Alpine.magic('valid', () => (json, key) => !JSON.parse(json)[key])
}
