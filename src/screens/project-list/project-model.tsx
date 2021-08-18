import styled from '@emotion/styled'
import { Button, Drawer, Form, Input, Spin } from 'antd'
import { useForm } from 'antd/lib/form/Form'
import { ErrorBox } from 'components/lib'
import { UserSelect } from 'components/user-select'
import { useEffect } from 'react'
import { useAddProject, useEditProject } from 'utils/project'
import { useProjectModal, useProjectsQueryKey } from './util'

export const ProjectModel = () => {
  const [form] = useForm()
  const { projectModalOpen, close, editingProject, isLoading } = useProjectModal()
  const useMutateProject = editingProject ? useEditProject : useAddProject
  const { mutateAsync, error, isLoading: mutateLoading } = useMutateProject(useProjectsQueryKey())
  const title = editingProject ? '编辑项目' : '创建项目'

  const onFinish = (values: any) => {
    mutateAsync({ ...editingProject, ...values }).then(() => {
      form.resetFields()
      close()
    })
  }

  const closeModal = () => {
    form.resetFields()
    close()
  }

  useEffect(() => {
    form.setFieldsValue(editingProject)
  }, [editingProject, form])

  return (
    <Drawer forceRender visible={projectModalOpen} width="100%" onClose={closeModal}>
      <Container>
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <>
            <h1>{title}</h1>
            <ErrorBox error={error} />
            <Form form={form} layout="vertical" style={{ width: '40rem' }} onFinish={onFinish}>
              <Form.Item
                label="名称"
                name="name"
                rules={[{ required: true, message: '请输入项目名' }]}
              >
                <Input placeholder="请输入项目名称" />
              </Form.Item>
              <Form.Item
                label="部门"
                name="organization"
                rules={[{ required: true, message: '请输入部门名' }]}
              >
                <Input placeholder="请输入部门名称" />
              </Form.Item>
              <Form.Item label="负责人" name="personId">
                <UserSelect defaultOptionName="负责人" />
              </Form.Item>
              <Form.Item style={{ textAlign: 'center' }}>
                <Button block loading={mutateLoading} type="primary" htmlType="submit">
                  提交
                </Button>
              </Form.Item>
            </Form>
          </>
        )}
      </Container>
    </Drawer>
  )
}

const Container = styled.div`
  height: 80vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`
