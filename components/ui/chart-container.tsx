import type React from "react"

interface ChartConfig {
  title?: string
  description?: string
}

interface ChartContainerProps {
  children: React.ReactNode
  config?: ChartConfig
  className?: string
}

export function ChartContainer({ children, config, className }: ChartContainerProps) {
  return (
    <div className={`w-full ${className || ""}`}>
      {config && (
        <div className="mb-4">
          {config.title && <h3 className="text-lg font-medium">{config.title}</h3>}
          {config.description && <p className="text-sm text-muted-foreground">{config.description}</p>}
        </div>
      )}
      <div className="h-full w-full">{children}</div>
    </div>
  )
}
