import { useAuth } from 'context/auth-context'
import { ProjectListScreen } from 'screens/project-list'

import styled from '@emotion/styled'

export const AuthenticatedApp = () => {
  const { logout } = useAuth()

  return (
    <Container>
      <Header>
        <button onClick={logout}>登出</button>
      </Header>
      <Nav>nav</Nav>
      <Main>
        <ProjectListScreen />
      </Main>
      <Aside>aside</Aside>
      <Footer>footer</Footer>
    </Container>
  )
}

const Container = styled.div`
  height: 100vh;
  display: grid;
  grid-template-rows: 6rem 1fr 6rem;
  grid-template-columns: 20rem 1fr 20rem;
  grid-template-areas:
    'header header header'
    'nav main aside'
    'footer footer footer';
  grid-gap: 2px;
`

// grid-area: 用来给 grid 子元素起名字
const Header = styled.header`
  grid-area: header;
  display: flex;
`
const Main = styled.main`
  grid-area: main;
`
const Nav = styled.nav`
  grid-area: nav;
`
const Aside = styled.aside`
  grid-area: aside;
`
const Footer = styled.footer`
  grid-area: footer;
`
