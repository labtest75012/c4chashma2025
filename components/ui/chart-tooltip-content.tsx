interface ChartTooltipContentProps {
  active?: boolean
  payload?: any[]
  label?: string
}

export function ChartTooltipContent({ active, payload, label }: ChartTooltipContentProps) {
  if (!active || !payload || !payload.length) {
    return null
  }

  return (
    <div className="rounded-lg border bg-background p-2 shadow-sm">
      <div className="grid grid-cols-2 gap-2">
        <div className="flex flex-col">
          <span className="text-[0.70rem] uppercase text-muted-foreground">{label}</span>
          <span className="font-bold text-muted-foreground">{payload[0].value}</span>
        </div>
      </div>
    </div>
  )
}
