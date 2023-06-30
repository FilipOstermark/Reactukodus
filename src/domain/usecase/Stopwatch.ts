import { BehaviorSubject, Observable, Subscription, interval } from "rxjs"

export class Stopwatch {
  private interval: Observable<number>
  private intervalSubscription: Subscription | undefined
  private elapsedSeconds$: BehaviorSubject<number>
  private isStarted: boolean

  constructor() {
    this.elapsedSeconds$ = new BehaviorSubject(0)
    this.isStarted = false
    this.interval = interval(1000)
  }

  public start(): void {
    if (this.isStarted) {
      // Restarts if already started
      this.stop()
      this.elapsedSeconds$.next(0)
    }

    this.interval = interval(1000)
    this.intervalSubscription = this.interval.subscribe(() => {
      this.elapsedSeconds$.next(
        this.elapsedSeconds$.getValue() + 1
      )
    })

    this.isStarted = true
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