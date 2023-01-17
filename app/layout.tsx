import BaseProvider from '~/biz/BaseProvider'

export default function RootLayout({children}: {children: React.ReactNode}) {
  return (
    <html lang="zh-CN">
      <body>
        <BaseProvider>{children}</BaseProvider>
      </body>
    </html>
  )
}
