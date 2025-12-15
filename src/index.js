import { checkInput } from './checkInput'

export default function (Alpine) {
  Alpine.directive(
    'validation',
    (el, { modifiers, expression }, { evaluateLater, effect }) => {
      effect(() => checkInput(el, modifiers, expression, evaluateLater))

      const handleValidate = (validateEvent) => {
        const { target } = validateEvent

        if (!target.contains(el)) {
          return
        }

        checkInput(el, modifiers, expression, evaluateLater, true)
      }

      // Clear validation data attributes on form reset
      const handleReset = (resetEvent) => {
        const { target } = resetEvent

        if (!target.contains(el)) {
          return
        }

        const validationAttributes = [
          'data-validation-dirty',
          'data-validation-valid',
          'data-validation-reason',
          'data-validation-status',
          'data-validation-options',
        ]

        validationAttributes.forEach((htmlAttribute) =>
          el.removeAttribute(htmlAttribute)
        )
      }

      document.addEventListener('validate', handleValidate)
      document.addEventListener('reset', handleReset)

      return () => {
        document.removeEventListener('validate', handleValidate)
        document.removeEventListener('reset', handleReset)
      }
    }
  )
}
