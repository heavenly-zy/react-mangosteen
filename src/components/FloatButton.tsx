import add from '@/assets/icons/add.svg'

export const FloatButton: React.FC = () => {
  return (
    <button w-56px h-56px bg="#5C33BE" rounded="50%" b-none text="#ffffff" text-6xl fixed bottom-16px right-16px>
      <img src={add} max-w="100%" max-h="100%" />
    </button>
  )
}
