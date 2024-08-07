import React from 'react'

import { getHost } from './host'
import { PromptComponent, PromptProps } from './types'

export * from './types'

export function createPromptComponent<T, P>(Component: React.ComponentType<P & PromptProps<T>>): PromptComponent<T, P> {
  Object.assign(Component, {
    show(props: P) {
      return new Promise<T>(resolve => {
        const host = getHost()
        const requestPop = () => host.pop()
        host.push(React.createElement(Component, {
          ...props,
          resolve,
          requestPop,
        }))
      })
    },
  })

  return Component as any
}
