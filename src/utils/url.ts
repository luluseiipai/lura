import { useMemo, useState } from 'react'
import { URLSearchParamsInit, useSearchParams } from 'react-router-dom'
import { cleanObject, subset } from 'utils'

/**
 * 返回页面 url 中，指定键的参数值
 */
export const useUrlQueryParam = <T extends string>(keys: T[]) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const [stateKeys] = useState(keys)
  return [
    useMemo(
      () => subset(Object.fromEntries(searchParams), stateKeys) as { [key in T]: string },
      [stateKeys, searchParams]
    ),
    (params: Partial<{ [K in T]: unknown }>) => {
      const o = cleanObject({
        ...Object.fromEntries(searchParams),
        ...params,
      }) as URLSearchParamsInit
      return setSearchParams(o)
    },
  ] as const
}
