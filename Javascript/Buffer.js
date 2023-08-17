export class Buffer {
    constructor() {
        this.processes = [];
        this.frontIndex = 0;
        this.backIndex = 0;
    }
    enqueue(process) {
        this.processes[this.backIndex] = process;
        this.backIndex++;
        return process + ' inserted'
    }
    dequeue() {
        const item = this.processes[this.frontIndex]
        delete this.processes[this.frontIndex]
        this.frontIndex++
        return item.name;
    }
    peek() {
        alert('here')
        return this.processes[this.frontIndex]
    }
    get printQueue() {
        return this.processes;
    }
}