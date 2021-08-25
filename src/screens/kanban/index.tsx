import styled from '@emotion/styled'
import { Spin } from 'antd'
import { Drag, Drop, DropChild } from 'components/drap-and-drop'
import { ScreenContainer } from 'components/lib'
import { DragDropContext } from 'react-beautiful-dnd'
import { useDocumentTitle } from 'utils'
import { useKanban } from 'utils/kanban'
import { useTasks } from 'utils/task'
import { CreateKanban } from './create-kanban'
import { KanbanColumn } from './kanban-column'
import { SearchPanel } from './search-panel'
import { TaskModal } from './task-modal'
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from './util'

export const KanBanScreen = () => {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans = [], isLoading: kanbanIsLoading } = useKanban(useKanbanSearchParams())
  const { isLoading: taskIsLoading } = useTasks(useTasksSearchParams())
  const isLoading = taskIsLoading || kanbanIsLoading

  return (
    <DragDropContext onDragEnd={() => {}}>
      <ScreenContainer>
        <h1>{currentProject?.name}看板</h1>
        <SearchPanel />
        {isLoading ? (
          <Spin size="large" />
        ) : (
          <Drop type="COLUMN" direction="horizontal" droppableId="kanban">
            <ColumnContainer>
              {kanbans.map((kanban, index) => (
                <Drag key={kanban.id} draggableId={`kanban${kanban.id}`} index={index}>
                  <KanbanColumn kanban={kanban} key={kanban.id} />
                </Drag>
              ))}
              <CreateKanban />
            </ColumnContainer>
          </Drop>
        )}
        <TaskModal />
      </ScreenContainer>
    </DragDropContext>
  )
}

const ColumnContainer = styled(DropChild)`
  display: flex;
  flex: 1;
  overflow-x: scroll;
`
