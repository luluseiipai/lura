import styled from '@emotion/styled'
import { useDocumentTitle } from 'utils'
import { useKanban } from 'utils/kanban'
import { KanbanColumn } from './kanban-column'
import { useKanbanSearchParams, useProjectInUrl } from './util'

export const KanBanScreen = () => {
  useDocumentTitle('看板列表')

  const { data: currentProject } = useProjectInUrl()
  const { data: kanbans = [] } = useKanban(useKanbanSearchParams())

  return (
    <div>
      <h1>{currentProject?.name}看板</h1>
      <ColumnContainer>
        {kanbans.map((kanban) => (
          <KanbanColumn kanban={kanban} key={kanban.id} />
        ))}
      </ColumnContainer>
    </div>
  )
}

const ColumnContainer = styled.div`
  display: flex;
  overflow: hidden;
  margin-right: 2rem;
`
