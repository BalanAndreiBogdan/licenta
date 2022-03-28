import React from 'react'
import {useState, useEffect, useRef} from 'react'
import './BoardGame.css'
import './App.css'
import {Link} from 'react-router-dom'

function SinglePlayerNo(){
  const [piecesOnBoard, setpiecesOnBoard] = useState([])
  const [pieceColor, setpieceColor] = useState(0)
  const [winner, setWinner] = useState()

  const ref = useRef(null);
  
  const myfunct = () => {
    console.log('activated')
        let row = null
        let col = 0
        for(let r = 5; r >= 0; r--)
            if(getPiece(col, r) == null ){
                row = r
                break
            }
        if(row !== null && winner == null){
        setpiecesOnBoard(piecesOnBoard.concat({col, row : row, color : '#FFF000'}))
        }
  }

  useEffect(() => {
    conquerPiece()
    checkForOrizWin()
    checkForVertWin()
    checkForDiag1Win()
    checkForDiag2Win()
  }, [piecesOnBoard])

  useEffect(() => {
    if (pieceColor){
        setTimeout(() => {
            ref.current.click();
        }, 5000);
    }
    }, [pieceColor]);

  const restartGame = () =>{
    setpiecesOnBoard([])
    setWinner()
    // setpieceColor('#D90000')
  }

  const getPiece = (col, row) => {
    for(let element = 0; element < piecesOnBoard.length; element++)
      if(piecesOnBoard[element].col === col && piecesOnBoard[element].row === row)
        return (piecesOnBoard[element])
  }

  const addPiece = (col) => {
    let row = null
    for(let r = 5; r >= 0; r--)
      if(getPiece(col, r) == null ){
        row = r
        break
      }
    if(row !== null){
      setpiecesOnBoard(piecesOnBoard.concat({col, row : row, color : '#D90000'}))
      const nextPieceColor = pieceColor === '#D90000' ? '#FFF000' : '#D90000'
        setpieceColor(nextPieceColor)
    }
  }

  const conquerPiece = () => {
    for(let c = 1; c < 6; c++)
      for(let r = 1; r < 5; r++){
        let piece = getPiece(c, r)
        let piece1 = getPiece(c, r - 1)
        let piece2 = getPiece(c - 1, r)
        let piece3 = getPiece(c + 1, r)
        let piece4 = getPiece(c, r + 1)
        if((piece && piece1 && piece2 && piece3 && piece4) 
          && (piece1.color === piece2.color 
          && piece2.color === piece3.color 
          && piece3.color === piece4.color 
          && piece.color !== piece1.color)){
            const nextPieceColor = piece.color === '#D90000' ? '#FFF000' : '#D90000'
            let newpiecesOnBoard = piecesOnBoard.map(element => {
              if(element.col === c && element.row === r)
                return {col: c, row: r, color: nextPieceColor}
              else
                return element
            })
            setpiecesOnBoard(newpiecesOnBoard)
          }
      } 
  }

  const checkForOrizWin = () => {
    for(let c = 0; c < 4; c++)
      for(let r = 0; r < 6; r++){
        let piece1 = getPiece(c, r)
        let piece2 = getPiece(c+1, r)
        let piece3 = getPiece(c+2, r)
        let piece4 = getPiece(c+3, r)
        if((piece1 && piece2 && piece3 && piece4) 
          &&(piece1.color === piece2.color 
          && piece2.color === piece3.color 
          && piece3.color === piece4.color)){
            const winner = piece1.color === '#D90000' ? 'Red' : 'Yellow'
            setWinner(winner)
        }
      } 
  }

  const checkForVertWin = () => {
    for(let c = 0; c < 7; c++)
      for(let r = 0; r < 3; r++){
        let piece1 = getPiece(c, r)
        let piece2 = getPiece(c, r + 1)
        let piece3 = getPiece(c, r + 2)
        let piece4 = getPiece(c, r + 3)
        if((piece1 && piece2 && piece3 && piece4) 
          && (piece1.color === piece2.color 
          && piece2.color === piece3.color 
          && piece3.color === piece4.color)){
            const winner = piece1.color === '#D90000' ? 'Red' : 'Yellow'
            setWinner(winner)
          }
      } 
  }

  const checkForDiag1Win = () => {
    for(let c = 0; c < 4; c++)
      for(let r = 0; r < 3; r++){
        let piece1 = getPiece(c, r)
        let piece2 = getPiece(c + 1, r + 1)
        let piece3 = getPiece(c + 2, r + 2)
        let piece4 = getPiece(c + 3, r + 3)
        if((piece1 && piece2 && piece3 && piece4) 
          &&(piece1.color === piece2.color 
          && piece2.color === piece3.color 
          && piece3.color === piece4.color)){
            const winner = piece1.color === '#D90000' ? 'Red' : 'Yellow'
            setWinner(winner)
          }
      } 
  }

  const checkForDiag2Win = () => {
    for(let c = 3; c < 7; c++)
      for(let r = 0; r < 3; r++){
        let piece1 = getPiece(c, r)
        let piece2 = getPiece(c - 1, r + 1)
        let piece3 = getPiece(c - 2, r + 2)
        let piece4 = getPiece(c - 3, r + 3)
        if((piece1 && piece2 && piece3 && piece4) 
          &&(piece1.color === piece2.color 
          && piece2.color === piece3.color 
          && piece3.color === piece4.color)){
            const winner = piece1.color === '#D90000' ? 'Red' : 'Yellow'
            setWinner(winner)
          }
      } 
  }

  const boardCreation = () =>{
    let rowCreations = []
    for (let r = 0; r < 6; r++){
      let columnCreations = []
      for (let c = 0; c < 7; c++){
        const piece = getPiece(c, r)
        columnCreations.push(
          <div className = "square" onClick = {() => {addPiece(c)}}>
            <div className = "circle">
              {piece ? <div className = "coloredCircle" style={{backgroundColor : piece.color}}/> : null}
            </div>
          </div>
        )
      }
      rowCreations.push(<div className = "column">{columnCreations}</div>)
    }
    return(
      <div className = "round-border">
        <div className = "board">
          {winner ? <div className = 'winner' onClick = {()=>{restartGame()}}>{winner + ' wins!'}</div> : null}
          {rowCreations}
        </div>
      </div>
    )
  }

  return (
    <div className = "BoardGame">
        {boardCreation()}
        <div className = "Buttons2">
          <div>
            <button style = {{display: 'none'}} ref={ref} onClick = {() => myfunct()}>Restart</button>
          </div>
          <Link to = "/">
            <div>
              <button className = "ButtonsBoard">Back</button>
            </div>
          </Link>
        </div>
    </div>
  )
}

export default SinglePlayerNo;
