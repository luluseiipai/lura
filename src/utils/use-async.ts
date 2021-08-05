import { useState } from 'react'

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

export const useAsync = <T>(initialState?: State<T>, initialConfig?: typeof defaultConfig) => {
  const config = { ...defaultConfig, ...initialConfig }
  const [state, setState] = useState<State<T>>({
    ...defaultInitialState,
    ...initialState,
  })
  const [retry, setRetry] = useState(() => () => {})

  const setData = (data: T) =>
    setState({
      data,
      status: 'success',
      error: null,
    })

  const setError = (error: Error) =>
    setState({
      error,
      status: 'error',
      data: null,
    })

  // run 用来出发异步请求
  const run = (promise: Promise<T>, runConfig?: { retry: () => Promise<T> }) => {
    if (!promise || !promise.then) {
      throw new Error('请传入 Promise 类型数据')
    }
    setRetry(() => () => {
      if (runConfig?.retry) {
        run(runConfig?.retry(), runConfig)
      }
    })
    setState({ ...state, status: 'loading' })
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
  }

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
