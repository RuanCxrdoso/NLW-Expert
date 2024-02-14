import * as Dialog from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

export function NewNoteCard() {
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
          <div className='flex flex-1 flex-col gap-3 p-5 relative'>
            <span className='text-sm font-medium text-slate-300'>
              Adicionar nota
            </span>
            <p className='text-sm leading-6 text-slate-400'>
              Comece <button className='font-medium text-TITAN500 hover:underline'>gravando uma nota</button> em áudio ou se preferir <button className='font-medium text-TITAN500 hover:underline'>utilize apenas texto</button>.
            </p>
            <Dialog.Close className='absolute right-0 top-0 bg-slate-800 p-1.5 text-slate-400 hover:text-slate-100 transition-colors duration-300'>
              <X className='size-5'/>
            </Dialog.Close>
          </div>

          <button
            type='button'
            className='w-full bg-TITAN500 py-4 text-center text-sm font-semibold text-slate-950 outline-none hover:bg-TITAN700 transition-colors duration-300'
          >
            Salvar nota !
          </button>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}