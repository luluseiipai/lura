import { List } from './list'
import { SearchPanel } from './search-panel'
import { ButtonNoPadding, Row } from 'components/lib'
import { useDebounce, useDocumentTitle } from 'utils'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useProjectModal, useProjectsSearchParams } from './util'

import styled from '@emotion/styled'
import { Typography } from 'antd'

export const ProjectListScreen = () => {
  useDocumentTitle('项目列表', false)

  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list, retry } = useProjects(useDebounce(param))
  const { data: users } = useUsers()
  const { open } = useProjectModal()

  return (
    <Container>
      <Row>
        <h1>项目列表</h1>
        <ButtonNoPadding type="link" onClick={open}>
          创建项目
        </ButtonNoPadding>
      </Row>
      <SearchPanel param={param} users={users || []} setParam={setParam} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List loading={isLoading} dataSource={list || []} users={users || []} refresh={retry} />
    </Container>
  )
}

// ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`
