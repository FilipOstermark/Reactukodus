export class HighscoreEntry {
  readonly score: string
  readonly epochTimeMillis: number

  constructor(score: string, epochTimeMillis: number | undefined = undefined) {
    this.score = score
    this.epochTimeMillis = epochTimeMillis ?? Date.now()
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function isHighscoreEntry(obj: any): boolean {
  if (typeof obj.score !== "string") {
    return false
  }

  if (typeof obj.epochTimeMillis !== "number") {
    return false
  }

  return true
}