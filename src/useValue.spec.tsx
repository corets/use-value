import React from "react"
import { mount } from "enzyme"
import { useValue } from "./index"
import { act } from "react-dom/test-utils"
import { createValue, ObservableValue } from "@corets/value"

describe("useValue", () => {
  it("uses new value", async () => {
    let receivedValue: ObservableValue

    let renders = 0
    const Component = () => {
      const value = useValue(0)
      receivedValue = value
      renders++

      return <h1>{value.get()}</h1>
    }

    const wrapper = mount(<Component />)
    const target = () => wrapper.find("h1")

    expect(renders).toBe(1)
    expect(target().text()).toBe("0")

    act(() => receivedValue.set(1))

    expect(renders).toBe(2)
    expect(target().text()).toBe("1")

    act(() => receivedValue.set(1))

    expect(renders).toBe(2)
    expect(target().text()).toBe("1")
  })

  it("uses new value with initializer", () => {
    const initializer = () => 1
    let receivedValue: ObservableValue
    let renders = 0

    const Test = () => {
      renders++
      const value = useValue(initializer)
      receivedValue = value

      return <h1>{value.get()}</h1>
    }

    const wrapper = mount(<Test />)
    const target = () => wrapper.find("h1")

    expect(renders).toBe(1)
    expect(target().text()).toBe("1")

    act(() => receivedValue.set(2))

    expect(renders).toBe(2)
    expect(target().text()).toBe("2")

    act(() => receivedValue.set(3))

    expect(renders).toBe(3)
    expect(target().text()).toBe("3")
  })

  it("uses value", () => {
    const value = createValue(1)
    let receivedValue: ObservableValue
    let renders = 0

    const Test = () => {
      renders++
      const count = useValue(value)
      receivedValue = count

      return <h1>{count.get()}</h1>
    }

    const wrapper = mount(<Test />)
    const target = () => wrapper.find("h1")

    expect(renders).toBe(1)
    expect(target().text()).toBe("1")

    act(() => value.set(2))

    expect(renders).toBe(2)
    expect(target().text()).toBe("2")

    act(() => receivedValue.set(3))

    expect(renders).toBe(3)
    expect(target().text()).toBe("3")

    act(() => receivedValue.set(4))

    expect(renders).toBe(4)
    expect(target().text()).toBe("4")
  })

  it("uses value with initializer", () => {
    const initializer = () => createValue(1)

    const Test = () => {
      const count = useValue(initializer)

      return <h1>{count.get()}</h1>
    }

    const wrapper = mount(<Test />)
    const target = () => wrapper.find("h1")

    expect(target().text()).toBe("1")
  })

  it("updates and resets value", () => {
    const value = createValue(1)
    let receivedValue: ObservableValue

    let renders = 0

    const Test = () => {
      renders++
      const count = useValue(value)

      receivedValue = count

      return <h1>{count.get()}</h1>
    }

    const wrapper = mount(<Test />)
    const target = () => wrapper.find("h1")

    expect(renders).toBe(1)
    expect(target().text()).toBe("1")

    act(() => value.set(2))

    expect(value.get()).toBe(2)
    expect(target().text()).toBe("2")
    expect(renders).toBe(2)

    act(() => receivedValue.set(1))

    expect(value.get()).toBe(1)
    expect(target().text()).toBe("1")
    expect(renders).toBe(3)

    act(() => value.set(2))

    expect(target().text()).toBe("2")
    expect(value.get()).toBe(2)
    expect(renders).toBe(4)
  })
})
