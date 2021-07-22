import { useState, useEffect } from 'react'
import * as qs from 'qs'
import { List } from './list'
import { SearchPanel } from './search-panel'
import { cleanObject, useDebounce } from 'utils'

const apiUrl = process.env.REACT_APP_API_URL

export const ProjectListScreen = () => {
  const [list, setList] = useState([])
  const [users, setUsers] = useState([])
  const [param, setParam] = useState({
    name: '',
    personId: '',
  })
  const debounceParam = useDebounce(param, 1000)

  useEffect(() => {
    fetch(`${apiUrl}/projects?${qs.stringify(cleanObject(debounceParam))}`).then(async (res) => {
      if (res.ok) {
        setList(await res.json())
      }
    })
  }, [debounceParam])

  useEffect(() => {
    fetch(`${apiUrl}/users`).then(async (res) => {
      if (res.ok) {
        setUsers(await res.json())
      }
    })
  }, [])

  return (
    <div>
      <SearchPanel param={param} users={users} setParam={setParam} />
      <List list={list} users={users} />
    </div>
  )
}
