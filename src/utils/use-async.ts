import { useCallback, useReducer, useState } from 'react'
import { useMountedRef } from 'utils'

interface State<T> {
  error: Error | null
  data: T | null
  status: 'idle' | 'loading' | 'error' | 'success'
}

const defaultInitialState: State<null> = {
  status: 'idle',
  data: null,
  error: null,
}

const defaultConfig = {
  throwOnError: false,
}

const useSafeDispatch = <T>(dispatch: (...args: T[]) => void) => {
  const mountedRef = useMountedRef()
  return useCallback(
    (...args) => {
      mountedRef.current ? dispatch(...args) : void 0
    },
    [dispatch, mountedRef]
  )
}

export const useAsync = <T>(initialState?: State<T>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initialConfig }
  const [state, dispatch] = useReducer(
    (state: State<T>, action: Partial<State<T>>) => ({ ...state, ...action }),
    {
      ...defaultInitialState,
      ...initialState,
    }
  )
  const safeDispatch = useSafeDispatch(dispatch)
  const [retry, setRetry] = useState(() => () => {})

  const setData = useCallback(
    (data: T) =>
      safeDispatch({
        data,
        status: 'success',
        error: null,
      }),
    [safeDispatch]
  )

  const setError = useCallback(
    (error: Error) =>
      safeDispatch({
        error,
        status: 'error',
        data: null,
      }),
    [safeDispatch]
  )

  // run 用来出发异步请求
  const run = useCallback(
    (promise: Promise<T>, runConfig?: { retry: () => Promise<T> }) => {
      if (!promise || !promise.then) {
        throw new Error('请传入 Promise 类型数据')
      }
      setRetry(() => () => {
        if (runConfig?.retry) {
          run(runConfig?.retry(), runConfig)
        }
      })
      safeDispatch({ status: 'loading' })
      return promise
        .then((data) => {
          setData(data)
          return data
        })
        .catch((err) => {
          setError(err)
          if (config.throwOnError) {
            return Promise.reject(err)
          }
          return err
        })
    },
    [config.throwOnError, safeDispatch, setData, setError]
  )

  return {
    isIdle: state.status === 'idle',
    isLoading: state.status === 'loading',
    isError: state.status === 'error',
    isSuccess: state.status === 'success',
    run,
    setData,
    setError,
    // retry 被调用时，重新跑一次 run，让 state 刷新一遍
    retry,
    ...state,
  }
}
