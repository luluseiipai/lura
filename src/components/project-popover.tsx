import { FC } from 'react'
import { useProjects } from 'utils/project'

import { Divider, List, Popover, Typography } from 'antd'
import styled from '@emotion/styled'

export const ProjectPopover: FC<{ projectButton: JSX.Element }> = (props) => {
  const { data: project, isLoading } = useProjects()
  const pinnedProjects = project?.filter((project) => project.pin)

  const content = (
    <ContentContainer>
      <Typography.Text type="secondary">收藏项目</Typography.Text>
      <List>
        {pinnedProjects?.map((project) => (
          <List.Item>
            <List.Item.Meta title={project.name} />
          </List.Item>
        ))}
      </List>
      <Divider />
      {props.projectButton}
    </ContentContainer>
  )
  return (
    <Popover placement="bottom" content={content}>
      <span>项目</span>
    </Popover>
  )
}

const ContentContainer = styled.div`
  min-width: 30rem;
`
