import { useEffect, useRef } from "react"

export type OnKeyDownHandler = (event: KeyboardEvent) => void

/**
 * Custom hook to handle keydown events globally.
 * 
 * @param eventHandlerFunction The event handler function
 */
export function useOnKeyDown(eventHandlerFunction: OnKeyDownHandler) {
  const ref = useRef<OnKeyDownHandler>()
  ref.current = eventHandlerFunction

  useEffect(() => {
    const handler = (event: KeyboardEvent) => ref.current?.(event)
    document.addEventListener("keydown", handler)

    return () => {
      document.removeEventListener("keydown", handler)
    }
  }, [])
}