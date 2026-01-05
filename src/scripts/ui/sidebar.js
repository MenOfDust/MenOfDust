import { cities } from '../campaign/cities.js';
import { createCityPanel } from './cityPanel.js';
import { showActiveGoals } from './goalUI.js';

/**
 * Render the sidebar with all city panels side by side
 */
export function renderSidebar() {
  const container = document.getElementById('citySidebar');
  if (!container) return;
  container.innerHTML = '';

  // Flex layout for horizontal city panels
  container.style.display = 'flex';
  container.style.flexWrap = 'wrap';
  container.style.gap = '1rem';
  container.style.justifyContent = 'flex-start';
  container.style.alignItems = 'flex-start';
  container.style.width = '50vw'; // go all the way to the middle of the page
  container.style.maxWidth = '100%';
  container.style.paddingRight = '1rem';

  // Optional title
  const title = document.createElement('div');
  title.innerHTML = `
  <h2 style="
    margin: 0.5rem 0.5rem 0.75rem 0;
    text-align: center;
    background: #1A1A1A;               /* a refined dark neutral */
    color: white;
    font-size: 1.3rem;
    padding: 0.6rem 0;                 /* breathing room */
    border-radius: 6px;                /* soft shape */
    border: 1px solid #2E2E2E;         /* subtle frame */
    box-shadow: 0 5px 6px rgba(0,0,0,0.45); /* dimensional depth */
  ">
    City Manager
  </h2>
`;
  title.style.width = '100%';
  container.appendChild(title);

  // Goals button
  const goalsButton = document.createElement('button');
  goalsButton.textContent = '🎯 Production Goals';
  goalsButton.style.cssText = `
    display: block;
    width: calc(100% - 1rem);
    margin: 0 0.5rem 1rem 0.5rem;
    padding: 0.5rem;
    background: #2A2A2A;
    color: #E0E0E0;
    border: 1px solid #555;
    border-radius: 4px;
    cursor: pointer;
    font-size: 1rem;
    text-align: center;
  `;
  goalsButton.addEventListener('click', showActiveGoals);
  goalsButton.addEventListener('mouseover', () => {
    goalsButton.style.background = '#3A3A3A';
  });
  goalsButton.addEventListener('mouseout', () => {
    goalsButton.style.background = '#2A2A2A';
  });
  container.appendChild(goalsButton);

  cities.forEach((city, idx) => {
    const panel = createCityPanel(city, idx);
    container.appendChild(panel);
  });
}
