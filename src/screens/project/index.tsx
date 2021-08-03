import { Link, Navigate, Route, Routes } from 'react-router-dom'
import { EpicScreen } from 'screens/epic'
import { KanBanScreen } from 'screens/kanban'

export const ProjectScreen = () => {
  return (
    <div>
      <h1>project screen</h1>
      <Link to="kanban">看板</Link>
      <Link to="epic">任务组</Link>
      <Routes>
        <Route path="/kanban" element={<KanBanScreen />} />
        <Route path="/epic" element={<EpicScreen />} />
        <Navigate to={window.location.pathname + '/kanban'} />
      </Routes>
    </div>
  )
}
