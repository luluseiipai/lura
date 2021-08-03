import { useAuth } from 'context/auth-context'
import { Row } from 'components/lib'
import { ProjectListScreen } from 'screens/project-list'
import { ProjectScreen } from 'screens/project'
import { Navigate, Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'

import styled from '@emotion/styled'
import { ReactComponent as SoftwareLogo } from 'assets/software-logo.svg'
import { Button, Dropdown, Menu } from 'antd'
import { resetRoute } from 'utils'

const PageHeader = () => {
  const { logout, user } = useAuth()

  return (
    <Header between={true}>
      <HeaderLeft gap={true}>
        <Button type="link" onClick={resetRoute}>
          <SoftwareLogo width="18rem" color="rgb(38, 132, 255)" />
        </Button>
        <h3>项目</h3>
        <h3>用户</h3>
      </HeaderLeft>
      <HeaderRight>
        <Dropdown
          overlay={
            <Menu>
              <Menu.Item key="logout">
                <Button type="link" onClick={logout}>
                  登出
                </Button>
              </Menu.Item>
            </Menu>
          }
        >
          <Button type="link" onClick={(e) => e.preventDefault()}>
            Hi, {user?.name}
          </Button>
        </Dropdown>
      </HeaderRight>
    </Header>
  )
}

export const AuthenticatedApp = () => {
  return (
    <Container>
      <PageHeader />
      <Main>
        <BrowserRouter>
          <Routes>
            <Route path="/projects" element={<ProjectListScreen />} />
            <Route path="/projects/:projectId/*" element={<ProjectScreen />} />
            <Navigate to={'/projects'} />
          </Routes>
        </BrowserRouter>
      </Main>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
`

const Header = styled(Row)`
  padding: 3.2rem;
  box-shadow: 0 0 5px 0 rgba(0, 0, 0, 0.1);
  z-index: 1;
`
const HeaderLeft = styled(Row)``
const HeaderRight = styled.div``
const Main = styled.main``
