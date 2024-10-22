import { ChangeEvent, useState } from 'react'
import logo from './assets/logo-nlw-expert.svg'
import { NewNoteCard } from './components/NewNoteCard'
import { NoteCard } from './components/NoteCard'
import { toast } from 'sonner'

interface Note {
  id: string,
  date: Date,
  content: string,
}

export function App() {
  const [search, setSearch] = useState('')
  const [notes, setNotes] = useState<Note[]>(() => {
    const notesOnStorage = localStorage.getItem('notes')

    if (notesOnStorage) {
      return JSON.parse(notesOnStorage)
    }

    return []
  })

  function onNoteCreated(content: string) {
    const newNote = {
      id: crypto.randomUUID(),
      date: new Date(),
      content,
    }

    const notesArray = [newNote, ...notes]

    setNotes(notesArray)
    localStorage.setItem('notes', JSON.stringify(notesArray))
  }

  function onNoteDeleted(id: string) {
    const confirmDelete = window.confirm("Deseja apagar essa nota?")

    if (confirmDelete) {
      const notesArray = notes.filter((note) => note.id !== id)
      setNotes(notesArray)
      localStorage.setItem('notes', JSON.stringify(notesArray))
    }
  }

  function onShareNote(id: string) {
    navigator.clipboard.writeText(window.location.href + id)
    toast.success('Nota copiada com sucesso!')
  }

  function onUpdateNoteContent(id: string, newContent: string) {
    const updatedNotes = notes.map(note =>
      note.id === id ? { ...note, content: newContent } : note
    )
    setNotes(updatedNotes)
    localStorage.setItem('notes', JSON.stringify(updatedNotes))
  }

  function handleSearch(ev: ChangeEvent<HTMLInputElement>) {
    setSearch(ev.target.value)
  }

  const filteredNotesList = search !== '' ? notes.filter((note) => note.content.toLocaleLowerCase().includes(search.toLocaleLowerCase())) : notes

  return (
    <div className="mx-auto max-w-6xl my-12 space-y-4 px-5">
      <h1 className='text-sm text-slate-400'>
        by
        <a href="https://rcardoso.vercel.app" target='_blank' className='italic hover:text-slate-100 transition-colors duration-300'> Ruan Cardoso </a>
        and
        <a href="https://www.rocketseat.com.br/" target='_blank' className='italic hover:text-slate-100 transition-colors duration-300'> Rocketseat </a>
        💜
      </h1>
      <img src={logo} alt="Expert Logo" />
      <form className='w-full'>
        <input
          type="text"
          placeholder='Busque em suas notas...'
          className='w-full bg-transparent text-3xl font-semibold tracking-tight outline-none placeholder:text-slate-500'
          onChange={handleSearch}
        />
      </form>

      <div className='h-px bg-slate-700' />

      <div className='grid md:grid-cols-3 gap-6 auto-rows-[250px]'>
        <NewNoteCard onNoteCreated={onNoteCreated} />

        {filteredNotesList.map((note) => (
          <NoteCard key={note.id} note={note} onNoteDeleted={onNoteDeleted} onShareNote={onShareNote} onUpdateNoteContent={onUpdateNoteContent} />
        ))}
      </div>
    </div>
  )
}
