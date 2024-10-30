let inputArray = [];

function isFloat(num) {
  return num % 1 !== 0;
}

function duplicates(array) {
  return new Set(array).size !== array.length;
}

function alertfun(a) {
  const modal = document.getElementById("confirmationModal");
  modal.style.display = "flex"; 
  let p = document.getElementById('alertmessage');
  p.innerHTML = a; 
  document.getElementById('closeModal').addEventListener('click', () => {
    modal.style.display = "none"; 
  });
}

function enter() {
  let input = document.getElementById('arrayInput').value.trim();

  if (input.endsWith(',')) {
    alertfun('Enter value properly...');
    document.getElementById('arrayInput').value = '';
    return;
  }

  if (isNaN(input) || isFloat(input)) {
    alertfun('Enter only integer values.');
    document.getElementById('arrayInput').value = '';
    return;
  }

  if (inputArray.length >= 15) {
    alertfun('You can enter only 15 elements...');
    return;
  }

  inputArray.push(parseInt(input));
  document.getElementById('arrayInput').value = '';

  if (duplicates(inputArray)) {
    alertfun('Duplicates are not allowed');
    inputArray.pop(); 
    document.getElementById('arrayInput').value = '';
    return;
  }

  const numberContainer = document.getElementById('numberContainer');
  numberContainer.innerHTML = '';
  inputArray.forEach((num, index) => {
    const div = document.createElement('div');
    div.className = 'number-box';
    div.innerText = num;
    div.id = 'box-' + index;
    numberContainer.appendChild(div);
  });
}



async function binarysearch() {
  const modal = document.getElementById("confirmationModal"); 
  modal.style.display = "none"; 

  document.getElementById('message').innerText = '';

  const numval = document.getElementById('value').value; 
  if (isNaN(parseInt(numval)) || isFloat(numval)) {
    alertfun('Enter a valid integer value to search.');
    document.getElementById('arrayInput').value = '';
    document.getElementById('value').value = '';
    return;
  }
  
  inputArray.sort((a, b) => a - b);
  const numberContainer = document.getElementById('numberContainer');
  numberContainer.innerHTML = '';
  inputArray.forEach((num, index) => {
    const div = document.createElement('div');
    div.className = 'number-box';
    div.innerText = num;
    div.id = 'box-' + index;
    numberContainer.appendChild(div);
  });

  document.getElementById("searchbtn").disabled = true;
  document.getElementById("arrayInput").disabled = true;
  document.getElementById("value").disabled = true;

  const num = parseInt(document.getElementById('value').value);
  let low = 0, high = inputArray.length - 1;
  let found = false;

  while (low <= high) {
    let mid = Math.floor((low + high) / 2);
    let box = document.getElementById('box-' + mid);
    box.classList.add('highlight');
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (inputArray[mid] === num) {
      box.classList.remove('highlight');
      box.classList.add('found');
      document.getElementById('message').innerText = `Number ${num} found at index ${mid}.`;
      found = true;
      break;
    } else if (inputArray[mid] > num) {
      high = mid - 1;
    } else {
      low = mid + 1;
    }

    box.classList.remove('highlight');
    box.classList.add('hred');
    await new Promise(resolve => setTimeout(resolve, 1000));
    box.classList.remove('hred');
  }

  if (!found) {
    document.getElementById('message').innerText = `Number ${num} not found.`;
  }

  document.getElementById("searchbtn").disabled = false;
  document.getElementById("arrayInput").disabled = false;
  document.getElementById("value").disabled = false;
}
