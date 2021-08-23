import { FC } from 'react'

export const Mark: FC<{ name: string; keyword: string }> = ({ name, keyword }) => {
  if (!keyword) {
    return <>{name}</>
  }
  const arr = name.split(keyword)

  return (
    <>
      {arr.map((str: string, index: number) => (
        <span key={index}>
          {str}
          {index === arr.length - 1 ? null : <span style={{ color: '#257afd' }}>{keyword}</span>}
        </span>
      ))}
    </>
  )
}
