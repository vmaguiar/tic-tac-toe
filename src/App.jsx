/*
  REACT CHALLENGE - TIC TAC TOE - By fernandev

  * Description
    Develop a functional tic tac toe game. You can use whatever you prefer for css stylization:
    css modules, sass, styled and etc...

  * tasks
    ok - Draw a 3x3 board
    ok - Add 2 players
    ok - Draw players moves when clicked in blank square
    (missing draw verification) - Warn game end and a winner, if draw warn as well.
    ? - Draw a line over the winnig combo, if any
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

  const [winningSequence, setWinningSequence] = useState(['', '', '']) 
  

  const drawWinnerLine = () => {
    //Rows cases
    if(winningSequence.every((item, index) => item === winConditions[0][index])) {
      return styles.gameSqrWinnerRow
    }
    else if(winningSequence.every((item, index) => item === winConditions[1][index])) {
      return styles.gameSqrWinnerRow
    }
    else if(winningSequence.every((item, index) => item === winConditions[2][index])) {
      return styles.gameSqrWinnerRow
    }

    //Column cases
    if(winningSequence.every((item, index) => item === winConditions[3][index])) {
      return styles.gameSqrWinnerColumn
    }
    else if(winningSequence.every((item, index) => item === winConditions[4][index])) {
      return styles.gameSqrWinnerColumn
    }
    else if(winningSequence.every((item, index) => item === winConditions[5][index])) {
      return styles.gameSqrWinnerColumn
    }

    //diagonal down left to right
    if(winningSequence.every((item, index) => item === winConditions[6][index])) {
      return styles.gameSqrWinnerD1
    }

    //diagonal up left to right
    if(winningSequence.every((item, index) => item === winConditions[7][index])) {
      return styles.gameSqrWinnerD2
    }

    else {
      return ''
    }
  }

  useEffect(() => {
    const checkWinner = () => {
      for(let values of winConditions) {
        if((gameData.gameArray[values[0]] === '✖️'
        && gameData.gameArray[values[1]] === '✖️'
        && gameData.gameArray[values[2]] === '✖️') && !gameData.playerWinner) {
          setGameData((oldGameData) => {
            const newGameData = {...oldGameData, playerWinner: 'Player ✖️ WINS'}
            return newGameData
          })
  
          setWinningSequence(() => values)

          return
        }
  
        if((gameData.gameArray[values[0]] === '⭕'
        && gameData.gameArray[values[1]] === '⭕'
        && gameData.gameArray[values[2]] === '⭕') && !gameData.playerWinner) {
          setGameData((oldGameData) => {
            const newGameData = {...oldGameData, playerWinner: 'Player ⭕ WINS'}
            return newGameData
          })
  
          setWinningSequence(() => values)
  
          return
        }
      }
  
      if(gameData.gameArray.every((item) => item !== '')) {
        setGameData((oldGameData) => {
          const newGameData = {...oldGameData, playerWinner: 'Draw'}
          return newGameData
        })
      }
    }


    checkWinner()
  }, [gameData, winningSequence])


  useEffect(() => {
    if(gameData.playerWinner !== '') {
      alert(`Game Over! ${gameData.playerWinner}`)
    }
  }, [gameData.playerWinner])

  

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
              className={winningSequence.includes(index) ? drawWinnerLine() : undefined}
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
