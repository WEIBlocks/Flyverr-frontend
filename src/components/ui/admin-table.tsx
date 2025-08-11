import * as React from "react"
import { cn } from "@/lib/utils"
import { Card, CardContent } from "@/components/ui/card"

interface AdminTableProps {
  children: React.ReactNode
  className?: string
}

interface AdminTableHeaderProps {
  children: React.ReactNode
  className?: string
}

interface AdminTableBodyProps {
  children: React.ReactNode
  className?: string
}

interface AdminTableRowProps {
  children: React.ReactNode
  className?: string
  onClick?: () => void
  hoverable?: boolean
}

interface AdminTableCellProps {
  children: React.ReactNode
  className?: string
  align?: 'left' | 'center' | 'right'
}

const AdminTable = React.forwardRef<HTMLDivElement, AdminTableProps>(
  ({ children, className, ...props }, ref) => (
    <Card className={cn("border-0 bg-white dark:bg-gray-800 shadow-sm", className)} ref={ref} {...props}>
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            {children}
          </table>
        </div>
      </CardContent>
    </Card>
  )
)
AdminTable.displayName = "AdminTable"

const AdminTableHeader = React.forwardRef<HTMLTableSectionElement, AdminTableHeaderProps>(
  ({ children, className, ...props }, ref) => (
    <thead 
      className={cn(
        "bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700/80",
        "text-left text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600",
        className
      )} 
      ref={ref} 
      {...props}
    >
      {children}
    </thead>
  )
)
AdminTableHeader.displayName = "AdminTableHeader"

const AdminTableBody = React.forwardRef<HTMLTableSectionElement, AdminTableBodyProps>(
  ({ children, className, ...props }, ref) => (
    <tbody className={cn("divide-y divide-gray-100 dark:divide-gray-700/50", className)} ref={ref} {...props}>
      {children}
    </tbody>
  )
)
AdminTableBody.displayName = "AdminTableBody"

const AdminTableRow = React.forwardRef<HTMLTableRowElement, AdminTableRowProps>(
  ({ children, className, onClick, hoverable = true, ...props }, ref) => (
    <tr
      className={cn(
        "group transition-all duration-200 ease-in-out",
        hoverable && "hover:bg-gray-50 dark:hover:bg-gray-700/50 cursor-pointer",
        "border-b border-gray-100 dark:border-gray-700/50 last:border-b-0",
        onClick && "cursor-pointer",
        className
      )}
      onClick={onClick}
      ref={ref}
      {...props}
    >
      {children}
    </tr>
  )
)
AdminTableRow.displayName = "AdminTableRow"

const AdminTableCell = React.forwardRef<HTMLTableCellElement, AdminTableCellProps>(
  ({ children, className, align = 'left', ...props }, ref) => (
    <td
      className={cn(
        "px-4 py-3 transition-colors duration-200",
        "group-hover:bg-gray-50 dark:group-hover:bg-gray-700/30",
        align === 'center' && "text-center",
        align === 'right' && "text-right",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </td>
  )
)
AdminTableCell.displayName = "AdminTableCell"

const AdminTableHeaderCell = React.forwardRef<HTMLTableCellElement, AdminTableCellProps>(
  ({ children, className, align = 'left', ...props }, ref) => (
    <th
      className={cn(
        "px-4 py-3 font-semibold text-xs uppercase tracking-wider",
        "transition-colors duration-200",
        align === 'center' && "text-center",
        align === 'right' && "text-right",
        className
      )}
      ref={ref}
      {...props}
    >
      {children}
    </th>
  )
)
AdminTableHeaderCell.displayName = "AdminTableHeaderCell"

export {
  AdminTable,
  AdminTableHeader,
  AdminTableBody,
  AdminTableRow,
  AdminTableCell,
  AdminTableHeaderCell,
}
