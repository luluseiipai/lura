import { FC } from 'react'
import { Kanban } from 'types/kanban'
import { useTask } from 'utils/task'
import { useTasksSearchParams } from './util'

export const KanbanColumn: FC<{ kanban: Kanban }> = ({ kanban }) => {
  const { data: allTasks } = useTask(useTasksSearchParams())
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)

  return (
    <div>
      <h3>{kanban.name}</h3>
      {tasks?.map((task) => (
        <div key={task.id}>{task.name}</div>
      ))}
    </div>
  )
}
