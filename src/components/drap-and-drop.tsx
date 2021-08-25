/**  * 预包装拖拽组件  */
import React, { ReactNode } from 'react'
import {
  Draggable,
  DraggableProps,
  Droppable,
  DroppableProps,
  DroppableProvided,
  DroppableProvidedProps,
} from 'react-beautiful-dnd'

type DropProps = Omit<DroppableProps, 'children'> & { children: ReactNode }
// 提前封装将 props 传给子元素
export const Drop = ({ children, ...restProps }: DropProps) => {
  return (
    <Droppable {...restProps}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.droppableProps,
            ref: provided.innerRef,
            provided,
          })
        }
        return <div />
      }}
    </Droppable>
  )
}

// 与上面传入子函数的 props 匹配上
type DropChildProps = Partial<{ provided: DroppableProvided } & DroppableProvidedProps> &
  React.HTMLAttributes<HTMLDivElement>
// 透传 ref
export const DropChild = React.forwardRef<HTMLDivElement, DropChildProps>(
  ({ children, ...restProps }, ref) => (
    <div ref={ref} {...restProps}>
      {children}
      {restProps.provided?.placeholder}
    </div>
  )
)

type DragProps = Omit<DraggableProps, 'children'> & { children: ReactNode }
// 提前封装将 props 传给子元素
export const Drag = ({ children, ...restProps }: DragProps) => {
  return (
    <Draggable {...restProps}>
      {(provided) => {
        if (React.isValidElement(children)) {
          return React.cloneElement(children, {
            ...provided.draggableProps,
            ...provided.dragHandleProps,
            ref: provided.innerRef,
          })
        }
        return <div />
      }}
    </Draggable>
  )
}
