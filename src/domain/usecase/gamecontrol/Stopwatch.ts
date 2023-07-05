import { BehaviorSubject, Observable, Subscription, interval } from "rxjs"

const TIMER_INTERVAL_MS = 1_000

export class Stopwatch {
  private interval: Observable<number>
  private intervalSubscription: Subscription | undefined
  private elapsedSeconds$: BehaviorSubject<number>
  private isStarted: boolean

  constructor() {
    this.elapsedSeconds$ = new BehaviorSubject(0)
    this.isStarted = false
    this.interval = interval(TIMER_INTERVAL_MS)
  }

  public start(): void {
    if (this.isStarted) {
      this.stop()
    }

    this.elapsedSeconds$.next(0)
    this.isStarted = true
    this.interval = interval(TIMER_INTERVAL_MS)
    this.intervalSubscription = this.interval.subscribe(() => {
      this.elapsedSeconds$.next(
        this.elapsedSeconds$.getValue() + 1
      )
    })
  }

  public stop(): void {
    this.intervalSubscription?.unsubscribe()
    this.isStarted = false
  }

  public getElapsedSeconds(): number {
    return this.elapsedSeconds$.getValue()
  }

  public getElapsedSeconds$(): Observable<number> {
    return this.elapsedSeconds$.asObservable()
  }
}

export const stopwatch: Stopwatch = new Stopwatch()