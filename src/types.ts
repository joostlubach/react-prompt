export type PromptComponent<T, P> = React.ComponentType<P> & PromptComponentStatic<T, P>

export interface PromptComponentStatic<T, P> {
  show(props: Omit<P, keyof PromptProps<T>>): Promise<T>
}

export type PromptElement<P extends PromptProps<any>> = React.ReactElement<P>

export interface PromptProps<T> {
  resolve:    (result: T) => void
  requestPop: () => void
}
