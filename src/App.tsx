import { useState } from "react"
import copy from "copy-to-clipboard"
import "./App.css"

function App() {
  const [text, setText] = useState("")
  const [quack, setQuack] = useState("")

  function convertStringToQuack(text: string) {
    let binary = ""
    for (let i = 0; i < text.length; i++) {
      let char = text.charCodeAt(i)
      let binaryChar = char.toString(2).padStart(8, "0")
      binary += binaryChar
    }
    const result = binary
      .trim()
      .replaceAll("0", "Quack ,")
      .replaceAll("1", "Quack  ,")

    return result
  }

  function convertQuackToString(quacks: string) {
    let binary = quacks.replaceAll("Quack  ,", "1").replaceAll("Quack ,", "0")
    let text = ""
    for (let i = 0; i < binary.length; i += 8) {
      let byte = binary.slice(i, i + 8)
      let char = String.fromCharCode(parseInt(byte, 2))
      text += char
    }
    return text
  }

  const handleRevert = () => {
    if (!!text) {
      setQuack(convertStringToQuack(text))
    } else {
      setText(convertQuackToString(quack))
    }
  }

  return (
    <div className="App">
      <h2>
        Linguagem Quack do Grande <b>Vitinho</b>
      </h2>
      <textarea
        disabled={!!quack}
        placeholder="Digito o texto a ser convertido"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button onClick={() => handleRevert()}>Converter</button>
      <button
        onClick={() => {
          setText("")
          setQuack("")
        }}
      >
        Resetar
      </button>
      <textarea
        disabled={!!text}
        placeholder="Digito a codificação a ser convertida"
        value={quack}
        onChange={(e) => setQuack(e.target.value)}
      />
      <button
        onClick={() => {
          copy(quack)
          alert("Vitinho entrou no seu aparelho")
        }}
      >
        Copiar
      </button>
    </div>
  )
}

export default App
