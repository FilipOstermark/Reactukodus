import { useEffect, useState } from "react"
import { Stopwatch as DomainStopwatch } from "../../domain/usecase/Stopwatch"
import { toDisplayHHMM } from "../../common/utils-common"

interface StopwatchProps {
  stopwatch: DomainStopwatch
  isSolved: boolean // TODO Take from use case/repo
}

export const Stopwatch = ({ stopwatch, isSolved }: StopwatchProps) => {  
  const [elapsedSeconds, setElapsedSeconds] = useState(0)

  useEffect(() => {
    const stopwatchSubscription = stopwatch
      .getElapsedSeconds$()
      .subscribe(elapsedSeconds => {
        setElapsedSeconds(elapsedSeconds)
      })
    stopwatch.start()

    return () => { 
      stopwatchSubscription.unsubscribe()
      stopwatch.stop()
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const displayTime = toDisplayHHMM(elapsedSeconds)
  const stopwatchOpacity = isSolved ? 0 : 1

  return (<h3 style={{opacity: stopwatchOpacity}}>{displayTime}</h3>)
}