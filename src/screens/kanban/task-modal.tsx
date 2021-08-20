import { Form, Input, Modal } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { TaskTypeSelect } from 'components/task-type-select'
import { UserSelect } from 'components/user-select'
import { useEffect } from 'react'
import { useEditTask } from 'utils/task'
import { useTaskModal, useTasksQueryKey } from './util'

const layout = {
  labelCol: { span: 8 },
  wrapperCol: { col: 16 },
}

export const TaskModal = () => {
  const [form] = useForm()
  const { editingTaskId, editingTask, close } = useTaskModal()
  const { mutateAsync: editTask, isLoading: editLoading } = useEditTask(useTasksQueryKey())

  const onCancel = () => {
    close()
    form.resetFields()
  }

  const onOk = async () => {
    await editTask({ ...editTask, ...form.getFieldsValue() })
    close()
  }

  useEffect(() => {
    form.setFieldsValue(editingTask)
  }, [editingTask, form])

  return (
    <Modal
      okText="确认"
      cancelText="取消"
      title="编辑任务"
      forceRender
      confirmLoading={editLoading}
      visible={Boolean(editingTaskId)}
      onOk={onOk}
      onCancel={onCancel}
      {...layout}
    >
      <Form initialValues={editingTask} form={form}>
        <Form.Item label="任务名" name="name" rules={[{ required: true, message: '请输入任务名' }]}>
          <Input />
        </Form.Item>
        <Form.Item label="经办人" name="processorId">
          <UserSelect defaultOptionName="经办人" />
        </Form.Item>
        <Form.Item label="类型" name="typeId">
          <TaskTypeSelect defaultOptionName="任务类型" />
        </Form.Item>
      </Form>
    </Modal>
  )
}
