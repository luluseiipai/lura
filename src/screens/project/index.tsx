import styled from '@emotion/styled'
import { Menu } from 'antd'
import { Link, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { EpicScreen } from 'screens/epic'
import { KanBanScreen } from 'screens/kanban'

const useRouteType = () => {
  const units = useLocation().pathname.split('/')
  return units[units.length - 1]
}

export const ProjectScreen = () => {
  const routeType = useRouteType()

  return (
    <Container>
      <Aside>
        <Menu mode="inline" selectedKeys={[routeType]}>
          <Menu.Item key="kanban">
            <Link to="kanban">看板</Link>
          </Menu.Item>
          <Menu.Item key="epic">
            <Link to="epic">任务组</Link>
          </Menu.Item>
        </Menu>
      </Aside>
      <Main>
        <Routes>
          <Route path="/kanban" element={<KanBanScreen />} />
          <Route path="/epic" element={<EpicScreen />} />
          <Navigate to={window.location.pathname + '/kanban'} replace />
        </Routes>
      </Main>
    </Container>
  )
}

const Aside = styled.aside`
  display: flex;
  background-color: rgba(244, 245, 247);
`

const Main = styled.div`
  display: flex;
  box-shadow: -5px 0 5px -5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
`

const Container = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 16rem 1fr;
`
