let inputarray=[];

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
  function enter(){
    let input = document.getElementById('arrayInput').value.trim();
    if(input==''){
      alertfun('Enter Element...');
      document.getElementById('arrayInput').value = '';
      document.getElementById('value').value='';
      return;
  }
 
  if (input.endsWith(',')) {
        
    alertfun('Enter value properly...');
    document.getElementById('arrayInput').value = '';
    document.getElementById('value').value='';
    return;
}
if (isNaN(input) || isFloat(input)) {
           
  alertfun('Enter only integer values.');
  document.getElementById('arrayInput').value = '';
  document.getElementById('value').value='';
  return;
}

  inputarray.push(parseInt(input));
  document.getElementById('arrayInput').value = '';
  let l = inputarray.length;
    if (l> 15 || l === 0) {
      
      alertfun('You can enter only 15 elements...');
      document.getElementById('arrayInput').value = '';
      document.getElementById('value').value = '';
      return;
    }
    if(duplicates(inputarray)){
      alertfun('Duplicates are not available');
      inputarray.pop();
      document.getElementById('arrayInput').value = '';
      document.getElementById('value').value = '';
      return;
    }
   
    const numberContainer = document.getElementById('numberContainer');
    numberContainer.innerHTML = '';
    inputarray.forEach((num, index) => {
      const div = document.createElement('div');
      div.className = 'number-box';
      div.innerText = num;
      div.id = 'box-' + index;
      numberContainer.appendChild(div);
    });
  }
async function shell() {
   
    document.getElementById("sortBtn").disabled = true;
    document.getElementById("arrayInput").disabled = true;
    let length = inputarray.length;

   let message=document.getElementById('message');
   let message1=document.getElementById('message1');
    for (let gap = Math.floor(length / 2); gap > 0; gap = Math.floor(gap / 2)) {
        message1.innerText=`gap is ${gap}`;
        for (let i = gap; i < length; i++) {
           
            let temp = inputarray[i];
            const div =document.getElementById('box-' + i);
            div.classList.add('highlight');
            await new Promise(resolve => setTimeout(resolve, 500));
            let j;
            for (j = i; j >= gap && inputarray[j - gap] > temp; j -= gap) {
              inputarray[j] = inputarray[j - gap];
              message.innerText=`${temp} is less than ${inputarray[j - gap]}`;
              await new Promise(resolve => setTimeout(resolve, 1500));
              message.innerText='';
              const div1 = document.getElementById('box-' + j);
              div1.classList.add('highlight');
              await new Promise(resolve => setTimeout(resolve, 1500));
          
              const div2 = document.getElementById('box-' + (j-gap));
              div2.classList.add('highlight');//found
              await new Promise(resolve => setTimeout(resolve, 1500));
              div1.classList.remove('highlight');
              div2.classList.remove('highlight');

              div1.classList.add('hred');
              div2.classList.add('hred');
              await new Promise(resolve => setTimeout(resolve, 1500));
              div1.innerText = inputarray[j - gap];
              div1.classList.remove('hred');
              div1.classList.add('found');
              await new Promise(resolve => setTimeout(resolve, 1500));
          
              div1.classList.remove('found');
              div2.classList.remove('hred');
          }
            inputarray[j] = temp;
            const div3 =document.getElementById('box-' + j);
            div3.classList.add('blue');
            div3.innerText=temp;
            message.innerText=`put temp (the original ${temp}) in its correct location`;
            await new Promise(resolve => setTimeout(resolve, 1500));
            div3.classList.remove('blue');
            div.classList.remove('highlight');
            message.innerText='';

        }
    }
    message.innerText='';
    message1.innerText='';
    document.getElementById("sortBtn").disabled = false;
    document.getElementById("arrayInput").disabled = false;
    
}