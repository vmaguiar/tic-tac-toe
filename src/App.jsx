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


import { useEffect, useState } from 'react'

import styles from './App.module.css'


const winConditions = [
  //Rows
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],

  //Columns
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],

  //Diagonals
  [0, 4, 8],
  [2, 4, 6]
]

export function App() {
  const [gameData, setGameData] = useState(
    {
      gameArray: ['', '', '', '', '', '', '', '', ''],
      gameTurn: '✖️',
      playerWinner: ''
    })

  useEffect(() => {
    checkWinner()
  }, [gameData.gameArray, gameData.playerWinner])
  
  const checkWinner = () => {

    for(let values of winConditions) {
      // console.log(values[0])

      if(gameData.gameArray[values[0]] === '✖️'
      && gameData.gameArray[values[1]] === '✖️'
      && gameData.gameArray[values[2]] === '✖️') {
        setGameData((oldGameData) => {
          const newGameData = {...oldGameData, playerWinner: 'Player ✖️ WINS'}
          return newGameData
        })
      }

      if(gameData.gameArray[values[0]] == '⭕'
      && gameData.gameArray[values[1]] == '⭕'
      && gameData.gameArray[values[2]] == '⭕') {
        setGameData((oldGameData) => {
          const newGameData = {...oldGameData, playerWinner: 'Player ⭕ WINS'}
          return newGameData
        })
      }
    }
    console.log(gameData.playerWinner)
  }

  const handleOnClick = (clickedIndex) => {
    // console.log(clickedIndex)
    if(gameData.gameArray[clickedIndex] === gameData.gameTurn || gameData.gameArray[clickedIndex] !== '' || gameData.playerWinner !== ''){
      return
    }

    setGameData(({ gameArray, gameTurn }) => {
      const newGameArray = [...gameArray]
      newGameArray[clickedIndex] = gameData.gameTurn
      gameTurn = (gameTurn === '✖️' ? '⭕' : '✖️')
      
      return { gameArray: newGameArray, gameTurn: gameTurn, playerWinner: gameData.playerWinner }
    })
  }


  return (
    <>
      <div className={styles.board}>  
        {
          
          gameData.gameArray.map((value, index) => (
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
