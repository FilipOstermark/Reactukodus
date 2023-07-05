import { Observable } from "rxjs"

export interface ObservableUseCase {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    perform$: (...args: any) => Observable<any>
}
