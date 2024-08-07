import React from 'react'

import { PromptElement } from './types'

export interface Host {
  push: (messageBox: PromptElement<any>) => void
  pop:  () => void
}

export const ref = React.createRef<Host | null>()

export function getHost() {
  if (ref.current == null) {
    throw new Error('[react-prompt] Host is not mounted')
  }

  return ref.current
}
