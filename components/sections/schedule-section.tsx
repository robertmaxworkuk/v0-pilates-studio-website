'use client'

import { useState } from 'react'
import { SectionWrapper } from '@/components/layout/section-wrapper'
import { SectionHeading } from '@/components/shared/section-heading'
import { CTAButton } from '@/components/shared/cta-button'
import { schedule, weekDays, type ScheduleSlot } from '@/lib/data/schedule'
import { cn } from '@/lib/utils'
import { Clock, Users } from 'lucide-react'

function ScheduleSlotCard({ slot }: { slot: ScheduleSlot }) {
  const isFull = slot.spotsLeft === 0
  
  return (
    <div
      className={cn(
        'rounded-lg border p-4 transition-all',
        isFull 
          ? 'border-border bg-muted/50 opacity-60' 
          : 'border-border bg-card hover:border-primary/30 hover:shadow-sm'
      )}
    >
      <div className="flex items-start justify-between gap-2">
        <div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-primary" />
            <span className="font-medium text-foreground">{slot.time}</span>
          </div>
          <p className="mt-1 text-sm text-muted-foreground">{slot.title}</p>
        </div>
        
        {slot.type === 'group' && (
          <div className="flex items-center gap-1 text-xs">
            <Users className="h-3 w-3" />
            {isFull ? (
              <span className="text-muted-foreground">Мест нет</span>
            ) : (
              <span className="text-primary">
                {slot.spotsLeft}/{slot.spotsTotal}
              </span>
            )}
          </div>
        )}
        
        {slot.type === 'individual' && (
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
            Персональное
          </span>
        )}
      </div>
    </div>
  )
}

export function ScheduleSection() {
  const [selectedDay, setSelectedDay] = useState(weekDays[0].full)

  const daySchedule = schedule.filter((slot) => slot.day === selectedDay)

  return (
    <SectionWrapper id="schedule">
      <SectionHeading
        title="Расписание"
        subtitle="Выберите удобное время для занятий"
      />

      {/* Day selector */}
      <div className="mobile-snap-row mb-8 justify-start sm:flex sm:flex-wrap sm:justify-center">
        {weekDays.slice(0, 6).map((day) => {
          const hasSlots = schedule.some((slot) => slot.day === day.full)
          
          return (
            <button
              key={day.full}
              onClick={() => setSelectedDay(day.full)}
              disabled={!hasSlots}
              className={cn(
                'mobile-snap-card w-auto rounded-full px-4 py-2 text-sm font-medium transition-all sm:w-auto sm:max-w-none sm:shrink-0',
                selectedDay === day.full
                  ? 'bg-primary text-primary-foreground'
                  : hasSlots
                    ? 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-foreground'
                    : 'bg-muted/50 text-muted-foreground/50 cursor-not-allowed'
              )}
            >
              <span className="hidden sm:inline">{day.full}</span>
              <span className="sm:hidden">{day.short}</span>
            </button>
          )
        })}
      </div>

      {/* Schedule grid */}
      <div className="mx-auto max-w-2xl">
        {daySchedule.length > 0 ? (
          <div className="grid gap-3">
            {daySchedule.map((slot) => (
              <ScheduleSlotCard key={slot.id} slot={slot} />
            ))}
          </div>
        ) : (
          <div className="rounded-lg bg-muted p-8 text-center">
            <p className="text-muted-foreground">
              В этот день занятий нет
            </p>
          </div>
        )}
      </div>

      {/* Legend */}
      <div className="mt-8 flex flex-col items-center gap-3 text-sm text-muted-foreground sm:flex-row sm:flex-wrap sm:justify-center sm:gap-6">
        <div className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-primary/20" />
          Групповое занятие
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs text-primary">
            Персональное
          </span>
          Индивидуальное
        </div>
      </div>

      {/* CTA */}
      <div className="mt-12 text-center">
        <p className="mb-4 text-muted-foreground">
          Не нашли удобное время? Свяжитесь со мной для индивидуальной записи
        </p>
        <CTAButton />
      </div>
    </SectionWrapper>
  )
}
