let inputarray = [];
let f = false;
let count = 0;
let mcall = 0;

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
    if (input == '') {
        alertfun('Enter Element...');
        document.getElementById('arrayInput').value = '';
        document.getElementById('value').value = '';
        return;
    }
    if (input.endsWith(',')) {
        alertfun('Enter value properly...');
        document.getElementById('arrayInput').value = '';
        document.getElementById('value').value = '';
        return;
    }
    if (isNaN(input) || isFloat(input)) {
        alertfun('Enter only integer values.');
        document.getElementById('arrayInput').value = '';
        document.getElementById('value').value = '';
        return;
    }
    
    inputarray.push(parseInt(input));
    document.getElementById('arrayInput').value = '';
    let l = inputarray.length;
    if (l > 15 || l === 0) {
        alertfun('You can enter only 15 elements...');
        document.getElementById('arrayInput').value = '';
        document.getElementById('value').value = '';
        return;
    }
    if (duplicates(inputarray)) {
        alertfun('Duplicates are not allowed.');
        inputarray.pop();
        document.getElementById('arrayInput').value = '';
        document.getElementById('value').value = '';
        return;
    }

    const initialArray = document.getElementById('initialArray');
    initialArray.innerHTML = '';
    const firstRow = document.createElement('div');
    firstRow.className = 'container';
    inputarray.forEach((val, index) => {
        const div = document.createElement('div');
        div.className = 'number-box';
        div.id = 'box-' + index;
        div.innerText = val;
        firstRow.appendChild(div);
    });
    initialArray.appendChild(firstRow);
}

async function mergesort() {
    const initialArray2 = document.getElementById('initialArray2');
    const LeftContainer = document.getElementById('LeftContainer');
    const RightContainer = document.getElementById('RightContainer');
    const sortedArrayContainer = document.getElementById('sortedArrayContainer');
    
    initialArray2.innerHTML = '';
    LeftContainer.innerHTML = '';
    RightContainer.innerHTML = '';
    sortedArrayContainer.innerHTML = '';

    document.getElementById("sortBtn").disabled = true;
    document.getElementById("arrayInput").disabled = true;

    let left = 0, right = inputarray.length - 1;
    let v = Math.floor(left + (right - left) / 2);
    let x = inputarray[v + 1];

    await merge(left, right);

    async function merge(left, right) {
        if (left < right) {
            let mid = Math.floor(left + (right - left) / 2);

            const leftRow = document.createElement('div');
            leftRow.className = 'container';

            for (let i = left; i <= mid; i++) {
                const box = document.getElementById('box-' + i);
                if (box.innerText == x) {
                    f = true;
                }
                const clonedBox = box.cloneNode(true);
                clonedBox.classList.add('highlight');
                leftRow.appendChild(clonedBox);
            }

            const separator = document.createElement('div');
            separator.className = 'separator';
            separator.style.marginLeft = '2px';
            leftRow.appendChild(separator);

            for (let i = mid + 1; i <= right; i++) {
                const box = document.getElementById('box-' + i);
                const clonedBox = box.cloneNode(true);
                clonedBox.classList.add('found');
                leftRow.appendChild(clonedBox);
            }

            await new Promise(resolve => setTimeout(resolve, 2500));

            if (count === 0 && f === false) {
                initialArray2.appendChild(leftRow);
                count++;
            } else if (f === true) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                RightContainer.appendChild(leftRow);
            } else {
                LeftContainer.appendChild(leftRow);
            }

            await merge(left, mid);
            await merge(mid + 1, right);
            
            await funmerge(left, mid, right);
        }
    }

    async function funmerge(left, mid, right) {
        mcall++;
        let n1 = mid - left + 1;
        let n2 = right - mid;
        let L = [], R = [];

        const mergedRow = document.createElement('div');
        mergedRow.className = 'container';

        for (let i = 0; i < n1; i++) {
            L.push(inputarray[i + left]);
        }

        for (let i = 0; i < n2; i++) {
            R.push(inputarray[mid + i + 1]);
        }

        let k = left, i = 0, j = 0;
        while (i < n1 && j < n2) {
            if (L[i] < R[j]) {
                inputarray[k] = L[i];
                i++;
            } else {
                inputarray[k] = R[j];
                j++;
            }

            const box = document.createElement('div');
            box.className = 'number-box hred';
            box.innerText = inputarray[k];
            mergedRow.appendChild(box);

            k++;
        }

        while (i < n1) {
            inputarray[k] = L[i];
            const box = document.createElement('div');
            box.className = 'number-box hred';
            box.innerText = inputarray[k];
            mergedRow.appendChild(box);

            i++;
            k++;
        }

        while (j < n2) {
            inputarray[k] = R[j];
            const box = document.createElement('div');
            box.className = 'number-box hred';
            box.innerText = inputarray[k];
            mergedRow.appendChild(box);

            j++;
            k++;
        }

        await new Promise(resolve => setTimeout(resolve, 2500));

        if (mcall === inputarray.length - 1) {
            gsap.from(mergedRow, {
                opacity: 0,
                delay: 1,
                duration: 1,
                y: -60,
            });
            sortedArrayContainer.appendChild(mergedRow);
        } else if (f === true) {
            RightContainer.appendChild(mergedRow);
            gsap.from(mergedRow, {
                opacity: 0,
                delay: 1,
                duration: 1,
                y: -60,
            });
        } else {
            LeftContainer.appendChild(mergedRow);
            gsap.from(mergedRow, {
                opacity: 0,
                delay: 1,
                duration: 1,
                y: -60,
            });
        }
    }
    
    document.getElementById("sortBtn").disabled = false;
    document.getElementById("arrayInput").disabled = false;
}
