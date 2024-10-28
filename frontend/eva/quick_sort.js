const arr = [];
        const displayArea = document.getElementById('displayArea');
        const finalSortedIndices = new Set();
        const screenSize = window.innerWidth ;
        document.getElementById('numberInput').addEventListener('keydown', function(event) {
            if (event.key === 'Enter') {
                document.getElementById('enterButton').click();
            }
        });
        
    
        function alertfun(message) {
            const modal = document.getElementById("confirmationModal");
            modal.style.display = "flex"; 
            document.getElementById('alertmessage').textContent = message;
        }

        document.getElementById('closeModal').addEventListener('click', function() {
            document.getElementById("confirmationModal").style.display = "none";
        });


        document.getElementById('enterButton').addEventListener('click', function() {
            const input = document.getElementById('numberInput');
            const number = input.value;

            if (!/^\d{1,3}$/.test(number)) {
                alertfun('Please enter a valid 1, 2, or 3-digit number.');
                return;
            }
            if (arr.includes(parseInt(number))) {
                alertfun('This number has already been entered. No duplicates allowed.');
                return;
            }

            if (arr.length >= 10) {
                alertfun('You can only enter up to 10 numbers.');
                return;
            }

            arr.push(parseInt(number));
            displayArray(arr);
            input.value = '';
        });

        function displayArray(arr, pivotIndex = -1, iIndex = -1, jIndex = -1) {
            displayArea.innerHTML = '';

            arr.forEach((number, index) => {
                const numberBoxContainer = document.createElement('div');
                numberBoxContainer.classList.add('number-box-container');

                const numberBox = document.createElement('div');
                numberBox.classList.add('number-box');
                numberBox.textContent = number;

                const indexLabel = document.createElement('div');
                indexLabel.classList.add('index-label');

                if (finalSortedIndices.has(index)) {
                    numberBox.style.backgroundColor = 'green';
                }
                if (index === pivotIndex) {
                    numberBox.style.backgroundColor = 'pink';
                    indexLabel.textContent = 'pivot';
                } else if (index === iIndex) {
                    numberBox.style.backgroundColor = 'orange';
                    indexLabel.textContent = 'i';
                } else if (index === jIndex) {
                    numberBox.style.backgroundColor = 'yellow';
                    indexLabel.textContent = 'j';
                }

                numberBoxContainer.appendChild(numberBox);
                numberBoxContainer.appendChild(indexLabel);
                displayArea.appendChild(numberBoxContainer);
            });
        }

        async function swapElements(arr, indexA, indexB) {

        const boxA = displayArea.children[indexA].querySelector('.number-box');
        const boxB = displayArea.children[indexB].querySelector('.number-box');

    

        const positionA = boxA.getBoundingClientRect();
        const positionB = boxB.getBoundingClientRect();
        const distanceX = positionB.left - positionA.left;

        gsap.to(boxA, { x: distanceX, duration: 0.5 });
        gsap.to(boxB, { x: -distanceX, duration: 0.5 });

        await new Promise(resolve => setTimeout(resolve, 1000));
        [arr[indexA], arr[indexB]] = [arr[indexB], arr[indexA]];

        displayArray(arr);
        
      }
        
        async function partition(arr, low, high) {
            const pivot = arr[low];
            const boxes = document.querySelectorAll('.number-box');

            for (let temp = low; temp <= high; temp++) {
                boxes[temp].style.border = '3px solid black';
            }

            await new Promise(resolve => setTimeout(resolve, 1000));
            displayArray(arr, low);
            await new Promise(resolve => setTimeout(resolve, 2000));

            let i = low;
            let j = high;

            while (i < j) {
                while (i <= high - 1 && arr[i] <= pivot) {
                    if(i==low)
                    {
                        displayArray(arr, low, i+1, j);
                    }
                    else
                    {
                        displayArray(arr, low, i, j);
                    }
                
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    i++;
                }

                while (j >= low + 1 && arr[j] > pivot) {
                    displayArray(arr, low, i, j);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    j--;
                }

                if (i < j) {

                    if((screenSize<=320 && arr.length >4) || (screenSize>320 && screenSize<375 && arr.length >5) || (screenSize>375 && screenSize<426 && arr.length >6))
                    {
                        displayArray(arr, low, i, j);
                        await new Promise(resolve => setTimeout(resolve, 1000)); 
                            [arr[i], arr[j]] = [arr[j], arr[i]];
                            displayArray(arr, low, i, j); 
                            await new Promise(resolve => setTimeout(resolve, 1000)); 
                    }
                    else{
                        displayArray(arr, low, i, j);
                    await new Promise(resolve => setTimeout(resolve, 1000));
                    await swapElements(arr, i, j);
                    }
                    
                }
            }

            displayArray(arr, low, i, j);
            await new Promise(resolve => setTimeout(resolve, 1000));


            if((screenSize<=320 && arr.length >4) || (screenSize>320 && screenSize<375 && arr.length >5) || (screenSize>375 && screenSize<426 && arr.length >6))
            {
                displayArray(arr, low, i, j);
                await new Promise(resolve => setTimeout(resolve, 1000)); 
                [arr[low], arr[j]] = [arr[j], arr[low]];
                await new Promise(resolve => setTimeout(resolve, 1000)); 
            }
            
            else{
                await swapElements(arr, low, j);
            }
        
            finalSortedIndices.add(j);

            displayArray(arr, j);
            await new Promise(resolve => setTimeout(resolve, 1000));

            for (let temp = low; temp <= high; temp++) {
                boxes[temp].style.border = '';
            }

            return j;
        }


        async function quickSort(arr, low, high) {
            if (low <= high) {
                const pi = await partition(arr, low, high);
                await quickSort(arr, low, pi - 1);
                await quickSort(arr, pi + 1, high);
            }

            if (low === 0 && high === arr.length - 1) {
                arr.forEach((_, idx) => finalSortedIndices.add(idx));
                displayArray(arr);
            }
        }

        document.getElementById('sortButton').addEventListener('click', function() {
            document.getElementById('sortButton').disabled=true;
            document.getElementById('enterButton').disabled=true;
            quickSort(arr, 0, arr.length - 1);
        });
