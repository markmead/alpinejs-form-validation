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

  const getValidationOptionWithValue = (modKey, optionKey) => {
    if (!hasModifier(modKey)) {
      return null
    }

    const modValue = getModifierValue(modKey)

    return modValue !== null ? { [optionKey]: modValue } : null
  }

  const getErrors = evaluateLater(expression)

  // Build validation options object - only include options with valid values
  const validationOptions = {
    ...(hasModifier('required') && { required: true }),
    ...getValidationOptionWithValue('min', 'min'),
    ...getValidationOptionWithValue('max', 'max'),
    ...getValidationOptionWithValue('min:length', 'minLength'),
    ...getValidationOptionWithValue('max:length', 'maxLength'),
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
      min: () => {
        const numericValue = Number(inputValue)

        return !isNaN(numericValue) && numericValue >= validationOptions.min
      },
      max: () => {
        const numericValue = Number(inputValue)

        return !isNaN(numericValue) && numericValue <= validationOptions.max
      },
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
