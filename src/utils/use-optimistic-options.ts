import { QueryKey, useQueryClient } from 'react-query'
import { Project } from 'types/project'

// react-query -> useMutation config 抽离
// callback 用于处理旧数据
export const useConfig = (queryKey: QueryKey, callback: (target: any, old?: any[]) => any[]) => {
  const queryClient = useQueryClient()

  return {
    onSuccess: () => queryClient.invalidateQueries(queryKey),
    async onMutate(target: any) {
      const previousItems = queryClient.getQueryData(queryKey)
      queryClient.setQueryData(queryKey, (old?: any[]) => {
        return callback(target, old)
      })
      return { previousItems }
    },
    onError(err: any, newItem: any, context: any) {
      // 出错回滚
      queryClient.setQueryData(queryKey, (context as { previousItems: Project[] }).previousItems)
    },
  }
}

export const useDeleteConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => old?.filter((item) => item.id !== target.id) || [])
export const useEditConfig = (queryKey: QueryKey) =>
  useConfig(
    queryKey,
    (target, old) =>
      old?.map((item) => (item.id === target.id ? { ...item, ...target } : item)) || []
  )
export const useAddConfig = (queryKey: QueryKey) =>
  useConfig(queryKey, (target, old) => (old ? [...old, target] : []))
