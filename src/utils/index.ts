import { useEffect, useRef, useState } from 'react'

export const isFalsy = (value: unknown) => (value === 0 ? false : !value)
export const isVoid = (value: unknown) => value === undefined || value === null || value === ''

// 在一个函数里，改变传入的对象本身是不好的
export const cleanObject = (object?: { [key: string]: unknown }) => {
  if (!object) {
    return {}
  }
  const result = { ...object }
  Object.keys(result).forEach((key) => {
    const value = result[key]
    if (isVoid(value)) {
      delete result[key]
    }
  })
  return result
}

export const useDebounce = <T>(value: T, delay = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => clearTimeout(timeout)
  }, [value, delay])

  return debouncedValue
}

export const useArray = <T>(initialArray: T[]) => {
  const [value, setValue] = useState(initialArray)
  return {
    value,
    clear: () => {
      setValue([])
    },
    removeIndex: (index: number) => {
      setValue((preList) => {
        const list = preList
        list.splice(index, 1)
        return list
      })
    },
    add: (data: T) => {
      setValue([...value, data])
    },
  }
}

export const useDocumentTitle = (title: string, keepOnUnMount = true) => {
  const oldTitle = useRef(document.title).current
  // 页面加载时: 旧title
  // 加载后：新title

  useEffect(() => {
    document.title = title
  }, [title])

  useEffect(() => {
    return () => {
      if (!keepOnUnMount) {
        // 如果不指定依赖，读到的就是旧title
        document.title = oldTitle
      }
    }
  }, [keepOnUnMount, oldTitle])
}

export const resetRoute = () => (window.location.href = window.location.origin)
