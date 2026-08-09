import * as React from 'react'

type BadgeVariant = 'default' | 'outline' | 'success' | 'warning' | 'error' | 'live'

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant
}

const badgeClasses: Record<BadgeVariant, string> = {
  default: 'bg-slate-700 text-slate-200',
  outline: 'border border-slate-600 text-slate-300 bg-transparent',
  success: 'bg-emerald-900/60 text-emerald-400 border border-emerald-800',
  warning: 'bg-yellow-900/60 text-yellow-400 border border-yellow-800',
  error:   'bg-red-900/60 text-red-400 border border-red-800',
  live:    'bg-green-900/60 text-green-400 border border-green-800',
}

export function Badge({ className = '', variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={[
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        badgeClasses[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </span>
  )
}