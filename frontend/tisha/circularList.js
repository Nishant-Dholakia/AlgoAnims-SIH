        let count=0;
        class Node {
            constructor(value, next = null) {
                this.value = value;
                this.next = next;
            }
        }

        class LinkedList {
            constructor() {
                this.head = null;
            }

            createNodeElement(node, isLast = false) {
                const nodeElement = document.createElement('div');
                nodeElement.className = 'node';

                const valueBox = document.createElement('div');
                valueBox.className = 'node-box';
                valueBox.innerText = node.value;

                const pointerBox = document.createElement('div');
                pointerBox.className = 'node-box pointer';
                pointerBox.innerText = isLast ? 'HEAD' : '→';

                nodeElement.appendChild(valueBox);
                nodeElement.appendChild(pointerBox);
                return nodeElement;
            }

            render() {
                const container = document.getElementById('linkedListContainer');
                container.innerHTML = '';

                if (!this.head) return; 

                let current = this.head;
                do {
                    const isLastNode = current.next === this.head;
                    const nodeElement = this.createNodeElement(current, isLastNode);
                    container.appendChild(nodeElement);
                    current = current.next;
                } while (current !== this.head);
            }

        async  insertAtFirst(value) {
                count++;
                const nodes = document.getElementsByClassName('node-box');
                const newNode = new Node(value);
            let i=0;
                if (!this.head) {
                    newNode.next = newNode;
                    this.head = newNode;
                    this.render();
                    nodes[0].style.backgroundColor='#90CAF9';
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    nodes[0].style.backgroundColor='';
                } else {
                    let current = this.head;
                    while (current.next !== this.head) {
                        current = current.next;
                        nodes[i].style.backgroundColor='#87CEEB';
                await new Promise(resolve => setTimeout(resolve, 2000));
                nodes[i].style.backgroundColor='';
                i+=2;
                    }
                    nodes[i].style.backgroundColor='#87CEEB';
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    nodes[i].style.backgroundColor='';
                    newNode.next = this.head;
                    current.next = newNode;
                    this.head = newNode;
                    this.render();
                }
            }

        async  insertAtLast(value) {
                count++;
                const nodes = document.getElementsByClassName('node-box');
                let i=0;
                const newNode = new Node(value);

                if (!this.head) {
                    newNode.next = newNode;
                    this.head = newNode;
                    this.render();
                    nodes[0].style.backgroundColor='#87CEEB';
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    nodes[0].style.backgroundColor='';
                } else {

                    let current = this.head;
                    while (current.next !== this.head) {
                        current = current.next;
                        nodes[i].style.backgroundColor='#87CEEB';
                        await new Promise(resolve => setTimeout(resolve, 2000));
                        nodes[i].style.backgroundColor='';
                        i+=2;
                    }
                    nodes[i].style.backgroundColor='#87CEEB';
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    nodes[i].style.backgroundColor='';
                    current.next = newNode;
                    newNode.next = this.head;


                    this.render();
                }

            
            }

        async   insertBeforeValue(target, value) {
            
                const nodes = document.getElementsByClassName('node-box');
                let i=0;
                if (!this.head) return;
                
                if (this.head.value === target) {
                    this.insertAtFirst(value);
                    nodes[0].style.backgroundColor='#87CEEB';
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    nodes[0].style.backgroundColor='';
                    return;
                }
                count++;
                let current = this.head;
                let prev = null;

                do {
                    nodes[i].style.backgroundColor='#87CEEB';
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    nodes[i].style.backgroundColor='';
                    if (current.value === target) {

                        const newNode = new Node(value, current);
                        prev.next = newNode;
                        
                        this.render();
                    
                        return;
                    }
                
                    i+=2;
                    prev = current;
                    current = current.next;
                } while (current !== this.head);
            }

        async  insertAfterValue(target, value) {
                
                const nodes = document.getElementsByClassName('node-box');
                let i=0;
                if (!this.head) return;
                count++;
                let current = this.head;

                do {
                    nodes[i].style.backgroundColor='#87CEEB';
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    nodes[i].style.backgroundColor='';
                    if (current.value === target) {
                        const newNode = new Node(value, current.next);
                        current.next = newNode;
                        this.render();
                        return;
                    }
                    current = current.next;
                    i+=2;
                } while (current !== this.head);
            }
        async deleteLastNode() {
                let i=0;
                const nodes = document.getElementsByClassName('node-box');
                if (!this.head) return;

                let current = this.head;
            
                if (current.next === this.head) {
                    nodes[0].style.backgroundColor='#FFA07A';
                    await new Promise(resolve => setTimeout(resolve, 2000));
                nodes[0].style.backgroundColor = '';
                    this.head = null;
                    this.render();
                    document.getElementById('message').innerText=`Last Node is deleted.`;
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    document.getElementById('message').innerText=``;
                    count--;
                    return;
                }
                else{
                let prev = null;
                while (current.next !== this.head) {
                    nodes[i].style.backgroundColor='#FFA07A';
                    await new Promise(resolve => setTimeout(resolve, 2000));
                nodes[i].style.backgroundColor = '';
                    prev = current;
                    current = current.next;
                    i+=2;
                }
                nodes[i].style.backgroundColor='#32CD32';
                await new Promise(resolve => setTimeout(resolve, 2000));
            nodes[i].style.backgroundColor = '';
                prev.next = this.head;
                
                
                this.render();
                document.getElementById('message').innerText=`Last Node is deleted.`;
                await new Promise(resolve => setTimeout(resolve, 2000));
                    document.getElementById('message').innerText=``;
                    count--;
                return ;}
                
            }
        async deleteFirstNode(){
            
                if (!this.head) return;

                let current = this.head;
                
                if (current.next === this.head) {
                
                    this.head = null;
                    this.render();
                    document.getElementById('message').innerText=`First Node is deleted.`;
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    document.getElementById('message').innerText=``;
                    count--;
                    return;
                }
                else{
                while(current.next!=this.head){
                    
                current=current.next;
                
                }
            
                current.next = this.head.next;
                this.head = this.head.next;


                this.render();
                document.getElementById('message').innerText=`First Node is deleted.`;
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    document.getElementById('message').innerText=``;
                    count--;
                    return;
            }}
            
            
        }

        const linkedList = new LinkedList();

        function deleteLastNode() {
            linkedList.deleteLastNode();
        }
        function deleteFirstNode() {
            linkedList.deleteFirstNode();
        }
        async   function cirlength() {
            document.getElementById('message').innerText=`Length of LinkedList Is ${count}`;
            await new Promise(resolve => setTimeout(resolve, 2000));
                    document.getElementById('message').innerHTML = ``;
        }
        async function cirfind() {
            const e = parseInt(document.getElementById('element').value);
            const nodes = document.getElementsByClassName('node-box');
            let temp = linkedList.head;
            let index = 0;

            if (!temp) {
                document.getElementById('message').innerText = "The list is empty.";
                await new Promise(resolve => setTimeout(resolve, 2000));
                document.getElementById('message').innerHTML = ``;
                return;
            }

            do {
                if (temp.value === e) {
                    nodes[index].style.backgroundColor = '#32CD32';
                    document.getElementById('message').innerHTML = `${e} is present in List`;
                    await new Promise(resolve => setTimeout(resolve, 2000));
                    document.getElementById('message').innerHTML = ``;
                    nodes[index].style.backgroundColor = ''; 
                    return;
                }
                nodes[index].style.backgroundColor = '#FFA07A';
                await new Promise(resolve => setTimeout(resolve, 2000));
                nodes[index].style.backgroundColor = '';
                temp = temp.next;
                index+=2;
                await new Promise(resolve => setTimeout(resolve, 1000));
            } while (temp !== linkedList.head);

            
            document.getElementById('message').innerHTML = `${e} is not present in the list.`;
            await new Promise(resolve => setTimeout(resolve, 2000));
            document.getElementById('message').innerHTML = ``;
        }

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