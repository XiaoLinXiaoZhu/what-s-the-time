import { ref, reactive } from 'vue'
import type { GameState } from '@/types'

const gameState = ref<GameState>({
  currentLoop: 'A',
  unlockedFlags: new Set(),
  viewedSegments: new Set(),
  currentTime: undefined,
  needsSecondQuestion: false
})

export function useGameState() {
  const updateGameState = (updates: Partial<GameState>) => {
    Object.assign(gameState.value, updates)
  }

  const addFlag = (flag: string) => {
    gameState.value.unlockedFlags.add(flag)
  }

  const removeFlag = (flag: string) => {
    gameState.value.unlockedFlags.delete(flag)
  }

  const hasFlag = (flag: string): boolean => {
    return gameState.value.unlockedFlags.has(flag)
  }

  const resetGame = () => {
    gameState.value = {
      currentLoop: 'A',
      unlockedFlags: new Set(),
      viewedSegments: new Set(),
      currentTime: undefined,
      needsSecondQuestion: false
    }
  }

  return {
    gameState,
    updateGameState,
    addFlag,
    removeFlag,
    hasFlag,
    resetGame
  }
}

