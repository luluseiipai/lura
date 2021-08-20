import { QueryKey, useMutation, useQuery } from 'react-query'
import { Task } from 'types/task'
import { cleanObject } from 'utils'
import { useHttp } from './http'
import { useAddConfig } from './use-optimistic-options'

export const useTask = (param?: Partial<Task>) => {
  const client = useHttp()

  return useQuery<Task[], Error>(['tasks', param], () =>
    client('tasks', { data: cleanObject(param || {}) })
  )
}

export const useAddTask = (queryKey: QueryKey) => {
  const client = useHttp()

  return useMutation(
    (params: Partial<Task>) => client(`tasks`, { method: 'POST', data: params }),
    useAddConfig(queryKey)
  )
}
