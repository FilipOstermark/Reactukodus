export function* range(start: number, end: number, step = 1): Generator<number> {
  for (let i = start; i < end; i += step) {
    yield i
  }
}

export function todo(): never {
  throw Error("Not implemented yet")
}

export function toPaddedTime(num: number): string {
  return new String(num).padStart(2, '0')
}

export function toDisplayHHMM(seconds: number): string {
  const minutes = toPaddedTime(Math.floor(seconds / 60))
  const secondsRemainder = toPaddedTime(seconds % 60)

  return `${minutes}:${secondsRemainder}`
}

export function isStrictEqualArray<T> (a1: T[], a2: T[]): boolean {
  if (a1.length !== a2.length) {
    return false
  }

  for (let i = 0; i < a1.length; ++i) {
    if (a1[i] !== a2[i]) {
      return false
    }
  }

  return true
}