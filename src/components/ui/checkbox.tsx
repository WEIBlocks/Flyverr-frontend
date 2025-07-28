import * as React from "react"
import { Check } from "lucide-react"

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & {
    checked?: boolean
    onCheckedChange?: (checked: boolean) => void
  }
>(({ className, checked, onCheckedChange, ...props }, ref) => {
  return (
    <div className="relative">
      <input
        type="checkbox"
        ref={ref}
        checked={checked}
        onChange={(e) => onCheckedChange?.(e.target.checked)}
        className="sr-only"
        {...props}
      />
      <div
        className={`w-4 h-4 border-2 rounded flex items-center justify-center cursor-pointer transition-colors ${
          checked
            ? 'bg-blue-600 border-blue-600'
            : 'bg-white border-gray-300 hover:border-blue-500'
        } ${className || ''}`}
        onClick={() => onCheckedChange?.(!checked)}
      >
        {checked && <Check className="w-3 h-3 text-white" />}
      </div>
    </div>
  )
})
Checkbox.displayName = "Checkbox"

export { Checkbox }