import { useState, useEffect } from 'react'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { cleanObject, useDebounce } from 'utils'
import { useHttp } from 'utils/http'

export const ProjectListScreen = () => {
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })

  const debounceParam = useDebounce(param, 1000)
  const client = useHttp()

  useEffect(() => {
    client('projects', { data: cleanObject(debounceParam) }).then(setList)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debounceParam])

  useEffect(() => {
    client('users').then(setUsers)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
    <div>
      <SearchPanel param={param} users={users} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  )
}
