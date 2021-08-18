import { useLocation } from 'react-router'
import { useProject } from 'utils/project'

export const useProjectIdInUrl = () => {
  const { pathname } = useLocation()
  const id = pathname.match(/projects\/(\d+)/)?.[1]
  return Number(id)
}

/**根据url的projectId获取project数据 */
export const useProjectInUrl = () => useProject(useProjectIdInUrl())

/**看板搜索参数 */
export const useKanbanSearchParams = () => ({ projectId: useProjectIdInUrl() })

/**看板queryKey */
export const useKanbanQueryKey = () => ['kanbans', useKanbanSearchParams()]

/**任务搜索参数 */
export const useTasksSearchParams = () => ({ projectId: useProjectIdInUrl() })

/**任务queryKey */
export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]
