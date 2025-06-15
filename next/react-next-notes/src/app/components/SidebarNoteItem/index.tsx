import dayjs from 'dayjs'
import SidebarNoteItemContent from '@/components/SidebarNoteItemContent'
import type { NoteData } from '@/types';


interface IProps  {
  noteId: string
  note: NoteData
}

export default function SidebarNoteItem({ noteId, note }:IProps) {
  const { title, content = '', updateTime } = note
  return (
    <SidebarNoteItemContent
      id={noteId}
      title={note.title}
      expandedChildren={
        <p className='sidebar-note-excerpt'>
          {content.substring(0, 20) || <i>(No content)</i>}
        </p>
      }>
      <header className='sidebar-note-header'>
        <strong>{title}</strong>
        <small>{dayjs(updateTime).format('YYYY-MM-DD hh:mm:ss')}</small>
      </header>
    </SidebarNoteItemContent>
  )
}
