import { useState, useEffect } from 'react'
import moment, { Moment } from 'moment'

const Month = 'month'
const Day = 'day'
const Hour = 'hour'
const Minute = 'minute'
const Second = 'second'
type TimeDiff = {
  type: typeof Month | typeof Day | typeof Hour | typeof Minute | typeof Second
  duration: number
}
const diffFromNow = (dt: Moment): TimeDiff | undefined => {
  const now = moment()

  const months = now.diff(dt, 'month')
  if (months > 0) return { type: Month, duration: months }

  const days = now.diff(dt, 'day')
  if (days > 0) return { type: Day, duration: days }

  const hours = now.diff(dt, 'hour')
  if (hours > 0) return { type: Hour, duration: hours }

  const minutes = now.diff(dt, 'minute')
  if (minutes > 0) return { type: Minute, duration: minutes }

  const seconds = now.diff(dt, 'second')
  if (seconds > 0) return { type: Second, duration: seconds }
}

export const useRelativeTimeRepresent = (dt: Moment) => {
  const [relativeTimeRepresent, setRTR] = useState('a few later')
  const setDiff = (d: TimeDiff) => {
    const t =
      d.duration > 1
        ? `${d.duration} ${d.type}s ago`
        : `${d.duration} ${d.type} ago`
    if (t !== relativeTimeRepresent) setRTR(t)
  }
  useEffect(() => {
    let t: number
    const runner = () => {
      const next = main()
      t = window.setTimeout(runner, next)
    }
    const main = () => {
      const diff = diffFromNow(dt)
      if (diff === undefined) return 500
      switch (diff.type) {
        case Second:
          setDiff(diff)
          return 100 * 5
        case Minute:
          setDiff(diff)
          return 1000 * 30
        case Hour:
          setDiff(diff)
          return 1000 * 60 * 30
        default:
          setDiff(diff)
          return 1000 * 60 * 60 * 12
      }
    }
    runner()
    return () => {
      window.clearTimeout(t)
    }
  }, [])
  return relativeTimeRepresent
}
