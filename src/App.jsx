/*
  DESAFIO TÉCNICO - JOGO DA VELHA - por fernandev

  * descrição
    desenvolva um jogo da velha (tic tac toe) funcional.
    use qualquer técnica de estilização preferida: css modules, sass, styled.

  * tasks
    ? - crie um board de 3x3
    ? - dois jogadores
    ? - ao clicar em um quadrado, preencher com a jogada
    ? - avisar quando o jogo finalizar, caso dê velha avise também
    ? - fazer um risco na sequência vencedora, caso houver
*/


import { useState } from 'react'

import styles from './App.module.css'


export function App() {
  const [gameData, setGameData] = useState(
    {
    gameArray: ['', '', '', '', '', '', '', '', ''],
    gameTurn: 'X',
    })


  const handleOnClick = (clickedIndex) => {
    // console.log(clickedIndex)

    setGameData(({gameArray, gameTurn}) => {
      // console.log(gameTurn)
      const newGameArray = [...gameArray]
      newGameArray[clickedIndex] = gameData.gameTurn
      return newGameArray
    })
  }


  return (
    <>
      <div className={styles.board}>
        {
          Object.keys().map((value, index) => (
            <span
              className={styles.gameSqr}
              key={index}
              onClick={() => {
                handleOnClick(index)
              }}
            >
              {value}
            </span>
          ))
        }
      </div>
    </>
  )
}
