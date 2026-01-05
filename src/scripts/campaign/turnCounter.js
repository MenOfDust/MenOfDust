// systems/turnCounter.js

class TurnCounter {
  constructor() {
    this.currentTurn = 1;
    this.displayElement = null;
    this.initialize();
  }

  initialize() {
    this.displayElement = document.getElementById('currentTurn');
    if (this.displayElement) {
      this.updateDisplay();
    }
  }

  /**
   * Advance to the next turn
   */
  nextTurn() {
    this.currentTurn++;
    this.updateDisplay();
  }

  /**
   * Reset the turn counter
   */
  reset() {
    this.currentTurn = 1;
    this.updateDisplay();
  }

  /**
   * Get the current turn number
   */
  getCurrentTurn() {
    return this.currentTurn;
  }

  /**
   * Set the turn number (for loading games)
   */
  setTurn(turnNumber) {
    this.currentTurn = turnNumber;
    this.updateDisplay();
  }

  /**
   * Update the UI display
   */
  updateDisplay() {
    if (this.displayElement) {
      this.displayElement.textContent = this.currentTurn;
    }
  }
}

// Create singleton instance
export const turnCounter = new TurnCounter();