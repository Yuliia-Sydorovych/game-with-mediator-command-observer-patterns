export class EventSystem {
    constructor() {
        this.eventQueue = [];
        this.commandQueue = [];
    }
    enqueueEvent(event) {
        this.eventQueue.push(event);
    }
    enqueueCommand(command) {
        this.commandQueue.push(command);
    }
    processEvents() {
        while (this.eventQueue.length > 0) {
            const event = this.eventQueue.shift();
            if (event) {
                event.execute();
            }
        }
    }
    processCommands() {
        while (this.commandQueue.length > 0) {
            const command = this.commandQueue.shift();
            if (command) {
                command.execute();
            }
        }
    }
}
