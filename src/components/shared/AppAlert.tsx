  import {
    Alert,
      AlertAction,
    AlertDescription,
    AlertTitle,
  } from "@/components/ui/alert"
  
  import {
    CheckCircle2,
    AlertTriangle,
    XCircle,
    X,
    Info,
  } from "lucide-react"
  
  import { cn } from "@/lib/utils"
  
  type AlertType =
    | "success"
    | "error"
    | "warning"
    | "info"
  
  interface AppAlertProps {
    type: AlertType
    title: string
    description?: string
    className?: string
    onClose?: () => void
  }
  
  export default function AppAlert({
    type,
    title,
    description,
    className,
    onClose,
  }: AppAlertProps) {
    const variants = {
      success: {
        icon: CheckCircle2,
        className:
          "border-green-500/50 text-green-600 dark:text-green-400",
      },
  
      error: {
        icon: XCircle,
        className:
          "border-red-500/50 text-red-600 dark:text-red-400",
      },
  
      warning: {
        icon: AlertTriangle,
        className:
          "border-orange-500/50 text-orange-600 dark:text-orange-400",
      },
  
      info: {
        icon: Info,
        className:
          "border-blue-500/50 text-blue-600 dark:text-blue-400",
      },
    }
  
    const selected = variants[type]
    const Icon = selected.icon
  
    return (
      <Alert
        className={cn(
          selected.className,
          className
        )}
      >
        <Icon className="h-4 w-4" />
  
        <AlertTitle>{title}</AlertTitle>
  
        {description && (
          <AlertDescription>
            {description}
          </AlertDescription>
        )}

        {onClose && (
          <AlertAction>
            <button
              type="button"
              onClick={onClose}
              className="inline-flex size-7 items-center justify-center rounded-md text-current/70 transition-colors hover:bg-black/5 hover:text-current focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring dark:hover:bg-white/10"
              aria-label="Close alert"
            >
              <X className="size-4" />
            </button>
          </AlertAction>
        )}
      </Alert>
    )
  }