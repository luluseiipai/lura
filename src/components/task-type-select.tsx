import { ComponentProps } from 'react'
import { useTaskType } from 'utils/task-type'
import { IdSelect } from './id-select'

export const TaskTypeSelect = (props: ComponentProps<typeof IdSelect>) => {
  const { data: taskTypes } = useTaskType()
  return <IdSelect options={taskTypes || []} {...props} />
}
