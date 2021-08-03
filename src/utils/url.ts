import { useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

/**
 * @param keys 传递的参数数据
 * @description 返回页面 url 中，指定键的参数值
 */
export const useUrlQueryParam = <T extends string>(keys: T[]) => {
  const [searchParams, setSearchParams] = useSearchParams()

  return [
    useMemo(
      () =>
        keys.reduce((prev, key) => {
          return {
            ...prev,
            [key]: searchParams.get(key) || '',
          }
        }, {} as { [key in T]: string }),
      // eslint-disable-next-line react-hooks/exhaustive-deps
      [searchParams]
    ),
    setSearchParams,
  ] as const
}
