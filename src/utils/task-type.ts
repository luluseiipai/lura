import { useQuery } from 'react-query'
import { TaskTypes } from 'types/task-type'
import { useHttp } from './http'

export const useTaskType = () => {
  const client = useHttp()

  return useQuery<TaskTypes[]>(['taskTypes'], () => client('taskTypes'))
}
