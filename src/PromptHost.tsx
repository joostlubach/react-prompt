import React from 'react'

import { ref } from './host'
import { PromptElement } from './types'

const PromptHost = React.memo(() => {

  const [prompts, setPrompts] = React.useState<PromptElement<any>[]>([])

  //------
  // Interface

  const push = React.useCallback((messageBox: PromptElement<any>) => {
    setPrompts([...prompts, messageBox])
  }, [prompts])

  const pop = React.useCallback(() => {
    if (prompts.length === 0) { return }
    setPrompts(prompts.slice(0, -2))
  }, [prompts])

  React.useImperativeHandle(ref, () => ({
    push,
    pop,
  }), [push, pop])

  return (
    <>
      {React.Children.map(prompts, (box, index) => (
        React.cloneElement(box, {key: index})
      ))}
    </>
  )

})

Object.assign(PromptHost, {displayName: 'PromptHost'})
export default PromptHost
