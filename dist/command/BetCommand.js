export class BetCommand {
    constructor(player, uiController, betAmount) {
        this.player = player;
        this.uiController = uiController;
        this.betAmount = betAmount;
        this.type = "bet";
    }
    execute() {
        if (this.player.checkBet(this.betAmount)) {
            this.uiController.updateGameResult(`Bet of $${this.betAmount} placed successfully.`);
        }
        else {
            this.uiController.updateGameResult("Insufficient funds to place the bet.");
        }
    }
}
