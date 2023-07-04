import { useEffect, useState } from "react"
import { Observable } from "rxjs"

type OptionalVoidFunction<T> = undefined | ((value: T) => void)

/**
 * Custom React hook to effectively turn an rxjs Observable into a React state
 * variable. The hook uses useEffect and useState and automatically handles
 * useEffect clean-up.
 * 
 * @param observable The rxjs Observable to subscribe to
 * @param defaultValue The default React state value
 * @param sideEffects Optional function to be called when the Observable value 
 * changes
 * @returns The React state variable.
 */
export function useSubscribe<T>(
  observable: Observable<T>, 
  defaultValue: T,
  sideEffects: OptionalVoidFunction<T> = undefined
): T {
  const [stateVar, setStateVar] = useState<T>(defaultValue)
  
  useEffect(() => {
    const subscription = observable.subscribe((value: T) => {
      setStateVar(value)
      sideEffects?.(value)
    })

    return () => { subscription.unsubscribe() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return stateVar
}