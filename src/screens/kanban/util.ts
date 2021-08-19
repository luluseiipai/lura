import { useMemo } from 'react'
import { useLocation } from 'react-router'
import { useProject } from 'utils/project'
import { useUrlQueryParam } from 'utils/url'

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
export const useTasksSearchParams = () => {
  const [param] = useUrlQueryParam(['name', 'typeId', 'processorId', 'tagId'])
  const projectId = useProjectIdInUrl()
  return useMemo(
    () => ({
      projectId,
      typeId: Number(param.typeId) || undefined,
      processorId: Number(param.processorId) || undefined,
      tagId: Number(param.tagId) || undefined,
      name: param.name,
    }),
    [projectId, param]
  )
}

/**任务queryKey */
export const useTasksQueryKey = () => ['tasks', useTasksSearchParams()]
