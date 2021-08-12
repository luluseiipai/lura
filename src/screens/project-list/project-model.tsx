import { useDispatch, useSelector } from 'react-redux'
import { Button, Drawer } from 'antd'
import { projectListActions, selectProjectModalOpen } from './project-list.slice'

export const ProjectModel = () => {
  const dispatch = useDispatch()
  // const projectModalOpen = useSelector((state: RootState) => state.projectList.projectModalOpen)
  const projectModalOpen = useSelector(selectProjectModalOpen)

  return (
    <Drawer
      visible={projectModalOpen}
      width="100%"
      onClose={() => dispatch(projectListActions.closeProjectModal())}
    >
      <h1>project model</h1>
      <Button onClick={() => dispatch(projectListActions.closeProjectModal())}>关闭</Button>
    </Drawer>
  )
}
