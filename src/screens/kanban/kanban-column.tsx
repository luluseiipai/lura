import { FC } from 'react'
import { Kanban } from 'types/kanban'
import { useTasks } from 'utils/task'
import { useTaskType } from 'utils/task-type'
import { useKanbanQueryKey, useTaskModal, useTasksSearchParams } from './util'
import { ReactComponent as TaskIcon } from 'assets/task.svg'
import { ReactComponent as BugIcon } from 'assets/bug.svg'
import styled from '@emotion/styled'
import { Button, Card, Dropdown, Menu, Modal } from 'antd'
import { CreateTask } from './create-task'
import { Task } from 'types/task'
import { Mark } from 'components/mark'
import { useDeleteKanban } from 'utils/kanban'
import { Row } from 'components/lib'

const TaskTypeIcon: FC<{ id: number }> = ({ id }) => {
  const { data: taskTypes } = useTaskType()
  const name = taskTypes?.find((taskType) => taskType.id === id)?.name
  if (!name) return null
  return name === 'task' ? <TaskIcon /> : <BugIcon />
  // return <img src={name === 'task' ? taskIcon : bugIcon} alt="task-icon" />
}

const TaskCard: FC<{ task: Task }> = ({ task }) => {
  const { startEdit } = useTaskModal()
  const { name: keyword } = useTasksSearchParams()

  return (
    <Card
      style={{ marginBottom: '0.5rem', cursor: 'pointer' }}
      key={task.id}
      onClick={() => startEdit(task.id)}
    >
      <p>
        <Mark name={task.name} keyword={keyword} />
      </p>
      <TaskTypeIcon id={task.typeId} />
    </Card>
  )
}

export const KanbanColumn: FC<{ kanban: Kanban }> = ({ kanban }) => {
  const { data: allTasks } = useTasks(useTasksSearchParams())
  const tasks = allTasks?.filter((task) => task.kanbanId === kanban.id)

  return (
    <Container>
      <Row between>
        <h3>{kanban.name}</h3>
        <More kanban={kanban} />
      </Row>
      <TaskContainer>
        {tasks?.map((task) => (
          <TaskCard task={task} />
        ))}
        <CreateTask kanbanId={kanban.id} />
      </TaskContainer>
    </Container>
  )
}

const More = ({ kanban }: { kanban: Kanban }) => {
  const { mutateAsync: deleteKanban } = useDeleteKanban(useKanbanQueryKey())

  const startDelete = () => {
    Modal.confirm({
      okText: '确定',
      cancelText: '取消',
      title: '确定删除看板吗？',
      onOk() {
        return deleteKanban({ id: kanban.id })
      },
    })
  }

  const overlay = (
    <Menu>
      <Menu.Item>
        <Button type="link" onClick={startDelete}>
          删除
        </Button>
      </Menu.Item>
    </Menu>
  )

  return (
    <Dropdown overlay={overlay}>
      <Button type="link">...</Button>
    </Dropdown>
  )
}

export const Container = styled.div`
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
