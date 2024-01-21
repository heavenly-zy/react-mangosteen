interface Props {
  kind: ItemKind
}

export const Tags: React.FC<Props> = ({ kind }) => {
  const tags = Array.from({ length: 99 })
  return (
    <div>
      <ol
        grid
        grid-cols="[repeat(auto-fit,48px)]"
        justify-center
        gap-x-32px
        gap-y-16px
        py-16px
        px-8px
        children-h-48px
        children-flex
        children-justify-center
        children-items-center
      >
        {tags.map((_tag, index) =>
          <li key={index} b-1 b-red b-solid>{kind === 'expenses' ? '🫠' : '🥪'}</li>,
        )}
      </ol>
    </div>
  )
}
