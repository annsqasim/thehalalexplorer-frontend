import type React from "react"

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline"
}

export function Button({ className = "", variant = "primary", children, ...props }: ButtonProps) {
  const baseStyles = "px-4 py-2 rounded-md font-medium text-sm transition-colors"

  const styles =
    variant === "primary"
      ? `${baseStyles} bg-emerald-600 text-white hover:bg-emerald-700 ${className}`
      : `${baseStyles} border border-gray-300 bg-white hover:bg-gray-50 ${className}`

  return (
    <button className={styles} {...props}>
      {children}
    </button>
  )
}
