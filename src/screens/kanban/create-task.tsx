import { FC, useEffect, useState } from 'react'
import { useAddTask } from 'utils/task'
import { useProjectIdInUrl, useTasksQueryKey } from './util'
import { PlusOutlined } from '@ant-design/icons'
import { Card, Input } from 'antd'

export const CreateTask: FC<{ kanbanId: number }> = ({ kanbanId }) => {
  const [name, setName] = useState('')
  const { mutateAsync: addTask } = useAddTask(useTasksQueryKey())
  const projectId = useProjectIdInUrl()
  const [inputMode, setInputMode] = useState(false)

  const submit = async () => {
    await addTask({ projectId, name, kanbanId })
    setInputMode(false)
    setName('')
  }

  const toggle = () => setInputMode((mode) => !mode)

  useEffect(() => {
    if (!inputMode) {
      setName('')
    }
  }, [inputMode])

  if (!inputMode) {
    return (
      <div onClick={toggle}>
        <PlusOutlined />
        创建事物
      </div>
    )
  }
  return (
    <Card>
      <Input
        onBlur={toggle}
        placeholder="需要做什么"
        autoFocus={true}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Card>
  )
}
