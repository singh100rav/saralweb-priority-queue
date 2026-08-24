const fs = require("fs");
const path = require("path");

class PriorityQueue {
    constructor() {
    this.items = [];
    this.nextId = 1;
    this.filePath = path.join(__dirname, "data", "queue.json");
     
    this.load();
}

    insert(value, priority) {
        const item = {
            id: this.nextId++,
            value: value,
            priority: priority
        };

        this.items.push(item);

        this.heapifyUp(this.items.length - 1);
        this.save();
    }

    heapifyUp(index) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);

            if (this.items[index].priority >= this.items[parentIndex].priority) {
                break;
            }

            [this.items[index], this.items[parentIndex]] =
            [this.items[parentIndex], this.items[index]];

            index = parentIndex;
        }
    }

      peek() {
        if (this.items.length === 0) {
            return null;
        }
        return this.items[0];
    }

    extract_min() {
    if (this.items.length === 0) {
        return null;
    }

    const minItem = this.items[0];

    const lastItem = this.items.pop();

    if (this.items.length > 0) {
        this.items[0] = lastItem;
        this.heapifyDown(0);
    }

    this.save();
    return minItem;
}
extract_max() {
    if (this.items.length === 0) {
        return null;
    }

    let maxIndex = 0;

    for (let i = 1; i < this.items.length; i++) {
        if (this.items[i].priority > this.items[maxIndex].priority) {
            maxIndex = i;
        }
    }

    const maxItem = this.items[maxIndex];
    const lastItem = this.items.pop();

    if (maxIndex < this.items.length) {
        this.items[maxIndex] = lastItem;

        const parentIndex = Math.floor((maxIndex - 1) / 2);

        if (
            maxIndex > 0 &&
            this.items[maxIndex].priority < this.items[parentIndex].priority
        ) {
            this.heapifyUp(maxIndex);
        } else {
            this.heapifyDown(maxIndex);
        }
    }
    this.save();
    return maxItem;
}

update(id, newPriority) {
    const index = this.items.findIndex(item => item.id === id);

    if (index === -1) {
        return false;
    }

    const oldPriority = this.items[index].priority;

    this.items[index].priority = newPriority;

    if (newPriority < oldPriority) {
        this.heapifyUp(index);
    } else if (newPriority > oldPriority) {
        this.heapifyDown(index);
    }
    this.save();
    return true;
}

delete(id) {
    const index = this.items.findIndex(item => item.id === id);

    if (index === -1) {
        return null;
    }

    const deletedItem = this.items[index];
    const lastItem = this.items.pop();

    if (index < this.items.length) {
        this.items[index] = lastItem;

        const parentIndex = Math.floor((index - 1) / 2);

        if (
            index > 0 &&
            this.items[index].priority < this.items[parentIndex].priority
        ) {
            this.heapifyUp(index);
        } else {
            this.heapifyDown(index);
        }
    }
    this.save();
    return deletedItem;
}

heapifyDown(index) {
    const length = this.items.length;

    while (true) {
        let smallest = index;

        const left = 2 * index + 1;
        const right = 2 * index + 2;

        if (
            left < length &&
            this.items[left].priority < this.items[smallest].priority
        ) {
            smallest = left;
        }

        if (
            right < length &&
            this.items[right].priority < this.items[smallest].priority
        ) {
            smallest = right;
        }

        if (smallest === index) {
            break;
        }

        [this.items[index], this.items[smallest]] =
        [this.items[smallest], this.items[index]];

        index = smallest;
    }
}

is_empty() {
    return this.items.length === 0;
}

save() {
    const dataDirectory = path.join(__dirname, "data");

    if (!fs.existsSync(dataDirectory)) {
        fs.mkdirSync(dataDirectory, { recursive: true });
    }

    fs.writeFileSync(
        this.filePath,
        JSON.stringify({
            items: this.items,
            nextId: this.nextId
        }, null, 2)
    );
}

load() {
    if (!fs.existsSync(this.filePath)) {
        return;
    }

    const data = fs.readFileSync(this.filePath, "utf8");

    const savedData = JSON.parse(data);

    this.items = savedData.items;
    this.nextId = savedData.nextId;
}

}

module.exports = PriorityQueue;