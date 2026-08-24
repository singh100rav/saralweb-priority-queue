const PriorityQueue = require("./module");

const queue = new PriorityQueue();

console.log("=== Priority Queue Test ===");

console.log("1. Empty:", queue.is_empty());

queue.insert("Task A", 5);
queue.insert("Task B", 2);
queue.insert("Task C", 8);
queue.insert("Task D", 10);

console.log("2. After Insert:", queue.items);

console.log("3. Peek:", queue.peek());

console.log("4. Extract Min:", queue.extract_min());
console.log("5. After Extract Min:", queue.items);

console.log("6. Extract Max:", queue.extract_max());
console.log("7. After Extract Max:", queue.items);

console.log("8. Update ID 1:", queue.update(1, 1));
console.log("9. After Update:", queue.items);

console.log("10. Delete ID 3:", queue.delete(3));
console.log("11. After Delete:", queue.items);

console.log("12. Empty:", queue.is_empty());

console.log("\n=== Edge Cases ===");

const emptyQueue = new PriorityQueue();

// Remove any persisted test items for the edge-case check.
emptyQueue.items = [];

console.log("13. Peek Empty:", emptyQueue.peek());
console.log("14. Extract Min Empty:", emptyQueue.extract_min());
console.log("15. Extract Max Empty:", emptyQueue.extract_max());
console.log("16. Update Invalid ID:", emptyQueue.update(999, 10));
console.log("17. Delete Invalid ID:", emptyQueue.delete(999));
console.log("18. Is Empty:", emptyQueue.is_empty());