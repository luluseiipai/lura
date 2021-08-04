import { FC } from 'react'
import { Raw } from 'types'
import { Select } from 'antd'

type SelectProps = React.ComponentProps<typeof Select>

interface IdSelectProps extends Omit<SelectProps, 'options' | 'value' | 'onChange'> {
  value?: Raw | null | undefined
  onChange?: (value?: number) => void
  defaultOptionName?: string
  options?: { name: string; id: number }[]
}

/**
 * value 可以穿入多种类型的值
 * onChange 只会回调 number | undefined 类型
 * 当 isNaN(Number(value)) 为 true 的时候，代表选择默认类型
 * 当选择默认类型，onChange 会回调 undefined
 * @param props
 */
export const IdSelect: FC<IdSelectProps> = (props) => {
  const { value, onChange, options, defaultOptionName, ...resetProps } = props
  return (
    <Select
      value={options?.length ? toNumber(value) : 0}
      onChange={(value) => onChange?.(toNumber(value) || undefined)}
      {...resetProps}
    >
      {defaultOptionName ? <Select.Option value={0}>{defaultOptionName}</Select.Option> : null}
      {options?.map((option) => (
        <Select.Option key={option.id} value={option.id}>
          {option.name}
        </Select.Option>
      ))}
    </Select>
  )
}

const toNumber = (value: unknown) => (isNaN(Number(value)) ? 0 : Number(value))
