import { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import { ptBR } from 'date-fns/locale'

export interface NoteCardProps {
  note: {
    id: string
    date: Date
    content: string
  },
  onNoteDeleted: (id: string) => void
  onShareNote: (id: string) => void
  onUpdateNoteContent: (id: string, newContent: string) => void
}

export function NoteCard({ note, onNoteDeleted, onShareNote, onUpdateNoteContent }: NoteCardProps) {
  const [isEditing, setIsEditing] = useState(false)
  const [editedContent, setEditedContent] = useState(note.content)

  function handleSaveEdit() {
    onUpdateNoteContent(note.id, editedContent)
    setIsEditing(false)
  }

  return (
    <div className='relative rounded-md text-left bg-slate-800 p-5 gap-3 overflow-hidden outline-none flex flex-col justify-between hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-TITAN500 h-full'>
      <div>
        <span className='text-sm font-medium text-slate-300'>
          {formatDistanceToNow(note.date, { locale: ptBR, addSuffix: true })}
        </span>

        {isEditing ? (
          <textarea
            className='bg-transparent text-sm leading-6 text-slate-400 outline-none w-full resize-none mt-3'
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <p className='text-sm leading-6 text-slate-400 mt-3'>
            {note.content}
          </p>
        )}
      </div>

      <div className='flex justify-between items-end mt-4'>
        {isEditing ? (
          <button
            className='text-yellow-400 hover:underline'
            onClick={handleSaveEdit}
          >
            Salvar
          </button>
        ) : (
          <button
            className='text-yellow-400 hover:underline'
            onClick={() => setIsEditing(true)}
          >
            Editar
          </button>
        )}

        <button
          className='text-red-400 hover:underline'
          onClick={() => onNoteDeleted(note.id)}
        >
          Apagar
        </button>

        <button
          className='text-green-400 hover:underline'
          onClick={() => onShareNote(note.id)}
        >
          Compartilhar
        </button>
      </div>
    </div>
  )
}
