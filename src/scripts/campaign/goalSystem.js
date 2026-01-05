// systems/goalSystem.js
import { resources } from "./resources.js";
import { simulateTurn, commitTurn } from "./turnSystem.js";

class GoalSystem {
  constructor() {
    this.activeGoals = [];
    this.completedGoals = [];
    this.failedGoals = [];
    this.turnCounter = 0;
  }

  /**
   * Create a new production goal
   * @param {string} resourceKey - The resource to target (e.g., 'credits')
   * @param {number} targetAmount - The production amount to reach per turn
   * @param {number} turnsLimit - Number of turns to achieve the goal
   * @param {string} description - Human-readable description of the goal
   * @param {Function} onSuccess - Callback when goal is achieved
   * @param {Function} onFailure - Callback when goal fails
   */
  createGoal(resourceKey, targetAmount, turnsLimit, description, onSuccess = null, onFailure = null) {
    const goal = {
      id: Date.now() + Math.random(),
      resourceKey,
      targetAmount,
      turnsLimit,
      turnsRemaining: turnsLimit,
      description,
      onSuccess,
      onFailure,
      startTurn: this.turnCounter,
      status: 'active'
    };

    this.activeGoals.push(goal);
    return goal;
  }

  /**
   * Check if any active goals have been achieved or failed
   */
  checkGoals() {
    this.activeGoals.forEach(goal => {
      const currentProduction = resources[goal.resourceKey]?.delta || 0;

      if (currentProduction >= goal.targetAmount) {
        // Goal achieved!
        goal.status = 'completed';
        this.completedGoals.push(goal);
        if (goal.onSuccess) goal.onSuccess(goal);
      } else if (goal.turnsRemaining <= 0) {
        // Goal failed
        goal.status = 'failed';
        this.failedGoals.push(goal);
        if (goal.onFailure) goal.onFailure(goal);
      }
    });

    // Remove completed/failed goals from active list
    this.activeGoals = this.activeGoals.filter(goal => goal.status === 'active');
  }

  /**
   * Advance turn counter and decrement remaining turns for all goals
   */
  advanceTurn() {
    this.turnCounter++;
    this.activeGoals.forEach(goal => {
      goal.turnsRemaining--;
    });
    this.checkGoals();
  }

  /**
   * Get all active goals
   */
  getActiveGoals() {
    return this.activeGoals;
  }

  /**
   * Get all completed goals
   */
  getCompletedGoals() {
    return this.completedGoals;
  }

  /**
   * Get all failed goals
   */
  getFailedGoals() {
    return this.failedGoals;
  }

  /**
   * Clear all goals
   */
  clearAllGoals() {
    this.activeGoals = [];
    this.completedGoals = [];
    this.failedGoals = [];
  }
}

// Create singleton instance
export const goalSystem = new GoalSystem();

// Predefined goal templates
export const goalTemplates = {
  creditProduction: {
    resourceKey: 'credits',
    targetAmount: 100,
    turnsLimit: 5,
    description: "Reach 100 credits per turn production within 5 turns"
  },
  metalProduction: {
    resourceKey: 'commonMetal',
    targetAmount: 50,
    turnsLimit: 3,
    description: "Reach 50 common metal per turn production within 3 turns"
  },
  populationGrowth: {
    resourceKey: 'pop',
    targetAmount: 20,
    turnsLimit: 4,
    description: "Reach 20 population growth per turn within 4 turns"
  }
}