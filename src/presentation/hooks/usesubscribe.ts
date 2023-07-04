import { useEffect, useState } from "react"
import { Observable } from "rxjs"

/**
 * Custom React hook to effectively turn an rxjs Observable into a React state
 * variable. The hook uses useEffect and useState and automatically handles
 * useEffect clean-up.
 * 
 * @param observable The rxjs Observable to subscribe to
 * @param defaultValue The default React state value
 * @returns The React state variable.
 */
export function useSubscribe<T>(
  observable: Observable<T>, 
  defaultValue: T
): T {
  const [stateVar, setStateVar] = useState<T>(defaultValue)
  
  useEffect(() => {
    const subscription = observable.subscribe((value: T) => {
      setStateVar(value)
    })

    return () => { subscription.unsubscribe() }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return stateVar
}