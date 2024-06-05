export function checkInput(
  el,
  modifiers,
  expression,
  evaluateLater,
  ignoreDirty = false
) {
  const getModifier = (key) => modifiers.find((mod) => mod === key) ?? false
  const getErrors = evaluateLater(expression)

  let validationOptions = {}

  if (getModifier('required')) {
    validationOptions.required = true
  }

  if (getModifier('min')) {
    const modifierIndex = modifiers.indexOf(getModifier('min'))

    validationOptions.min = Number(modifiers[modifierIndex + 1])
  }

  if (getModifier('max')) {
    const modifierIndex = modifiers.indexOf(getModifier('max'))

    validationOptions.max = Number(modifiers[modifierIndex + 1])
  }

  if (getModifier('min:length')) {
    const modifierIndex = modifiers.indexOf(getModifier('min:length'))

    validationOptions.minLength = Number(modifiers[modifierIndex + 1])
  }

  if (getModifier('max:length')) {
    const modifierIndex = modifiers.indexOf(getModifier('max:length'))

    validationOptions.maxLength = Number(modifiers[modifierIndex + 1])
  }

  if (getModifier('checked')) {
    validationOptions.checked = true
  }

  getErrors((value) => {
    // We don't check validation if there is no input value,
    // or if the input has not been interacted with
    if (!ignoreDirty && !value && !el.getAttribute('data-validation-dirty')) {
      return
    }

    let validationStatus = {}

    if (getModifier('required')) {
      validationStatus.required = !!value
    }

    if (getModifier('min')) {
      validationStatus.min = value >= validationOptions.min
    }

    if (getModifier('max')) {
      validationStatus.max = value <= validationOptions.max
    }

    if (getModifier('min:length')) {
      validationStatus.minLength = value.length >= validationOptions.minLength
    }

    if (getModifier('max:length')) {
      validationStatus.maxLength = value.length <= validationOptions.maxLength
    }

    if (getModifier('checked')) {
      validationStatus.checked = !!value
    }

    const isValid = Object.values(validationStatus).every((valid) => valid)

    el.setAttribute('data-validation-dirty', true)
    el.setAttribute('data-validation-valid', isValid)
    el.setAttribute('data-validation-status', JSON.stringify(validationStatus))
    el.setAttribute(
      'data-validation-options',
      JSON.stringify(validationOptions)
    )

    el.dispatchEvent(
      new CustomEvent('error', {
        bubbles: true,
        cancelable: true,
        detail: JSON.stringify(validationStatus),
      })
    )
  })
}
