import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Skeleton } from "@/components/ui/skeleton"
import FileUpload from "@/components/FileUpload"
import { Sidebar } from "@/components/ui/sidebar"


export default function DashboardPage() {
  return (
<div className="space-y-6 animate-in fade-in-50">
  <section className="grid gap-6 md:grid-cols-2">
    <div className="space-y-6">
      {/* Upload PDF */}
      {/* <Card className="transition-shadow hover:shadow-md animate-in fade-in-50 slide-in-from-bottom-2">
        <CardHeader>
          <CardTitle className="text-pretty">Upload PDF</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="rounded-lg border border-dashed p-6 text-sm text-muted-foreground">
            This is a placeholder. You’ll be able to drag-and-drop or select files here.
          </div>
          <div className="mt-4 flex items-center gap-3">
            <Button type="button">Choose File</Button>
            <span className="text-xs text-muted-foreground">PDF up to 25MB. Multiple files supported soon.</span>
          </div>
        </CardContent>
      </Card> */}
      <FileUpload />
    </div>

    <div className="space-y-6">
      {/* Ask a question */}
      <Card className="transition-shadow hover:shadow-md animate-in fade-in-50 slide-in-from-bottom-2">
        <CardHeader>
          <CardTitle className="text-pretty">Ask a question</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <Input placeholder="e.g., Summarize section 2" />
          <Textarea placeholder="Optional: add more context for the question..." />
          <div className="flex items-center gap-3">
            <Button type="button" className="transition-transform hover:scale-[1.01]">
              Ask
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>

  </section>
</div>
  )
}
