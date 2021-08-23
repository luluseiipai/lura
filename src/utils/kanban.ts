import { QueryKey, useMutation, useQuery } from 'react-query'
import { Kanban } from 'types/kanban'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import { useAddConfig, useDeleteConfig } from './use-optimistic-options'

export const useKanban = (param?: Partial<Kanban>) => {
  const client = useHttp()

  return useQuery<Kanban[], Error>(['kanbans', param], () =>
    client('kanbans', { data: cleanObject(param || {}) })
  )
}

export const useAddKanban = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<Kanban>) => client(`kanbans`, { method: 'POST', data: params }),
    useAddConfig(queryKey)
  )
}

export const useDeleteKanban = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<Kanban>) => client(`kanbans/${params.id}`, { method: 'DELETE' }),
    useDeleteConfig(queryKey)
  )
}
