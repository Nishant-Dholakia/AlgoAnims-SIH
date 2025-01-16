
        let index=0;
        let count=0;
        class Node {
            constructor(value, next = null, prev = null) {
                this.value = value;
                this.next = next;
                this.prev = prev;
            }
        }

        class LinkedList {
            constructor() {
                this.head = null;
            }

            createNodeElement(node, isFirst = false, isLast = false) {
                const nodeElement = document.createElement('div');
                nodeElement.className = 'node';

                const prevPointer = document.createElement('div');
                prevPointer.className = 'node-box pointer';
                prevPointer.innerText = isFirst ? 'NULL' : '←';

                const valueBox = document.createElement('div');
                valueBox.className = 'node-box';
                valueBox.id='box-' + index;
            
                valueBox.innerText = node.value;

                const nextPointer = document.createElement('div');
                nextPointer.className = 'node-box pointer';
                nextPointer.innerText = isLast ? 'NULL' : '→';
                

                nodeElement.appendChild(prevPointer);
                nodeElement.appendChild(valueBox);
                nodeElement.appendChild(nextPointer);
            
                return nodeElement;
            }

            render() {
                const container = document.getElementById('linkedListContainer');
                container.innerHTML = '';

                let current = this.head;
                while (current) {
                    const isLastNode = current.next === null;
                    const isFirstNode = current.prev === null;
                    const nodeElement = this.createNodeElement(current, isFirstNode, isLastNode);
                    index++;
                    container.appendChild(nodeElement);
                    current = current.next;
                }
            }

        async insertAtFirst(value) {
                
                const nodes = document.getElementsByClassName('node-box');
                const newNode = new Node(value, this.head, null);
                if (this.head) {
                    this.head.prev = newNode;
                }
                this.head = newNode;
            
                this.render();
                nodes[1].style.backgroundColor='#87CEEB';
                await new Promise(resolve => setTimeout(resolve, 2000));
                nodes[1].style.backgroundColor='';
                count++;
            }

        async  insertAtLast(value) {
                const nodes = document.getElementsByClassName('node-box');
                
                let i=1;
                const newNode = new Node(value);
                if (this.head) {
                
                    let current = this.head;
                    while (current.next) {
                        nodes[i].style.backgroundColor='#87CEEB';
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        nodes[i].style.backgroundColor='';
                        i+=3;
                        current = current.next;
                    }
                    current.next = newNode;
                    newNode.prev = current;
                    nodes[i].style.backgroundColor='#87CEEB';
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        nodes[i].style.backgroundColor='';
                    this.render();
                } else {
                    this.render();
                    nodes[1].style.backgroundColor='#87CEEB';
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    nodes[1].style.backgroundColor='';
                    this.head = newNode;
                }
                count++;
            }

        async  insertBeforeValue(target, value) {
                const nodes = document.getElementsByClassName('node-box');
                let i=1;
                
                if (!this.head) return;

                if (this.head.value === target) {
                    this.insertAtFirst(value);
                    return;
                }
                count++;
                let current = this.head;
                while (current.next && current.next.value !== target) {
                    nodes[i].style.backgroundColor='#87CEEB';
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    nodes[i].style.backgroundColor='';
                    i+=3;
                    current = current.next;
                }

                if (current.next) {
                    nodes[i].style.backgroundColor='#87CEEB';
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    nodes[i].style.backgroundColor='';
                    const newNode = new Node(value, current.next, current);
                    current.next.prev = newNode;
                    current.next = newNode;
                    this.render();
                }
            }

        async  insertAfterValue(target, value) {
                const nodes = document.getElementsByClassName('node-box');
                count++;
                let current = this.head;
                let i=1;
                while (current && current.value !== target) {
                    nodes[i].style.backgroundColor='#87CEEB';
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    nodes[i].style.backgroundColor='';
                    i+=3;

                    current = current.next;
                }

                if (current) {
                    nodes[i].style.backgroundColor='#87CEEB';
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    nodes[i].style.backgroundColor='';
                    const newNode = new Node(value, current.next, current);
                    if (current.next) {
                        current.next.prev = newNode;
                    }
                    current.next = newNode;
                    this.render();
                }
            }
        }

        const linkedList = new LinkedList();

        function getValueInput() {
            const valueInput = document.getElementById('valueInput');
            const value = parseInt(valueInput.value);
            valueInput.value = ''; 
            return isNaN(value) ? null : value;
        }

        function getTargetValueInput() {
            const targetInput = document.getElementById('targetValueInput');
            const targetValue = parseInt(targetInput.value);
            targetInput.value = ''; 
            return isNaN(targetValue) ? null : targetValue;
        }

        function insertAtFirst() {
            
            const value = getValueInput();
            if (value !== null) linkedList.insertAtFirst(value);
        }

        function insertAtLast() {
        
            const value = getValueInput();
            if (value !== null) linkedList.insertAtLast(value);
        }

        function insertBeforeValue() {
        
            const target = getTargetValueInput();
            const value = getValueInput();
            if (target !== null && value !== null) linkedList.insertBeforeValue(target, value);
        }

        function insertAfterValue() {
        
            const target = getTargetValueInput();
            const value = getValueInput();
            if (target !== null && value !== null) linkedList.insertAfterValue(target, value);
        }
        async function length(){
            document.getElementById('message').innerText=`Length of LinkedList Is ${count}`;
            await new Promise(resolve => setTimeout(resolve, 2000));
            document.getElementById('message').innerHTML = ``;
        }
        async function findelement(){
            let e=parseInt(document.getElementById('element').value);
            let temp=linkedList.head;
            let i=0,j=1;
            const nodes=document.getElementsByClassName('node-box');
            while(temp){
            
                if(temp.value===e){
                
                    nodes[i+1].style.backgroundColor = '#32CD32';
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    document.getElementById('message1').innerHTML=`${e} is present in List `;
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    document.getElementById('message1').innerHTML = ``;
                    nodes[i+1].style.backgroundColor = '';
                    return ;
                }
                nodes[i+1].style.backgroundColor = '#FFA07A';
                await new Promise(resolve => setTimeout(resolve, 2000));
                nodes[i+1].style.backgroundColor = '';
                temp=temp.next;
                i+=3;
                j++;
            }
            document.getElementById('message1').innerHTML=`${e} is not present`;
            await new Promise(resolve => setTimeout(resolve, 2000));
            document.getElementById('message1').innerHTML = ``;
            
        }
        async  function deleteelement() {
        let i=0;
                const nodes = document.getElementsByClassName('node-box');
            const e = parseInt(document.getElementById('element1').value);
            if (isNaN(e)) return;

            let temp = linkedList.head;

            
            if (!temp) {
                document.getElementById('message1').innerHTML = `Linked list is empty.`;
                await new Promise(resolve => setTimeout(resolve, 2000));
                document.getElementById('message1').innerHTML = ``;
                return;
            }

            
            if (temp.value === e) {
                count--;
                nodes[1].style.backgroundColor='#FFA07A';
                await new Promise(resolve => setTimeout(resolve, 2000));
            nodes[1].style.backgroundColor = '';
                linkedList.head = temp.next; 
                if (linkedList.head) {
                    linkedList.head.prev = null; 
                }
            
                linkedList.render();
                document.getElementById('message1').innerHTML = `${e} deleted from the linked list.`;
                await new Promise(resolve => setTimeout(resolve, 2000));
                document.getElementById('message1').innerHTML = ``;
                return;
            }

        
            while (temp) {
                if (temp.value === e) {
                    count--;
                    if (temp.prev) {
                        temp.prev.next = temp.next;
                    }
                    if (temp.next) {
                        temp.next.prev = temp.prev;
                    }
                    nodes[i+1].style.backgroundColor='#FFA07A';
                await new Promise(resolve => setTimeout(resolve, 2000));
            nodes[i+1].style.backgroundColor = '';
                    linkedList.render();
                    document.getElementById('message1').innerHTML = `${e} deleted from the linked list.`;
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    document.getElementById('message1').innerHTML = ``;
                    return;
                }
                nodes[i+1].style.backgroundColor='#32CD32';
                await new Promise(resolve => setTimeout(resolve, 2000));
            nodes[i+1].style.backgroundColor = '';
                temp = temp.next;
                i+=3;
            }

        
            document.getElementById('message1').innerHTML = `${e} is not present in the linked list.`;
            await new Promise(resolve => setTimeout(resolve, 2000));
            document.getElementById('message1').innerHTML = ``;
        }

