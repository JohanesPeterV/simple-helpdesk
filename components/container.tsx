import { FunctionComponent, HTMLAttributes } from 'react'

const Container: FunctionComponent<HTMLAttributes<HTMLDivElement>> = ({
  className,
  children,
  ...rest
}) => (
  <div
    {...rest}
    className={`max-w-7xl py-8 px-12 md:px-16 py-2 w-full min-w-full ${className}`}
  >
    {children}
  </div>
)

export default Container
