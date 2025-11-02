import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const features = [
  {
    title: "Upload PDFs",
    description: "Drag and drop your PDFs or select files from your device with ease.",
  },
  {
    title: "Ask Questions",
    description: "Type natural questions about the document—no special prompts required.",
  },
  {
    title: "Instant AI Answers",
    description: "Get fast, accurate summaries and answers grounded in your PDF content.",
  },
  {
    title: "Secure & Private",
    description: "Your documents are handled securely and never shared without your consent.",
  },
]

export function Features() {
  return (
    <section className="w-full bg-accent/40 py-16 md:py-24" aria-labelledby="features-title">
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto max-w-2xl text-center">
          <h2 id="features-title" className="text-balance text-3xl font-semibold md:text-4xl">
            Everything you need to understand your PDFs faster
          </h2>
          <p className="mt-4 text-muted-foreground md:text-lg">
            Simple, reliable tools powered by AI—designed for clarity, speed, and privacy.
          </p>
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:mt-14 lg:grid-cols-4">
          {features.map((f) => (
            <Card key={f.title} className="rounded-xl transition-transform hover:-translate-y-1 hover:shadow-lg">
              <CardHeader>
                <CardTitle className="text-lg">{f.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{f.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
