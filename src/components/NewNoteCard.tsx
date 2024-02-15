import { ChangeEvent, FormEvent, useState } from 'react'

import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'
import { toast } from 'sonner'

interface newNoteCardProps {
  onNoteCreated: (content: string) => void
}

export function NewNoteCard({ onNoteCreated }: newNoteCardProps) {
  const [shouldShowOnboarding, SetShouldShowOnboarding] = useState(true)
  const [isRecording, setIsRecording] = useState(false)
  const [content, setContent] = useState('')

  let speechRegnition: SpeechRecognition | null = null 

  function handleStartEditor() {
    SetShouldShowOnboarding(false)
  }

  function handleContentChanged(ev: ChangeEvent<HTMLTextAreaElement>) {
    const textareaInput = ev.target.value

    setContent(textareaInput)

    if (textareaInput === '') {
      SetShouldShowOnboarding(true)
    }
  }

  function handleSaveNote(ev: FormEvent) {
    ev.preventDefault()

    if (content !== '') {
      onNoteCreated(content)
      toast.success('Nota criada com sucesso !')

      setContent('')
      SetShouldShowOnboarding(true)
    }
  }

  function handleStartRecording() {
    setIsRecording(true)
    SetShouldShowOnboarding(false)

    const isSpeechRecognitionAPIAvailable = 'SpeechRecognition' in window || 'webkitSpeechRecognition' in window

    if (!isSpeechRecognitionAPIAvailable) {
      alert('Infelizmente seu navegador não suporta a API de gravação !')
      return
    }

    const SpeechRecognitionAPI = window.SpeechRecognition || window.webkitSpeechRecognition

    speechRegnition = new SpeechRecognitionAPI()

    speechRegnition.lang = 'pt-BR'
    speechRegnition.continuous = true
    speechRegnition.maxAlternatives = 1
    speechRegnition.interimResults = true


    speechRegnition.onresult = (ev) => {
      // console.log(ev.results)
      const speechContent = Array.from(ev.results).reduce((text, result) => {
        return text.concat(result[0].transcript)
      }, '')

      setContent(speechContent)
    }

    speechRegnition.onerror = (ev) => {
      console.log(ev)
    }

    speechRegnition.start()
  }

  function handleStopRecording() {
    setIsRecording(false)
    if (speechRegnition !== null) {
      speechRegnition.stop()
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger className='flex flex-col gap-3 rounded-md bg-slate-700 p-5 outline-none hover:ring-2 hover:ring-slate-600 focus-visible:ring-2 focus-visible:ring-TITAN500'>
        <span className='text-sm font-medium text-slate-200'>
          Adicionar nota
        </span>
        <p className='text-sm leading-6 text-slate-400 text-left'>
          Grave uma nota em áudio que será convertida para texto automaticamente.
        </p>
      </Dialog.Trigger>

      <Dialog.Portal>
        <Dialog.Overlay className='inset-0 fixed bg-black/50'/>
        <Dialog.Content className='fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 max-w-[640px] w-full h-[60vh] bg-slate-700 rounded-md flex flex-col outline-none overflow-hidden'>
          <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 transition-colors duration-300 z-10'>
            <X className='size-5'/>
          </Dialog.Close>
          <form className='flex-1 flex flex-col'>
            <div className='flex flex-1 flex-col gap-3 p-5 relative'>
              <span className='text-sm font-medium text-slate-300'>
                Adicionar nota
              </span>
              {
                shouldShowOnboarding ? 
                (
                  <p className='text-sm leading-6 text-slate-400'>
                    Comece <button type='button' onClick={handleStartRecording} className='font-medium text-TITAN500 hover:underline'>gravando uma nota</button> em áudio ou se preferir <button type='button' onClick={handleStartEditor} className='font-medium text-TITAN500 hover:underline'>utilize apenas texto</button>.
                  </p>
                ) : (
                  <textarea 
                    autoFocus
                    name='noteContent'
                    className='text-sm leading-6 text-slate-400 bg-transparent resize-none flex-1 outline-none'
                    onChange={handleContentChanged}
                    value={content}
                  />
                )
              }
            </div>

            {
              isRecording ? (
                <button
                  type='button'
                  className='w-full flex justify-center items-center gap-2 bg-slate-900 py-4 text-center text-sm font-semibold text-slate-300 outline-none hover:text-slate-100'
                  onClick={handleStopRecording}
                >
                  <div className='size-3 rounded-full bg-red-600 animate-pulse' />
                  Gravando... (clique p/ interromper)
                </button>
              ) : (
                <button
                  type='button'
                  className='w-full bg-TITAN500 py-4 text-center text-sm font-semibold text-slate-950 outline-none hover:bg-TITAN700 transition-colors duration-300'
                  onClick={handleSaveNote}
                >
                  Salvar nota
                </button>
              )
            }

          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
