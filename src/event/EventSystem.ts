import { Event } from "./IEvent";

export class EventSystem
{
    private eventQueue: Event[] = [];
    private commandQueue: Event[] = [];

    enqueueEvent(event: Event)
    {
        this.eventQueue.push(event);
    }

    enqueueCommand(command: Event)
    {
        this.commandQueue.push(command);
    }

    processEvents()
    {
        while (this.eventQueue.length > 0)
        {
            const event = this.eventQueue.shift();
            if (event)
            {
                event.execute();
            }
        }
    }

    processCommands()
    {
        while (this.commandQueue.length > 0)
        {
            const command = this.commandQueue.shift();
            if (command)
            {
                command.execute();
            }
        }
    }
}
