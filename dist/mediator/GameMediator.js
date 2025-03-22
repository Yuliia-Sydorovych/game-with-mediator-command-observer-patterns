import { BetCommand } from "../command/BetCommand.js";
import { SpinCommand } from "../command/SpinCommand.js";
export class GameMediator {
    constructor(slotMachine, player, eventSystem, uiController) {
        this.actions = {
            spin: (value) => {
                const spinCommand = new SpinCommand(this.slotMachine, this.player, this.uiController, value);
                this.eventSystem.enqueueCommand(spinCommand);
            },
            bet: (value) => {
                const betCommand = new BetCommand(this.player, this.uiController, value);
                this.eventSystem.enqueueCommand(betCommand);
            },
            funds: (value) => this.player.updateBalance(value),
        };
        this.slotMachine = slotMachine;
        this.player = player;
        this.eventSystem = eventSystem;
        this.uiController = uiController;
        this.uiController.bindMediator(this);
    }
    notify(_sender, event, value) {
        if (this.actions[event]) {
            this.actions[event](value);
        }
    }
    process() {
        this.eventSystem.processCommands();
        this.eventSystem.processEvents();
    }
}
