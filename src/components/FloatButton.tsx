export const FloatButton: React.FC = () => {
  return (
    <button
      w-56px
      h-56px
      bg="#5C33BE"
      rounded="50%"
      b-none
      fixed
      bottom-16px
      right-16px
      flex
      justify-center
      items-center
    >
      <svg w-24px h-24px fill="#ffffff">
        <use xlinkHref="#add"></use>
      </svg>
    </button>
  )
}
