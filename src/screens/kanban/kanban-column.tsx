import { FC } from 'react'
import { Kanban } from 'types/kanban'
import { useTask } from 'utils/task'
import { useTaskType } from 'utils/task-type'
import { useTasksSearchParams } from './util'
import { ReactComponent as TaskIcon } from 'assets/task.svg'
import { ReactComponent as BugIcon } from 'assets/bug.svg'
import styled from '@emotion/styled'
import { Card } from 'antd'

const TaskTypeIcon: FC<{ id: number }> = ({ id }) => {
  const { data: taskTypes } = useTaskType()
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name
  if (!name) return null
  return name === 'task' ? <TaskIcon /> : <BugIcon />
  // return <img src={name === 'task' ? taskIcon : bugIcon} alt="task-icon" />
}

export const KanbanColumn: FC<{ kanban: Kanban }> = ({ kanban }) => {
  const { data: allTasks } = useTask(useTasksSearchParams())
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)

  return (
    <Container>
      <h3>{kanban.name}</h3>
      <TaskContainer>
        {tasks?.map((task) => (
          <Card style={{ marginBottom: '0.5rem' }} key={task.id}>
            <div>{task.name}</div>
            <TaskTypeIcon id={task.typeId} />
          </Card>
        ))}
      </TaskContainer>
    </Container>
  )
}

const Container = styled.div`
  min-width: 27rem;
  padding: 0.7rem 0.7rem 1rem;
  margin-right: 1.5rem;
  display: flex;
  flex-direction: column;
  border-radius: 6px;
  background-color: rgb(244, 245, 247);
`
export const TaskContainer = styled.div`
  overflow: scroll;
  flex: 1;
  ::-webkit-scrollbar {
    display: none;
  }
`
