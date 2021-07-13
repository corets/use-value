import isFunction from "lodash/isFunction"
import { createValue, ObservableValue, Value } from "@corets/value"
import { ValueInitializer } from "./types"

export const unwrapValue = <TValue>(
  initialValue: ValueInitializer<TValue | ObservableValue<TValue>>
): ObservableValue<TValue> => {
  let value = isFunction(initialValue) ? initialValue() : initialValue

  if (!(value instanceof Value)) {
    value = createValue(value) as ObservableValue<TValue>
  }

  return value
}
