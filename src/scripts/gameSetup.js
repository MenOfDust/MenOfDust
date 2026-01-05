

// Make the DIV element draggable:

import { initModal } from "./ui/modal.js";
import { initCharts, updateCharts } from "./ui/netChart.js";
import {projectedNextTurnValues} from "./campaign/turnSystem.js";
import { renderSidebar } from './ui/sidebar.js';
import { cities } from './campaign/cities.js';
import { simulateTurn, commitTurn} from './campaign/turnSystem.js';
import { showActiveGoals } from './ui/goalUI.js';
import { updateAllCityCharts } from './ui/cityCharts.js';
import { turnCounter } from './campaign/turnCounter.js';

  document.querySelectorAll('.dragBox').forEach(box => {
    makeDraggable(box);
  });

function makeDraggable(elmnt) {
  var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
  if (document.getElementById(elmnt.id + "Header")) {
    // if present, the header is where you move the DIV from:
    document.getElementById(elmnt.id + "Header").onmousedown = dragMouseDown;
  } else {
    // otherwise, move the DIV from anywhere inside the DIV:
    elmnt.onmousedown = dragMouseDown;
  }

  function dragMouseDown(e) {
    console.log("drag event is happening")
    e = e || window.event;
    e.preventDefault();
    // get the mouse cursor position at startup:
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onmouseup = closeDragElement;
    // call a function whenever the cursor moves:
    document.onmousemove = elementDrag;
  }

  function elementDrag(e) {
    e = e || window.event;
    e.preventDefault();
    // calculate the new cursor position:
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;
    // set the element's new position:
    elmnt.style.top = (elmnt.offsetTop - pos2) + "px";
    elmnt.style.left = (elmnt.offsetLeft - pos1) + "px";
  }

  function closeDragElement() {
    // stop moving when mouse button is released:
    document.onmouseup = null;
    document.onmousemove = null;
  }
}


 
// setup next-turn button + modal
function wireNextTurnModal() {
  const nextTurnBtn = document.getElementById('nextTurnBtn');
  const modal = document.getElementById('confirmModal');
  const confirmYes = document.getElementById('confirmYes');
  const confirmNo = document.getElementById('confirmNo');

  nextTurnBtn.addEventListener('click', () => {
    modal.classList.remove('hidden');
    modal.classList.add('show');
  });

  confirmNo.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.classList.add('hidden');
  });

  confirmYes.addEventListener('click', () => {
    modal.classList.remove('show');
    modal.classList.add('hidden');
    // Run one global turn
    simulateTurn();
    //Actually save the changes
    commitTurn();  
    // Refresh UI after turn completes
    renderSidebar();
  });
}

// Zoom scaling functionality to preserve layout at different zoom levels
// This system detects browser zoom changes and adjusts the game scale to maintain
// relative positioning and readability across different zoom levels (50% to 200%+)
function initZoomScaling() {
  let currentZoom = 1;
  let baseFontSize = 16; // Base font size in pixels

  function updateZoomScale() {
    // Detect zoom level by comparing actual font size to base font size
    const testElement = document.createElement('div');
    testElement.style.cssText = 'position:absolute;visibility:hidden;font-size:1em;width:1em;height:1em;overflow:hidden;';
    document.body.appendChild(testElement);

    const emWidth = testElement.offsetWidth;
    document.body.removeChild(testElement);

    // Calculate zoom level (assuming 16px base font size)
    const detectedZoom = emWidth / baseFontSize;

    // Only update if zoom changed significantly (prevent excessive updates)
    if (Math.abs(detectedZoom - currentZoom) > 0.05) {
      currentZoom = detectedZoom;

      // Calculate appropriate scale factor
      // At 100% zoom: scale = 1
      // At 200% zoom: scale = 0.8 (to compensate)
      // At 50% zoom: scale = 1.2 (to compensate)
      let scaleFactor = 1 / Math.sqrt(currentZoom);

      // Clamp scale factor to reasonable bounds
      scaleFactor = Math.max(0.5, Math.min(2, scaleFactor));

      // Update CSS custom property
      document.documentElement.style.setProperty('--game-scale', scaleFactor);

      // Update UI spacing based on zoom
      const spacingFactor = Math.max(0.5, Math.min(2, 1 / currentZoom));
      document.documentElement.style.setProperty('--ui-spacing', `${spacingFactor}rem`);
      document.documentElement.style.setProperty('--ui-margin', `${spacingFactor * 3}rem`);

      console.log(`Zoom detected: ${(currentZoom * 100).toFixed(1)}%, Scale factor: ${scaleFactor.toFixed(2)}`);
    }
  }

  // Initial update
  updateZoomScale();

  // Listen for zoom changes
  window.addEventListener('resize', updateZoomScale);

  // Also listen for browser zoom changes (less reliable but better than nothing)
  let lastZoomCheck = Date.now();
  const zoomCheckInterval = setInterval(() => {
    const now = Date.now();
    if (now - lastZoomCheck > 500) { // Check every 500ms
      updateZoomScale();
      lastZoomCheck = now;
    }
  }, 100);

  // Clean up interval on page unload
  window.addEventListener('beforeunload', () => {
    clearInterval(zoomCheckInterval);
  });
}

document.addEventListener("DOMContentLoaded", () => {
  initCharts();
  initModal();
  renderSidebar();
  wireNextTurnModal();
  updateAllCityCharts();
  updateCharts();
  // Initialize turn counter
  turnCounter.initialize();
  // Initialize zoom scaling
  initZoomScaling();
});


const choiceBox=document.getElementById("choiceBox");
const choiceBoxList=document.getElementById("choiceBoxList");
const resourceChart=document.getElementById('resourceChart');
 


// --- Listener Containment Zone ---

// These duplicate listeners have been removed to prevent multiple simulateTurn() calls
// The wireNextTurnModal() function handles all next turn logic properly

// UI helper functions

function clearChoices(e){
    const parent = e.currentTarget.parentElement;
    //kill the child, save the parent
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
        } 
    const grandfather=parent.parentElement;
    grandfather.style.display = "none";
}

// Used to set or reset the initial positions of all the draggable elements.

function moveToVH(element, vh, customInnerHeight = window.innerHeight){
  if (!(element instanceof HTMLElement)) {
    console.error('moveToVH: attempting to move something that is not an HTML element');
    return;
  }

  const yPosition = customInnerHeight * (vh / 100);
  element.style.position = 'absolute';
  element.style.top = `${yPosition}px`;

}
