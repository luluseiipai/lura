import { useMemo, useState } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject, subset } from 'utils'

/**
 * 返回页面 url 中，指定键的参数值
 */
export const useUrlQueryParam = <T extends string>(keys: T[]) => {
  const [searchParams] = useSearchParams()
  const setSearchParams = useSetUrlSearchParam()
  const [stateKeys] = useState(keys)
  return [
    useMemo(
      () => subset(Object.fromEntries(searchParams), stateKeys) as { [key in T]: string },
      [stateKeys, searchParams]
    ),
    (params: Partial<{ [key in T]: unknown }>) => {
      return setSearchParams(params)
    },
  ] as const
}

export const useSetUrlSearchParam = () => {
  const [searchParams, setSearchParams] = useSearchParams()
  return (params: { [key in string]: unknown }) => {
    const o = cleanObject({
      ...Object.fromEntries(searchParams),
      ...params,
    }) as URLSearchParamsInit
    return setSearchParams(o)
  }
}
