// ui/goalUI.js
import { goalSystem, goalTemplates } from "../campaign/goalSystem.js";
import { renderSidebar } from "./sidebar.js";

const choiceBox = document.getElementById("choiceBox");
const choiceBoxList = document.getElementById("choiceBoxList");
const choiceBoxHeader = document.getElementById("choiceBoxHeader");

/**
 * Display available goals in the choiceBox
 */
export function showGoalSelection() {
  clearChoiceBox();

  const header = document.createElement('h3');
  header.textContent = "Choose Your Production Goal";
  header.style.color = "#e0e0e0";
  header.style.marginBottom = "10px";
  choiceBoxList.appendChild(header);

  // Add goal options
  Object.entries(goalTemplates).forEach(([key, template]) => {
    const goalButton = document.createElement('button');
    goalButton.textContent = template.description;
    goalButton.className = 'goal-option';
    goalButton.style.cssText = `
      display: block;
      width: 100%;
      margin: 5px 0;
      padding: 8px;
      background: #2a2a2a;
      color: #ffffffff;
      border: 1px solid #555;
      border-radius: 4px;
      cursor: pointer;
      text-align: left;
    `;

    goalButton.addEventListener('click', () => {
      acceptGoal(template);
    });

    goalButton.addEventListener('mouseover', () => {
      goalButton.style.background = '#3a3a3a';
    });

    goalButton.addEventListener('mouseout', () => {
      goalButton.style.background = '#2a2a2a';
    });

    choiceBoxList.appendChild(goalButton);
  });

  // Show choiceBox
  choiceBox.style.display = "block";
  choiceBox.classList.add('goal-active');
  choiceBoxHeader.classList.add('goal-active');
  moveToVH(choiceBox, Number(choiceBox.dataset.defaultVh || 40));
}

/**
 * Accept a goal and start tracking it
 */
function acceptGoal(template) {
  const goal = goalSystem.createGoal(
    template.resourceKey,
    template.targetAmount,
    template.turnsLimit,
    template.description,
    onGoalSuccess,
    onGoalFailure
  );

  clearChoiceBox();
  showActiveGoals();

  // Show confirmation message
  showGoalMessage(`Goal accepted: ${template.description}`, 'success');
}

/**
 * Display currently active goals
 */
export function showActiveGoals() {
  clearChoiceBox();

  const activeGoals = goalSystem.getActiveGoals();

  if (activeGoals.length === 0) {
    const noGoalsMsg = document.createElement('p');
    noGoalsMsg.textContent = "No active goals. Click 'Set New Goal' to begin.";
    noGoalsMsg.style.color = "#ffffffff";
    choiceBoxList.appendChild(noGoalsMsg);

    const newGoalBtn = document.createElement('button');
    newGoalBtn.textContent = "Set New Goal";
    newGoalBtn.className = 'goal-button';
    newGoalBtn.style.cssText = `
      display: block;
      width: 100%;
      margin: 10px 0;
      padding: 8px;
      background: #4a4a4a;
      color: #e0e0e0;
      border: 1px solid #666;
      border-radius: 4px;
      cursor: pointer;
    `;

    newGoalBtn.addEventListener('click', showGoalSelection);
    choiceBoxList.appendChild(newGoalBtn);
  } else {
    const header = document.createElement('h3');
    header.textContent = "Active Production Goals";
    header.style.color = "#e0e0e0";
    header.style.marginBottom = "10px";
    choiceBoxList.appendChild(header);

    activeGoals.forEach(goal => {
      const goalDiv = document.createElement('div');
      goalDiv.className = 'active-goal';
      goalDiv.style.cssText = `
        background: #2a2a2a;
        border: 1px solid #555;
        border-radius: 4px;
        padding: 10px;
        margin: 5px 0;
        color: #e0e0e0;
      `;

      goalDiv.innerHTML = `
        <div style="font-weight: bold; margin-bottom: 5px;">${goal.description}</div>
        <div style="font-size: 0.9em; color: #ccc;">
          Turns remaining: ${goal.turnsRemaining}
        </div>
      `;

      choiceBoxList.appendChild(goalDiv);
    });

    const newGoalBtn = document.createElement('button');
    newGoalBtn.textContent = "Set Additional Goal";
    newGoalBtn.className = 'goal-button';
    newGoalBtn.style.cssText = `
      display: block;
      width: 100%;
      margin: 10px 0;
      padding: 8px;
      background: #4a4a4a;
      color: #e0e0e0;
      border: 1px solid #666;
      border-radius: 4px;
      cursor: pointer;
    `;

    newGoalBtn.addEventListener('click', showGoalSelection);
    choiceBoxList.appendChild(newGoalBtn);
  }

  choiceBox.style.display = "block";
  choiceBox.classList.add('goal-active');
  choiceBoxHeader.classList.add('goal-active');
  moveToVH(choiceBox, Number(choiceBox.dataset.defaultVh || 40));
}

/**
 * Show goal completion/failure messages
 */
function showGoalMessage(message, type) {
  const messageDiv = document.createElement('div');
  messageDiv.className = `goal-message ${type}`;
  messageDiv.textContent = message;
  messageDiv.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: ${type === 'success' ? '#2d5a2d' : '#5a2d2d'};
    color: #e0e0e0;
    padding: 15px;
    border-radius: 5px;
    border: 1px solid ${type === 'success' ? '#4a8a4a' : '#8a4a4a'};
    max-width: 300px;
  `;

  document.body.appendChild(messageDiv);

  // Auto-remove after 5 seconds
  setTimeout(() => {
    if (messageDiv.parentNode) {
      messageDiv.parentNode.removeChild(messageDiv);
    }
  }, 5000);
}

/**
 * Callback for successful goal completion
 */
function onGoalSuccess(goal) {
  showGoalMessage(`Goal achieved: ${goal.description}`, 'success');
  renderSidebar(); // Refresh UI
}

/**
 * Callback for goal failure
 */
function onGoalFailure(goal) {
  showGoalMessage(`Goal failed: ${goal.description}`, 'failure');
  renderSidebar(); // Refresh UI
}

/**
 * Clear the choice box content
 */
function clearChoiceBox() {
  while (choiceBoxList.firstChild) {
    choiceBoxList.removeChild(choiceBoxList.firstChild);
  }
  choiceBox.classList.remove('goal-active');
  choiceBoxHeader.classList.remove('goal-active');
  choiceBox.style.display = "none";
}

/**
 * Move element to viewport height position (utility function)
 */
function moveToVH(element, vh, customInnerHeight = window.innerHeight) {
  if (!(element instanceof HTMLElement)) {
    console.error('moveToVH: attempting to move something that is not an HTML element');
    return;
  }

  const yPosition = customInnerHeight * (vh / 100);
  element.style.position = 'absolute';
  element.style.top = `${yPosition}px`;
}

