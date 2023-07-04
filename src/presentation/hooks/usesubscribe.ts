import { useEffect, useState } from "react"
import { Observable } from "rxjs"

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
  })

  return stateVar
}