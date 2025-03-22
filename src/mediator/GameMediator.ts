import { BetCommand } from "../command/BetCommand";
import { SpinCommand } from "../command/SpinCommand";
import { EventSystem } from "../event/EventSystem";
import { Player } from "../observer/Player";
import { SlotMachine } from "../reels/SlotMachine";
import { UIController } from "../ui/UIController";

export class GameMediator
{
    private slotMachine: SlotMachine;
    private player: Player;
    private eventSystem: EventSystem;
    private uiController: UIController;

    private actions: { [key: string]: (value: number) => void } =
    {
        spin: (value) =>
        {
            const spinCommand = new SpinCommand(this.slotMachine, this.player, this.uiController, value);
            this.eventSystem.enqueueCommand(spinCommand);
        },
        bet: (value) =>
        {
            const betCommand = new BetCommand(this.player, this.uiController, value);
            this.eventSystem.enqueueCommand(betCommand);
        },
        funds: (value) => this.player.updateBalance(value),
    };

    constructor(
        slotMachine: SlotMachine,
        player: Player,
        eventSystem: EventSystem,
        uiController: UIController
    ) {
        this.slotMachine = slotMachine;
        this.player = player;
        this.eventSystem = eventSystem;
        this.uiController = uiController;

        this.uiController.bindMediator(this);
    }

    public notify(_sender: object, event: string, value: number): void
    {
        if (this.actions[event])
        {
            this.actions[event](value);
        }
    }

    public process()
    {
        this.eventSystem.processCommands();
        this.eventSystem.processEvents();
    }
}
