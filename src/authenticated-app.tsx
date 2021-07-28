import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screens/project-list'
import { Row } from 'components/lib'

import styled from '@emotion/styled'

export const AuthenticatedApp = () => {
  const { logout } = useAuth()

  return (
    <Container>
      <Header between={true}>
        <HeaderLeft gap={true}>
          <h3>logo</h3>
          <h3>项目</h3>
          <h3>用户</h3>
        </HeaderLeft>
        <HeaderRight>
          <button onClick={logout}>登出</button>
        </HeaderRight>
      </Header>
      <Main>
        <ProjectListScreen />
      </Main>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
`

const Header = styled(Row)``
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main``
