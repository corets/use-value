import { useEffect, useMemo, useState } from "react"
import { UseValue } from "./types"
import { unwrapValue } from "./unwrapValue"

export const useValue: UseValue = <TValue>(initialValue) => {
  const value = useMemo(() => unwrapValue<TValue>(initialValue), [])

  const [reference, setReference] = useState(0)

  useEffect(() => {
    return value.listen(() => setReference((previous) => previous + 1), false)
  }, [])

  return value
}
