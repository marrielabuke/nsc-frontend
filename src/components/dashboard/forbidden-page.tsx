import { ShieldAlert } from "lucide-react"

const ForbiddenPage = () => {
  return (
    <div className="flex min-h-[calc(100vh-136px)] flex-col items-center justify-center gap-3 text-center">
      <ShieldAlert className="h-10 w-10 text-destructive" />
      <h1 className="text-2xl font-bold">403 — Access Denied</h1>
      <p className="text-sm text-muted-foreground">
        You don&apos;t have permission to view this page.
      </p>
    </div>
  )
}

export default ForbiddenPage;