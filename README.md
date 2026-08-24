# Persistent Priority Queue

A persistent priority queue implementation in JavaScript using a binary min-heap and file-based storage.

## Features

The module supports the following operations:

- `insert`
- `extract_min`
- `extract_max`
- `peek`
- `update`
- `delete`
- `is_empty`

The queue state is persisted in a JSON file, so the data remains available after restarting the Node.js application.

## Implementation

The priority queue uses an array-based binary min-heap.

Each queue item contains:

- `id` - unique identifier of the item
- `value` - value stored in the queue
- `priority` - priority of the item

The item with the smallest priority is kept at the root of the min-heap.

When an item is inserted, `heapifyUp()` restores the heap property.

When an item is removed or its priority changes, `heapifyDown()` or `heapifyUp()` is used when required.

## Persistence

The queue state is stored in:

```text
data/queue.json
```

The `save()` method writes the current queue state to the JSON file.

The `load()` method reads the saved queue when a `PriorityQueue` instance is created.

The next available item ID is stored along with the queue so that IDs remain unique after restarting the application.

## Supported Operations

### insert(value, priority)

Adds a new item to the priority queue.

```js
queue.insert("Task A", 5);
```

### extract_min()

Removes and returns the item with the smallest priority.

```js
queue.extract_min();
```

### extract_max()

Removes and returns the item with the largest priority.

```js
queue.extract_max();
```

### peek()

Returns the item with the smallest priority without removing it.

```js
queue.peek();
```

### update(id, newPriority)

Updates the priority of an existing item.

```js
queue.update(1, 2);
```

### delete(id)

Removes an item using its ID.

```js
queue.delete(1);
```

### is_empty()

Returns `true` when the queue is empty and `false` otherwise.

```js
queue.is_empty();
```

## Time Complexity

| Operation | Time Complexity |
|---|---|
| `insert` | O(log n) |
| `extract_min` | O(log n) |
| `extract_max` | O(n) |
| `peek` | O(1) |
| `update` | O(n) |
| `delete` | O(n) |
| `is_empty` | O(1) |

`extract_max()` searches the heap to find the item with the largest priority.

`update()` and `delete()` search for an item by its ID before modifying the heap.

## Requirements

- Node.js 18 or later
- No external npm packages are required

## Project Structure

```text
saralweb-priority-queue/
│
├── data/
│   └── queue.json
│
├── module.js
├── test.js
├── package.json
└── README.md
```

## Running the Project

Open a terminal in the project directory and run:

```bash
node test.js
```

The test file demonstrates the supported priority queue operations and edge cases.

## Real-World Use Cases

### Task Scheduling

Tasks can be assigned priorities so that important tasks are processed first.

### Job Scheduling

Background jobs can be ordered according to their priority.

### Network Request Processing

Network requests can be processed based on their priority or urgency.

### Event Processing

Time-sensitive events can be processed before lower-priority events.

### Customer Support

Support requests can be prioritized based on their urgency or severity.

## Example

```js
const PriorityQueue = require("./module");

const queue = new PriorityQueue();

queue.insert("Task A", 5);
queue.insert("Task B", 2);
queue.insert("Task C", 8);

console.log(queue.peek());

console.log(queue.extract_min());

console.log(queue.extract_max());
```

## Notes

This implementation uses a binary min-heap for the priority queue and JSON file storage for persistence.

The main implementation is provided in `module.js`.