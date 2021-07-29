import { useAuth } from 'context/auth-context'
import { useAsync } from 'utils/use-async'

import { LongButton } from 'unauthenticated-app'
import { Form, Input } from 'antd'

export const RegisterScreen = ({ onError }: { onError: (error: Error) => void }) => {
  const { register } = useAuth()
  const { run, isLoading } = useAsync(undefined, { throwOnError: true })

  const handleSubmit = async ({
    cPassword,
    ...values
  }: {
    username: string
    password: string
    cPassword: string
  }) => {
    // if (cPassword !== values.password) {
    //   onError(new Error('请确认两次输入的密码相同'))
    //   return
    // }
    try {
      await run(register(values))
    } catch (e) {
      onError(e)
    }
  }

  return (
    <Form onFinish={handleSubmit}>
      <Form.Item name="username" rules={[{ required: true, message: '请输入用户名' }]}>
        <Input placeholder="用户名" type="text" id="username" />
      </Form.Item>
      <Form.Item name="password" rules={[{ required: true, message: '请输入密码' }]}>
        <Input placeholder="密码" type="password" id="password" />
      </Form.Item>
      <Form.Item
        name="cPassword"
        rules={[
          { required: true, message: '请确认密码' },
          ({ getFieldValue }) => ({
            validator(_, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve()
              }
              return Promise.reject(new Error('请确认两次输入的密码相同'))
            },
          }),
        ]}
      >
        <Input placeholder="确认密码" type="password" id="cPassword" />
      </Form.Item>
      <LongButton loading={isLoading} htmlType="submit" type="primary">
        注册
      </LongButton>
    </Form>
  )
}
