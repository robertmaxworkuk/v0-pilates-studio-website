# Auth Email Setup (Supabase)

Этот документ описывает настройку подтверждения email и красивого шаблона письма для проекта.

## 1. Обязательные URL в Supabase

В Supabase Dashboard:
- Authentication -> URL Configuration

Установите:
- Site URL: https://YOUR_PRODUCTION_DOMAIN
- Redirect URLs: добавьте
  - https://YOUR_PRODUCTION_DOMAIN/auth/callback
  - http://localhost:3000/auth/callback (для локальной разработки)

## 2. Redirect при регистрации

В серверном действии регистрации используется:
- emailRedirectTo: https://YOUR_PRODUCTION_DOMAIN/auth/callback?next=/profile

Это гарантирует, что ссылка подтверждения почты не ведет на localhost в production.

## 3. Шаблон письма подтверждения

В Supabase Dashboard:
- Authentication -> Email Templates -> Confirm signup

Вставьте HTML ниже и проверьте, что переменная ссылки подтверждения используется как {{ .ConfirmationURL }}.

```html
<!doctype html>
<html lang="ru">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Подтвердите email | Pilatta</title>
  </head>
  <body style="margin:0;padding:0;background:#f7f4ef;font-family:Arial,sans-serif;color:#2d2520;">
    <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="padding:24px 12px;">
      <tr>
        <td align="center">
          <table role="presentation" width="100%" cellspacing="0" cellpadding="0" style="max-width:560px;background:#ffffff;border-radius:16px;overflow:hidden;border:1px solid #eadfce;">
            <tr>
              <td style="padding:28px 28px 20px;background:linear-gradient(135deg,#8a5a3d,#c29063);color:#fff;">
                <h1 style="margin:0;font-size:24px;line-height:1.25;">Pilatta</h1>
                <p style="margin:10px 0 0;font-size:14px;line-height:1.5;opacity:.95;">Подтвердите ваш email, чтобы завершить регистрацию</p>
              </td>
            </tr>
            <tr>
              <td style="padding:28px;">
                <p style="margin:0 0 14px;font-size:15px;line-height:1.6;">Спасибо за регистрацию в студии Pilatta.</p>
                <p style="margin:0 0 22px;font-size:15px;line-height:1.6;">Нажмите кнопку ниже, чтобы подтвердить email и активировать аккаунт.</p>

                <table role="presentation" cellspacing="0" cellpadding="0" style="margin:0 0 22px;">
                  <tr>
                    <td>
                      <a href="{{ .ConfirmationURL }}" style="display:inline-block;padding:12px 20px;border-radius:10px;background:#8a5a3d;color:#fff;text-decoration:none;font-size:14px;font-weight:bold;">Подтвердить email</a>
                    </td>
                  </tr>
                </table>

                <p style="margin:0 0 10px;font-size:13px;line-height:1.6;color:#6f5d52;">Если кнопка не работает, скопируйте и откройте ссылку:</p>
                <p style="margin:0;word-break:break-all;font-size:12px;line-height:1.6;color:#8a5a3d;">{{ .ConfirmationURL }}</p>
              </td>
            </tr>
            <tr>
              <td style="padding:16px 28px;background:#f9f5ee;border-top:1px solid #eadfce;color:#7a6a5d;font-size:12px;line-height:1.6;">
                Это письмо отправлено автоматически. Если вы не создавали аккаунт, просто игнорируйте его.
              </td>
            </tr>
          </table>
        </td>
      </tr>
    </table>
  </body>
</html>
```

## 4. Проверка

1. Зарегистрируйте нового пользователя.
2. Откройте письмо подтверждения и перейдите по ссылке.
3. Проверьте, что редирект идет в production на /auth/callback и далее на /profile.
4. Убедитесь, что страница не падает и пользователь видит корректный экран.
