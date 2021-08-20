import styled from '@emotion/styled'
import { Spin } from 'antd'
import { ScreenContainer } from 'components/lib'
import { useDocumentTitle } from 'utils'
import { useKanban } from 'utils/kanban'
import { useTask } from 'utils/task'
import { CreateKanban } from './create-kanban'
import { KanbanColumn } from './kanban-column'
import { SearchPanel } from './search-panel'
import { useKanbanSearchParams, useProjectInUrl, useTasksSearchParams } from './util'

export const KanBanScreen = () => {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans = [], isLoading: kanbanIsLoading } = useKanban(useKanbanSearchParams())
  const { isLoading: taskIsLoading } = useTask(useTasksSearchParams())
  const isLoading = taskIsLoading || kanbanIsLoading

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      {isLoading ? (
        <Spin size="large" />
      ) : (
        <ColumnContainer>
          {kanbans.map((kanban) => (
            <KanbanColumn kanban={kanban} key={kanban.id} />
          ))}
          <CreateKanban />
        </ColumnContainer>
      )}
    </ScreenContainer>
  )
}

const ColumnContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
`
