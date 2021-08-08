import { FC } from 'react'

import { Button, Drawer } from 'antd'

export const ProjectModel: FC<{ projectModelOpen?: boolean; onClose?: () => void }> = (props) => {
  return (
    <Drawer visible={props.projectModelOpen} width="100%" onClose={props.onClose}>
      <h1>project model</h1>
      <Button onClick={props.onClose}>关闭</Button>
    </Drawer>
  )
}
