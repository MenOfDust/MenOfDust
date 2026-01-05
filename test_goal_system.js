// Test script for goal system
import { goalSystem, goalTemplates } from './campaign/goalSystem.js';
import { resources } from './campaign/resources.js';

// Test goal creation
console.log('Testing goal system...');

// Create a test goal
const testGoal = goalSystem.createGoal(
  'credits',
  50,
  3,
  'Test goal: Reach 50 credits/turn in 3 turns'
);

console.log('Created goal:', testGoal);

// Simulate some resource production
resources.credits.delta = 60; // Exceed the goal

// Advance turn and check goals
goalSystem.advanceTurn();

console.log('Active goals after turn 1:', goalSystem.getActiveGoals().length);
console.log('Completed goals:', goalSystem.getCompletedGoals().length);

console.log('Goal system test completed successfully!');