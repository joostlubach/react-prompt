import React, { Fragment } from 'react'
import { memo } from '@mosdev/react-util'
import { useContinuousRef } from '@mosdev/react-util/hooks'
import { ref } from './host'
import { PromptElement } from './types'

const PromptHost = memo('PromptHost', () => {

  const [prompts, setPrompts] = React.useState<PromptElement<any>[]>([])
  const promptsRef = useContinuousRef(prompts)

  //------
  // Interface

  const push = React.useCallback((prompt: PromptElement<any>) => {
    const prompts = promptsRef.current
    setPrompts([...prompts, prompt])
  }, [promptsRef])

  const pop = React.useCallback(() => {
    const prompts = promptsRef.current
    if (prompts.length === 0) { return }
    setPrompts(prompts.slice(0, -1))
  }, [promptsRef])

  React.useImperativeHandle(ref, () => ({
    push,
    pop,
  }), [push, pop])

  return (
    <>
      {React.Children.map(prompts, (box, index) => (
        <Fragment key={index}>
          {box}
        </Fragment>
      ))}
    </>
  )

})

export default PromptHost
