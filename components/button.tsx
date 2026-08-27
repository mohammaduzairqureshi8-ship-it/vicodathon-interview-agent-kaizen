import * as React from 'react'

type Variant = 'default' | 'destructive' | 'outline' | 'ghost'

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant
}

const variantClasses: Record<Variant, string> = {
  default:     'bg-slate-700 hover:bg-slate-600 text-white border-transparent',
  destructive: 'bg-red-600 hover:bg-red-700 text-white border-transparent',
  outline:     'bg-transparent hover:bg-slate-800 text-white border border-slate-600',
  ghost:       'bg-transparent hover:bg-slate-800 text-slate-300 border-transparent',
}

export function Button({ className = '', variant = 'default', disabled, children, ...props }: ButtonProps) {
  return (
    <button
      disabled={disabled}
      className={[
        'inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium',
        'transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-slate-950',
        'disabled:opacity-50 disabled:cursor-not-allowed',
        variantClasses[variant],
        className,
      ].join(' ')}
      {...props}
    >
      {children}
    </button>
  )
}