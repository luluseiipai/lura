import { useQuery } from 'react-query'
import { Kanban } from 'types/kanban'
import { cleanObject } from 'utils'
import { useHttp } from './http'

export const useKanban = (param?: Partial<Kanban>) => {
  const client = useHttp()

  return useQuery<Kanban[], Error>(['kanbans', param], () =>
    client('kanbans', { data: cleanObject(param || {}) })
  )
}
