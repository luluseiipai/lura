import { Button, Drawer } from 'antd'
import { useProjectModal } from './util'

export const ProjectModel = () => {
  const { projectModalOpen, close } = useProjectModal()

  return (
    <Drawer visible={projectModalOpen} width="100%" onClose={close}>
      <h1>project model</h1>
      <Button onClick={close}>关闭</Button>
    </Drawer>
  )
}
