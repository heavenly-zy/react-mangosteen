import p from '@/assets/images/pig.svg'
import add from '@/assets/icons/add.svg'

export const Home: React.FC = () => {
  return (
    <div>
      <div flex justify-center>
        <img my-20vh w-128px h-130px src={p} />
      </div>
      <div px-16px>
        <button h-48px w="100%" bg="#5C33BE" b-none text="#ffffff" text-18px rounded-8px>开始记账</button>
      </div>
      <button w-56px h-56px bg="#5C33BE" rounded="50%" b-none text="#ffffff" text-6xl fixed bottom-16px right-16px>
        <img src={add} max-w="100%" max-h="100%" />
      </button>
    </div>
  )
}
