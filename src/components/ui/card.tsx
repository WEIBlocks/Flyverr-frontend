import * as React from "react"

const Card = React.forwardRef<HTMLDivElement, React.HTMLAttributes<HTMLDivElement>>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={`bg-white dark:bg-card rounded-xl shadow-lg p-8 ${className || ''}`}
    {...props}
  />
))
Card.displayName = "Card"

export { Card } 