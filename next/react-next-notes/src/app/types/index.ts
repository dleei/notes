import type { ReactNode } from 'react'

export interface NoteData {
  id?: number | string
  title: string
  content: string
  updateTime: string
  createTime: string
  children?: ReactNode
  expandedChildren?: boolean 
}
