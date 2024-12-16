"use client";

import React, { useState, useMemo, useEffect } from "react";
import { useDrag, useDrop } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import { DndProvider } from "react-dnd";

// Define types for player and piece
type Player = "R" | "B";

type Piece = {
  player: Player;
  king: boolean;
} | null;

type Board = Piece[][];

const BOARD_SIZE = 8;

const initializeBoard = (): Board => {
  const board: Board = Array(BOARD_SIZE)
    .fill(null)
    .map(() => Array(BOARD_SIZE).fill(null));

  for (let row = 0; row < BOARD_SIZE; row++) {
    for (let col = 0; col < BOARD_SIZE; col++) {
      if (row < 3 && (row + col) % 2 === 1) {
        board[row][col] = { player: "B", king: false };
      } else if (row > 4 && (row + col) % 2 === 1) {
        board[row][col] = { player: "R", king: false };
      }
    }
  }

  return board;
};

const App: React.FC = () => {
  const initialBoard = useMemo(() => initializeBoard(), []);
  const [board, setBoard] = useState<Board>(initialBoard);
  const [currentPlayer, setCurrentPlayer] = useState<Player>("R");
  const [selectedPiece, setSelectedPiece] = useState<{
    row: number;
    col: number;
  } | null>(null);
  const [availableMoves, setAvailableMoves] = useState<
    { row: number; col: number }[]
  >([]);
  const [isSinglePlayer, setIsSinglePlayer] = useState<boolean>(false);
  const [scores, setScores] = useState<{ R: number; B: number }>({
    R: 0,
    B: 0,
  });
  const [multiJumpAvailable, setMultiJumpAvailable] = useState<boolean>(false);
  const [lastMovedPiece, setLastMovedPiece] = useState<{
    row: number;
    col: number;
  } | null>(null);

  useEffect(() => {
    if (isSinglePlayer && currentPlayer === "B") {
      setTimeout(() => makeComputerMove(), 1000);
    }
  }, [currentPlayer, isSinglePlayer]);

  const handleSelectPiece = (row: number, col: number) => {
    const piece = board[row][col];
    if (piece && piece.player === currentPlayer) {
      setSelectedPiece({ row, col });
      const moves = calculateAvailableMoves(row, col);
      setAvailableMoves(moves);
    } else {
      setSelectedPiece(null);
      setAvailableMoves([]);
    }
  };

  const calculateAvailableMoves = (row: number, col: number) => {
    const piece = board[row][col];
    if (!piece) return [];

    const moves: { row: number; col: number }[] = [];
    const directions = piece.king ? [1, -1] : piece.player === "R" ? [-1] : [1];

    directions.forEach((rowDir) => {
      [-1, 1].forEach((colDir) => {
        const newRow = row + rowDir;
        const newCol = col + colDir;
        if (
          newRow >= 0 &&
          newRow < BOARD_SIZE &&
          newCol >= 0 &&
          newCol < BOARD_SIZE &&
          board[newRow][newCol] === null
        ) {
          moves.push({ row: newRow, col: newCol });
        }
      });
    });

    return moves;
  };

  const handleDrop = (
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number
  ) => {
    if (isValidMove(startRow, startCol, endRow, endCol)) {
      movePiece(startRow, startCol, endRow, endCol);
      setSelectedPiece(null);
      setAvailableMoves([]);
    }
  };

  const movePiece = (
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number
  ) => {
    const newBoard = structuredClone(board);
    const piece = newBoard[startRow][startCol];
    if (!piece) return;

    // Check if it's a hop over an opponent's piece
    let opponentPieceCaptured = false;
    if (
      Math.abs(endRow - startRow) === 2 &&
      Math.abs(endCol - startCol) === 2
    ) {
      const midRow = (startRow + endRow) / 2;
      const midCol = (startCol + endCol) / 2;
      const opponentPiece = newBoard[midRow][midCol];

      if (opponentPiece && opponentPiece.player !== piece.player) {
        newBoard[midRow][midCol] = null;
        opponentPieceCaptured = true;
        setScores((prevScores) => ({
          ...prevScores,
          [piece.player]: prevScores[piece.player] + 1,
        }));
      }
    }

    newBoard[startRow][startCol] = null;
    newBoard[endRow][endCol] = piece;

    if (
      (piece.player === "R" && endRow === 0) ||
      (piece.player === "B" && endRow === BOARD_SIZE - 1)
    ) {
      newBoard[endRow][endCol]!.king = true;
    }

    setBoard(newBoard);

    if (opponentPieceCaptured && canJumpAgain(endRow, endCol, newBoard)) {
      setMultiJumpAvailable(true);
      setLastMovedPiece({ row: endRow, col: endCol });
    } else {
      setMultiJumpAvailable(false);
      setLastMovedPiece(null);
      setCurrentPlayer(currentPlayer === "R" ? "B" : "R");
    }
  };

  const canJumpAgain = (
    row: number,
    col: number,
    currentBoard: Board
  ): boolean => {
    const piece = currentBoard[row][col];
    if (!piece) return false;

    const directions = piece.king ? [1, -1] : piece.player === "R" ? [-1] : [1];
    for (let rowDir of directions) {
      for (let colDir of [-2, 2]) {
        const newRow = row + rowDir * 2;
        const newCol = col + colDir;
        if (
          newRow >= 0 &&
          newRow < BOARD_SIZE &&
          newCol >= 0 &&
          newCol < BOARD_SIZE &&
          isValidHopMove(row, col, newRow, newCol, currentBoard)
        ) {
          return true;
        }
      }
    }
    return false;
  };

  const isValidMove = (
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number,
    currentBoard = board
  ): boolean => {
    if (currentBoard[endRow][endCol] !== null) return false;

    const piece = currentBoard[startRow][startCol];
    if (!piece) return false;

    if (
      multiJumpAvailable &&
      (!lastMovedPiece ||
        lastMovedPiece.row !== startRow ||
        lastMovedPiece.col !== startCol)
    ) {
      return false;
    }

    const direction = piece.king ? [1, -1] : piece.player === "R" ? [-1] : [1];
    const rowDiff = endRow - startRow;
    const colDiff = Math.abs(endCol - startCol);

    if (!multiJumpAvailable && direction.includes(rowDiff) && colDiff === 1) {
      return true;
    }

    return isValidHopMove(startRow, startCol, endRow, endCol, currentBoard);
  };

  const isValidHopMove = (
    startRow: number,
    startCol: number,
    endRow: number,
    endCol: number,
    currentBoard: Board
  ): boolean => {
    const piece = currentBoard[startRow][startCol];
    if (!piece) return false;

    const direction = piece.king ? [1, -1] : piece.player === "R" ? [-1] : [1];
    const rowDiff = endRow - startRow;
    const colDiff = Math.abs(endCol - startCol);

    if (direction.includes(rowDiff / 2) && colDiff === 2) {
      const midRow = (startRow + endRow) / 2;
      const midCol = (startCol + endCol) / 2;
      const opponentPiece = currentBoard[midRow][midCol];
      if (
        opponentPiece &&
        opponentPiece.player !== piece.player &&
        currentBoard[endRow][endCol] === null
      ) {
        return true;
      }
    }

    return false;
  };

  const resetGame = () => {
    setBoard(initializeBoard());
    setCurrentPlayer("R");
    setScores({ R: 0, B: 0 });
    setMultiJumpAvailable(false);
    setLastMovedPiece(null);
  };

  const makeComputerMove = () => {
    const blackPieces = [];
    for (let row = 0; row < BOARD_SIZE; row++) {
      for (let col = 0; col < BOARD_SIZE; col++) {
        const piece = board[row][col];
        if (piece && piece.player === "B") {
          const moves = calculateAvailableMoves(row, col);
          if (moves.length > 0) {
            blackPieces.push({ row, col, moves });
          }
        }
      }
    }

    // Always prioritize moves that capture opponent pieces
    let capturingMoves: {
      row: number;
      col: number;
      move: { row: number; col: number };
    }[] = [];
    blackPieces.forEach(({ row, col, moves }) => {
      moves.forEach((move) => {
        if (Math.abs(move.row - row) === 2 && Math.abs(move.col - col) === 2) {
          capturingMoves.push({ row, col, move });
        }
      });
    });

    if (capturingMoves.length > 0) {
      // Prioritize capturing moves by selecting the first one found
      const selectedMove = capturingMoves[0];
      movePiece(
        selectedMove.row,
        selectedMove.col,
        selectedMove.move.row,
        selectedMove.move.col
      );
    } else if (blackPieces.length > 0) {
      const randomPieceIndex = Math.floor(Math.random() * blackPieces.length);
      const selectedPiece = blackPieces[randomPieceIndex];
      const randomMoveIndex = Math.floor(
        Math.random() * selectedPiece.moves.length
      );
      const move = selectedPiece.moves[randomMoveIndex];
      movePiece(selectedPiece.row, selectedPiece.col, move.row, move.col);
    }
  };

  const Cell: React.FC<{ row: number; col: number; piece: Piece }> = ({
    row,
    col,
    piece,
  }) => {
    const [, drop] = useDrop({
      accept: "PIECE",
      drop: (item: { row: number; col: number }) =>
        handleDrop(item.row, item.col, row, col),
    });

    const isHighlighted = availableMoves.some(
      (move) => move.row === row && move.col === col
    );

    return (
      <div
        ref={drop}
        onClick={() => handleSelectPiece(row, col)}
        className={`flex items-center justify-center rounded-full cursor-pointer ${
          (row + col) % 2 === 1
            ? `w-12 h-12 ${isHighlighted ? "bg-green-500" : "bg-blue-500"}`
            : "bg-blue-200 w-2 h-2 m-5"
        }`}
      >
        {piece && <PieceComponent piece={piece} row={row} col={col} />}
      </div>
    );
  };

  const PieceComponent: React.FC<{
    piece: Piece;
    row: number;
    col: number;
  }> = ({ piece, row, col }) => {
    const [{ isDragging }, drag] = useDrag({
      type: "PIECE",
      item: { row, col },
      canDrag: () =>
        piece?.player === currentPlayer &&
        (!multiJumpAvailable ||
          (lastMovedPiece?.row === row && lastMovedPiece?.col === col)) &&
        (!isSinglePlayer || currentPlayer === "R"),
      collect: (monitor) => ({
        isDragging: !!monitor.isDragging(),
      }),
    });

    return (
      <div
        ref={drag}
        className={`w-full h-full rounded-full ${
          piece?.player === "R" ? "bg-red-500" : "bg-black"
        } ${piece?.king ? "border-4 border-amber-500" : ""} ${
          isDragging ? "opacity-50" : ""
        }`}
      />
    );
  };

  return (
    <DndProvider backend={HTML5Backend}>
      <div className="flex flex-col items-center">
        <div className="flex mb-4">
          <button
            onClick={() => setIsSinglePlayer(false)}
            className="px-4 py-2 bg-blue-500 text-white rounded mr-2 hover:bg-blue-700"
          >
            Two Player
          </button>
          <button
            onClick={() => setIsSinglePlayer(true)}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
          >
            One Player
          </button>
        </div>
        <div className="flex justify-between w-96 mb-4">
          <div className="text-xl font-bold text-red-500">Red: {scores.R}</div>
          <div className="text-xl font-bold text-black">Black: {scores.B}</div>
        </div>
        <div className="text-lg font-bold mb-2">
          Current Turn: {currentPlayer === "R" ? "Red" : "Black"}
        </div>
        <div className="flex flex-col w-96 h-96">
          {board.map((row, rowIndex) => (
            <div key={rowIndex} className="flex flex-1">
              {row.map((cell, colIndex) => (
                <Cell
                  key={colIndex}
                  row={rowIndex}
                  col={colIndex}
                  piece={cell}
                />
              ))}
            </div>
          ))}
        </div>
        {scores.R === 12 && (
          <div className="text-2xl font-bold text-red-500 mt-4">Red Wins!</div>
        )}
        {scores.B === 12 && (
          <div className="text-2xl font-bold text-black mt-4">Black Wins!</div>
        )}
        <button
          onClick={resetGame}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
        >
          Reset Game
        </button>
      </div>
    </DndProvider>
  );
};

export default App;
