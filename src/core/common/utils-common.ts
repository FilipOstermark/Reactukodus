export function* range(start: number, end: number, step = 1): Generator<number> {
  for (let i = start; i < end; i += step) {
    yield i
  }
}

export function todo(): never {
  throw Error("Not implemented yet")
}

export function toDisplayTime(num: number): string {
  return new String(num).padStart(2, '0')
}