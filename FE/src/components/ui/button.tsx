import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-all disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive select-none",
  {
    variants: {
      variant: {
        UndAIed:
          "bg-[#5349507a] border border-[#f74a5c]/60 backdrop-blur-[12.20px] text-[#fffbfb] hover:bg-[#f8376467] hover:border-[#f93c4f] rounded-[5px] hover:shadow-[0_0_20px_#F74A5C] active:bg-[#f837644e] active:border-[#f837644e] active:shadow-sm focus-visible:ring-[#f74a5c]/20 disabled:bg-[#5349507a]/50 disabled:border-[#f74a5c]/30 disabled:text-[#fffbfb]/50 disabled:backdrop-blur-[6px]",
      },
      size: {
        default: "h-9 px-4 py-2 has-[>svg]:px-3",
        sm: "h-8 rounded-md gap-1.5 px-3 has-[>svg]:px-2.5",
        lg: "h-10 rounded-md px-6 has-[>svg]:px-4",
        icon: "size-9",
        notFound: 'px-4 py-2'
      },
    },
    defaultVariants: {
      variant: "UndAIed",
      size: "default",
    },
  }
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }