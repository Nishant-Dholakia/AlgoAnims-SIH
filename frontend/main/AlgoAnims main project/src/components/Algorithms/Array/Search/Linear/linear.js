export function linearSerach() {
    let inputArray = [];
    function isFloat(num) {
        return num % 1 !== 0;
    }
    function duplicates(array) {
        return new Set(array).size !== array.length;
    }
    document.getElementById('closeModal').addEventListener('click', () => {
        const modal = document.getElementById("confirmationModal");
        modal.style.display = "none";
    });

    function alertfun(a) {
        const modal = document.getElementById("confirmationModal");
        modal.style.display = "flex";
        let p = document.getElementById('alertmessage');
        p.innerHTML = a;
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

    document.querySelector("#enterbtn").addEventListener("click" , enter)

    async function linear() {
        document.getElementById('message').innerText = '';
        const numval = document.getElementById('value').value;

        if (isNaN(parseInt(numval)) || isFloat(numval)) {
            alertfun('Enter a valid integer value to search...');

            document.getElementById('arrayInput').value = '';
            document.getElementById('value').value = '';
            return;
        }
        const num = parseInt(document.getElementById('value').value);

        document.getElementById("searchbtn").disabled = true;
        document.getElementById("arrayInput").disabled = true;
        document.getElementById("value").disabled = true;
        let found = false;
        for (i = 0; i < inputArray.length; i++) {
            const box = document.getElementById('box-' + i);
            box.classList.add('highlight');
            await new Promise(resolve => setTimeout(resolve, 1000));
            if (inputArray[i] === num) {
                box.classList.add('found');
                document.getElementById('message').innerText = `Number ${num} found at index ${i}.`; // Show message
                found = true;
                break;
            }
            else {
                box.classList.remove('highlight');
                box.classList.add('hred');
                await new Promise(resolve => setTimeout(resolve, 1000));
                box.classList.remove('hred');
            }
        }


        if (!found) {
            document.getElementById('message').innerText = `Number ${num} Not found `;
        }

        await new Promise(resolve => setTimeout(resolve, 1000));
        document.getElementById("searchbtn").disabled = false;
        document.getElementById("arrayInput").disabled = false;
        document.getElementById("value").disabled = false;
    }

    document.querySelector("#searchbtn").addEventListener("click",linear)


}