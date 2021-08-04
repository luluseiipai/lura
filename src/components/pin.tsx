import { ComponentProps, FC } from 'react'
import { Rate } from 'antd'

interface PinProps extends ComponentProps<typeof Rate> {
  checked: boolean
  onCheckChange?: (checked: boolean) => void
}

export const Pin: FC<PinProps> = (props) => {
  const { checked, onCheckChange, ...restProps } = props
  return (
    <Rate
      count={1}
      value={checked ? 1 : 0}
      onChange={(num) => onCheckChange?.(!!num)}
      {...restProps}
    />
  )
}
