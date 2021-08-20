import styled from '@emotion/styled'
import { ScreenContainer } from 'components/lib'
import { useDocumentTitle } from 'utils'
import { useKanban } from 'utils/kanban'
import { KanbanColumn } from './kanban-column'
import { SearchPanel } from './search-panel'
import { useKanbanSearchParams, useProjectInUrl } from './util'

export const KanBanScreen = () => {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans = [] } = useKanban(useKanbanSearchParams())

  return (
    <ScreenContainer>
      <h1>{currentProject?.name}看板</h1>
      <SearchPanel />
      <ColumnContainer>
        {kanbans.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnContainer>
    </ScreenContainer>
  )
}

const ColumnContainer = styled.div`
  display: flex;
  flex: 1;
  overflow-x: scroll;
`
