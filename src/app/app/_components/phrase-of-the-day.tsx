import { Card } from '@/components/ui/card'

export function PhraseOfTheDay() {
  return (
    <>
      <p className="mb-3 font-semibold">Phrase of the day</p>
      <Card className="flex items-start gap-4 p-6 shadow-none">
        <span className="text-lg">💡</span>
        <span className="text-sm text-muted-foreground">
          It's a force that doesn't have much explanation, capable of moving
          mountains. It's the hope that doesn't waver in the face of
          difficulties and the confidence that everything will be fine when you
          have God in your heart.
        </span>
      </Card>
    </>
  )
}
