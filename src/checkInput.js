export function checkInput(
  el,
  modifiers,
  expression,
  evaluateLater,
  ignoreDirty = false
) {
  const getModifier = (modKey) =>
    modifiers.find((modItem) => modItem === modKey) ?? false

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

  getErrors((inputValue) => {
    // We don't check validation if there is no input value,
    // or if the input has not been interacted with
    if (
      !ignoreDirty &&
      !inputValue &&
      !el.getAttribute('data-validation-dirty')
    ) {
      return
    }

    let validationStatus = {}

    if (getModifier('required')) {
      validationStatus.required = !!inputValue
    }

    if (getModifier('min')) {
      validationStatus.min = inputValue >= validationOptions.min
    }

    if (getModifier('max')) {
      validationStatus.max = inputValue <= validationOptions.max
    }

    if (getModifier('min:length')) {
      validationStatus.minLength =
        inputValue.length >= validationOptions.minLength
    }

    if (getModifier('max:length')) {
      validationStatus.maxLength =
        inputValue.length <= validationOptions.maxLength
    }

    if (getModifier('checked')) {
      validationStatus.checked = !!inputValue
    }

    const isValid = Object.values(validationStatus).every((isValid) => isValid)
    const errorKey = Object.keys(validationStatus).find(
      (validationKey) => validationStatus[validationKey] === false
    )

    el.setAttribute('data-validation-dirty', true)
    el.setAttribute('data-validation-valid', isValid)
    el.setAttribute('data-validation-reason', errorKey || '')
    el.setAttribute('data-validation-status', JSON.stringify(validationStatus))
    el.setAttribute(
      'data-validation-options',
      JSON.stringify(validationOptions)
    )
  })
}
