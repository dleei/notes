import type { ReactNode } from 'react'

import Sidebar from '@/components/Sidebar'
import './style/index.css'

interface IProps {
  children: ReactNode
}

export default async function RootLayout({ children }: IProps) {
  return (
    <html lang='en'>
      <body>
        <div className='container'>
          <div className='main'>
            <Sidebar />
            <section className='col note-viewer'>{children}</section>
          </div>
        </div>
      </body>
    </html>
  )
}
