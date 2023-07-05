export interface BaseUseCase {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    perform: (...args: any) => any    
}