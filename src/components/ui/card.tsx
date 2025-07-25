import * as React from "react"

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {}

const Card = React.forwardRef<HTMLDivElement, CardProps>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`bg-white dark:bg-card rounded-xl shadow-lg p-8 ${className || ''}`}
    {...props}
  />
))
Card.displayName = "Card"

export { Card } 