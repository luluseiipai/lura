import { FC } from 'react'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { Row } from 'components/lib'
import { useDebounce, useDocumentTitle } from 'utils'
import { useProjects } from 'utils/project'
import { useUsers } from 'utils/user'
import { useProjectsSearchParams } from './util'

import styled from '@emotion/styled'
import { Button, Typography } from 'antd'

export const ProjectListScreen: FC<{ setProjectModelOpen: (isOpen: boolean) => void }> = (
  props
) => {
  useDocumentTitle('项目列表', false)

  const [param, setParam] = useProjectsSearchParams()
  const { isLoading, error, data: list, retry } = useProjects(useDebounce(param))
  const { data: users } = useUsers()

  return (
    <Container>
      <Row>
        <h1>项目列表</h1>
        <Button onClick={() => props.setProjectModelOpen(true)}>创建项目</Button>
      </Row>
      <SearchPanel param={param} users={users || []} setParam={setParam} />
      {error ? <Typography.Text type="danger">{error.message}</Typography.Text> : null}
      <List
        loading={isLoading}
        dataSource={list || []}
        users={users || []}
        refresh={retry}
        setProjectModelOpen={props.setProjectModelOpen}
      />
    </Container>
  )
}

// ProjectListScreen.whyDidYouRender = true

const Container = styled.div`
  padding: 3.2rem;
`
