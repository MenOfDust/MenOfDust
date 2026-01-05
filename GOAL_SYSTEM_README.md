# Production Goal System

This system allows players to set and track production goals for their cities, using the draggable choiceBox UI element.

## Features

- **Goal Creation**: Set targets for specific resources (credits, metal, population, etc.)
- **Time Limits**: Goals must be achieved within a specified number of turns
- **Progress Tracking**: Automatic checking of goal completion each turn
- **Visual Feedback**: Success/failure messages and goal status display
- **Multiple Goals**: Support for tracking multiple concurrent goals

## How to Use

1. **Access Goals**: Click the "🎯 Production Goals" button in the City Manager sidebar
2. **Set New Goal**: Choose from predefined goal templates or create custom goals
3. **Monitor Progress**: View active goals and their remaining time
4. **Achievement**: Goals are automatically checked each turn

## Predefined Goal Templates

- **Credit Production**: Reach 100 credits per turn within 5 turns
- **Metal Production**: Reach 50 common metal per turn within 3 turns
- **Population Growth**: Reach 20 population growth per turn within 4 turns

## Technical Implementation

### Files Created/Modified

- `src/scripts/campaign/goalSystem.js` - Core goal tracking logic
- `src/scripts/ui/goalUI.js` - UI components for goal interaction
- `src/scripts/campaign/turnSystem.js` - Integrated goal checking into turn system
- `src/scripts/ui/sidebar.js` - Added goals button to sidebar
- `src/styles/styles.css` - Added goal system styling

### Key Components

#### GoalSystem Class
- Manages goal lifecycle (creation, tracking, completion)
- Integrates with turn system for automatic progress checking
- Provides callbacks for success/failure events

#### Goal UI
- Uses the existing draggable choiceBox for goal selection
- Displays active goals with progress indicators
- Shows notification messages for goal completion/failure

#### Integration Points
- Goals are checked automatically after each `simulateTurn()` call
- UI updates are triggered when goals complete or fail
- Goal system state persists across turns

## Example Usage

```javascript
import { goalSystem, goalTemplates } from './campaign/goalSystem.js';

// Create a goal using a template
const goal = goalSystem.createGoal(
  goalTemplates.creditProduction.resourceKey,
  goalTemplates.creditProduction.targetAmount,
  goalTemplates.creditProduction.turnsLimit,
  goalTemplates.creditProduction.description
);

// Or create a custom goal
const customGoal = goalSystem.createGoal(
  'commonMetal',
  75,
  4,
  'Reach 75 metal production within 4 turns'
);
```

## Future Enhancements

- Custom goal creation UI
- Goal rewards and penalties
- Goal chains (achieve one to unlock another)
- Persistent goal save/load
- Goal statistics and achievements