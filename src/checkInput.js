export function checkInput(
  el,
  modifiers,
  expression,
  evaluateLater,
  ignoreDirty = false
) {
  const hasModifier = (modKey) => modifiers.includes(modKey)

  const getModifierValue = (modKey) => {
    const modIndex = modifiers.indexOf(modKey)

    if (modIndex === -1 || modIndex + 1 >= modifiers.length) {
      return null
    }

    const modValue = Number(modifiers[modIndex + 1])

    return isNaN(modValue) ? null : modValue
  }

  const getErrors = evaluateLater(expression)

  // Build validation options object - only include options with valid values
  const validationOptions = {
    ...(hasModifier('required') && { required: true }),
    ...(hasModifier('min') && (() => {
      const minValue = getModifierValue('min');
      return minValue !== null ? { min: minValue } : null;
    })()),
    ...(hasModifier('max') && (() => {
      const maxValue = getModifierValue('max');
      return maxValue !== null ? { max: maxValue } : null;
    })()),
    ...(hasModifier('min:length') && (() => {
      const minLengthValue = getModifierValue('min:length');
      return minLengthValue !== null ? { minLength: minLengthValue } : null;
    })()),
    ...(hasModifier('max:length') && (() => {
      const maxLengthValue = getModifierValue('max:length');
      return maxLengthValue !== null ? { maxLength: maxLengthValue } : null;
    })()),
    ...(hasModifier('checked') && { checked: true }),
  }

  getErrors((inputValue) => {
    // Skip validation if no input value and element hasn't been interacted with
    if (
      !ignoreDirty &&
      !inputValue &&
      !el.getAttribute('data-validation-dirty')
    ) {
      return
    }

    // Validation logic mapping
    const validationChecks = {
      required: () => !!inputValue,
      min: () => inputValue >= validationOptions.min,
      max: () => inputValue <= validationOptions.max,
      minLength: () => inputValue.length >= validationOptions.minLength,
      maxLength: () => inputValue.length <= validationOptions.maxLength,
      checked: () => !!inputValue,
    }

    // Run only applicable validations
    const validationStatus = Object.keys(validationOptions).reduce(
      (optionStatus, optionKey) => {
        if (validationChecks[optionKey]) {
          optionStatus[optionKey] = validationChecks[optionKey]()
        }

        return optionStatus
      },
      {}
    )

    const isValid = Object.values(validationStatus).every(Boolean)
    const errorKey = Object.keys(validationStatus).find(
      (statusKey) => !validationStatus[statusKey]
    )

    // Set data attributes
    const inputAttributes = {
      'data-validation-dirty': true,
      'data-validation-valid': isValid,
      'data-validation-reason': errorKey || '',
      'data-validation-status': JSON.stringify(validationStatus),
      'data-validation-options': JSON.stringify(validationOptions),
    }

    Object.entries(inputAttributes).forEach(
      ([attributeName, attributeValue]) => {
        el.setAttribute(attributeName, attributeValue)
      }
    )
  })
}
