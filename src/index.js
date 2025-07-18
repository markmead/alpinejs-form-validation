import { checkInput } from './checkInput'

export default function (Alpine) {
  Alpine.directive(
    'validation',
    (el, { modifiers, expression }, { evaluateLater, effect }) => {
      effect(() => checkInput(el, modifiers, expression, evaluateLater))

      document.addEventListener('validate', (event) => {
        const ignoreDirty = true

        const { target } = event

        if (!target.contains(el)) {
          return
        }

        checkInput(el, modifiers, expression, evaluateLater, ignoreDirty)
      })
    }
  )
}
