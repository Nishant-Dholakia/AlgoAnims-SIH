let queue = [];
let queueSize = 0;
let frontIndex = -1; 
let rearIndex = -1;  
let counter =0;

function size() {
  const sizeInput = document.getElementById('sizevalue');
  queueSize = parseInt(sizeInput.value);

  if (isNaN(queueSize) || queueSize <= 0) {
    displayMessage("Please enter a valid queue size.");
    return;
  }

  queue = new Array(queueSize).fill(null); 
  frontIndex = -1;
  rearIndex = -1;
  
  document.getElementById("sizeval").disabled=true;
  clearMessage();
  renderQueue();
}

function enqueue() {
  const valueInput = document.getElementById('valueInput');
  const value = parseInt(valueInput.value);

  if (isNaN(value)) {
    displayMessage("Please enter a valid number to enqueue.");
    return;
  }

 
  if ((rearIndex + 1) % queueSize === frontIndex || counter == queueSize) {
    displayMessage("Queue is full");
    return;
  }

  
  rearIndex = (rearIndex + 1) % queueSize;
  queue[rearIndex] = value;
  counter++;

  
  if (frontIndex === -1) {
    frontIndex = rearIndex;
  }

  const highPriorityChecked = document.getElementById('highprq').checked;

  
  let nonNullValues = queue.filter(item => item !== null);

 
  nonNullValues.sort((a, b) => (highPriorityChecked ? b - a : a - b)); 

  
  let newQueue = [];
  let nonNullIndex = 0;

  for (let i = 0; i < queueSize; i++) {
    if (queue[i] === null) {
      newQueue[i] = null;  
    } else {
      newQueue[i] = nonNullValues[nonNullIndex++];
    }
  }

 
  queue = newQueue;

  valueInput.value = ""; 
  clearMessage();
  renderQueue();
}


function dequeue() {
  if (frontIndex === -1) {
    displayMessage("Queue is empty");
    document.getElementById("sizeval").disabled=false;
    return;
  }

  
  queue[frontIndex] = null;

  
  if (frontIndex === rearIndex) {
    frontIndex = -1;
    rearIndex = -1;
  } else {
    frontIndex = (frontIndex + 1) % queueSize;
  }

  clearMessage();
  renderQueue();
}

function renderQueue() {
  const queueContainer = document.getElementById('queueContainer');
  queueContainer.innerHTML = '';
const r1=document.getElementById("highprq")

  for (let i = 0; i < queueSize; i++) {
    const box = document.createElement('div');
    box.className = 'queue-box';
    box.textContent = queue[i] !== null ? queue[i] : '';
    queueContainer.appendChild(box);

    
    if (i === frontIndex && frontIndex !== -1) {
      const frontLabel = document.createElement('div');
      frontLabel.className = 'label front-label';
      frontLabel.innerText = 'Front';
      box.appendChild(frontLabel);
    }

    if (i === rearIndex && rearIndex !== -1) {
      const rearLabel = document.createElement('div');
      rearLabel.className = 'label rear-label';
      rearLabel.innerText = 'Rear';
      box.appendChild(rearLabel);
    }
  }
}

function displayMessage(msg) {
  const messageElement = document.getElementById('message');
  messageElement.innerText = msg;
  setTimeout(() => {
    messageElement.innerText = "";
  }, 1700);
}

function clearMessage() {
  const messageElement = document.getElementById('message');
  messageElement.innerText = "";
}

function handleSizeKeypress(event) {
  if (event.key === 'Enter') {
    size();
  }
}

function handleEnqueueKeypress(event) {
  if (event.key === 'Enter') {
    enqueue();
  }
}
function reset(){
  document.getElementById("sizevalue").value='';
  document.getElementById("valueInput").value='';
  document.getElementById("queueContainer").innerHTML='';
}