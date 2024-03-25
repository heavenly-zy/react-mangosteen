import React, { useState } from 'react'

interface Props {
  value?: number
  onChange?: (amount: number) => void
  children?: React.ReactNode
}

export const ItemAmount: React.FC<Props> = ({ value, onChange, children }) => {
  const [output, _setOutput] = useState(() => value ? (value / 100).toString() : '0')
  const setOutput = (str: string) => {
    const dotIndex = str.indexOf('.')
    if (dotIndex >= 0 && str.length - dotIndex > 3) { return }
    if (str.length > 16) { return }
    _setOutput(str)
    onChange?.(Number.parseFloat(str) * 100)
  }
  const append = (char: string) => {
    switch (char) {
      case '0':
        if (output !== '0') { setOutput(output + char) }
        break
      case '.':
        if (!output.includes('.')) { setOutput(output + char) }
        break
      default:
        if (output === '0') { setOutput(char) }
        else { setOutput(output + char) }
        break
    }
  }
  return (
    <>
      <div flex p-16px b-t-1px b-t="#ddd" b-t-solid gap-x-8px items-center>
        {children}
        <code grow-1 text-20px text-right color="#53A867">{output}</code>
      </div>
      <div pt-1px grid grid-cols="[repeat(4,_1fr)]" grid-rows="[repeat(4,_56px)]" bg="#ddd" gap-1px children-b-none children-bg="#fff">
        <button row-start-1 col-start-1 row-end-2 col-end-2 onClick={() => append('1')}>1</button>
        <button row-start-1 col-start-2 row-end-2 col-end-3 onClick={() => append('2')}>2</button>
        <button row-start-1 col-start-3 row-end-2 col-end-4 onClick={() => append('3')}>3</button>
        <button row-start-2 col-start-1 row-end-3 col-end-2 onClick={() => append('4')}>4</button>
        <button row-start-2 col-start-2 row-end-3 col-end-3 onClick={() => append('5')}>5</button>
        <button row-start-2 col-start-3 row-end-3 col-end-4 onClick={() => append('6')}>6</button>
        <button row-start-3 col-start-1 row-end-4 col-end-2 onClick={() => append('7')}>7</button>
        <button row-start-3 col-start-2 row-end-4 col-end-3 onClick={() => append('8')}>8</button>
        <button row-start-3 col-start-3 row-end-4 col-end-4 onClick={() => append('9')}>9</button>
        <button row-start-4 col-start-1 row-end-5 col-end-3 onClick={() => append('0')}>0</button>
        <button row-start-4 col-start-3 row-end-5 col-end-4 onClick={() => append('.')}>.</button>
        <button row-start-1 col-start-4 row-end-3 col-end-5 onClick={() => setOutput('0')}>清空</button>
        <button row-start-3 col-start-4 row-end-5 col-end-5 bg="#5C33BE!" text-white>提交</button>
      </div>
    </>
  )
}
