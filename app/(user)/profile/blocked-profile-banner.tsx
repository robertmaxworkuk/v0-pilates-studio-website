import { ShieldAlert } from "lucide-react"

export function BlockedProfileBanner() {
  return (
    <div className="max-w-3xl mx-auto">
      <div className="rounded-3xl border border-destructive/30 bg-destructive/5 p-8 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-3 rounded-2xl bg-destructive/10 text-destructive">
            <ShieldAlert className="w-6 h-6" />
          </div>
          <div className="space-y-3">
            <h1 className="text-2xl font-bold tracking-tight text-destructive">Доступ к профилю ограничен</h1>
            <p className="text-sm text-foreground/80 leading-relaxed">
              Ваш аккаунт временно заблокирован. Просмотр и редактирование раздела профиля недоступны.
            </p>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Если вы считаете, что это ошибка, обратитесь к администратору студии для уточнения причины и разблокировки.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}