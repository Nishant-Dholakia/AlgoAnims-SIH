

function useDoublyLinkedList(){
    class Node {
        constructor(data) {
          this.data = data;
          this.next = null;
          this.prev = null;
        }
      }
      
      class DoublyLinkedList {
        constructor() {
          this.head = null;
          this.tail = null;
          this.size = 0;
        }
      
        // Add node at the end
        append(data) {
          let newNode = new Node(data);
      
          if (!this.head) {
            this.head = this.tail = newNode;
          } else {
            newNode.prev = this.tail;
            this.tail.next = newNode;
            this.tail = newNode;
          }
          this.size++;
        }
      
        // Add node at the beginning
        prepend(data) {
          let newNode = new Node(data);
      
          if (!this.head) {
            this.head = this.tail = newNode;
          } else {
            newNode.next = this.head;
            this.head.prev = newNode;
            this.head = newNode;
          }
          this.size++;
        }
      
        // Remove node from the end
        removeLast() {
          if (!this.tail) return null;
          let removedData = this.tail.data;
      
          if (this.head === this.tail) {
            this.head = this.tail = null;
          } else {
            this.tail = this.tail.prev;
            this.tail.next = null;
          }
          this.size--;
          return removedData;
        }
      
        // Remove node from the beginning
        removeFirst() {
          if (!this.head) return null;
          let removedData = this.head.data;
      
          if (this.head === this.tail) {
            this.head = this.tail = null;
          } else {
            this.head = this.head.next;
            this.head.prev = null;
          }
          this.size--;
          return removedData;
        }
      
        // Print the list from head to tail
        printForward() {
          let current = this.head;
          let result = [];
          while (current) {
            result.push(current.data);
            current = current.next;
          }
          console.log("Forward: ", result.join(' -> '));
        }
      
        // Print the list from tail to head
        printBackward() {
          let current = this.tail;
          let result = [];
          while (current) {
            result.push(current.data);
            current = current.prev;
          }
          console.log("Backward: ", result.join(' -> '));
        }
      
        // Get the size of the list
        getSize() {
          return this.size;
        }
      }
}

export default useDoublyLinkedList
  
//   // Example Usage
//   let dll = new DoublyLinkedList();
//   dll.append(10);
//   dll.append(20);
//   dll.append(30);
//   dll.prepend(5);
  
//   dll.printForward();  // Output: Forward:  5 -> 10 -> 20 -> 30
//   dll.printBackward(); // Output: Backward:  30 -> 20 -> 10 -> 5
  
//   console.log("Removed last: ", dll.removeLast());   // Output: Removed last: 30
//   console.log("Removed first: ", dll.removeFirst()); // Output: Removed first: 5
  
//   dll.printForward();  // Output: Forward:  10 -> 20
//   console.log("Size: ", dll.getSize());  // Output: Size: 2
