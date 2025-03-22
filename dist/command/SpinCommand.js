export class SpinCommand {
    constructor(slotMachine, player, uiController, betAmount) {
        this.slotMachine = slotMachine;
        this.player = player;
        this.uiController = uiController;
        this.betAmount = betAmount;
        this.type = "spin";
    }
    execute() {
        if (this.player.placeBet(this.betAmount)) {
            this.updateElementsOnSpinMode();
            this.slotMachine.spinReels();
            const spinCheckInterval = setInterval(() => {
                if (!this.slotMachine.areReelsSpinning()) {
                    clearInterval(spinCheckInterval);
                    this.updateElementsOnStopMode();
                }
            }, 100);
        }
        else {
            this.uiController.updateGameResult("Insufficient funds to place the bet.");
        }
    }
    updateElementsOnSpinMode() {
        this.uiController.setSpinButtonState(false);
        this.uiController.setBetButtonsState(false);
        this.uiController.updateGameResult("Spinning...");
    }
    updateElementsOnStopMode() {
        this.uiController.setSpinButtonState(true);
        this.uiController.setBetButtonsState(true);
        const payout = this.slotMachine.calculatePayout(this.betAmount);
        this.player.updateBalance(payout);
        let resultMessage = "You lost this round.";
        if (payout > 0) {
            resultMessage = `You won $${payout}!`;
        }
        this.uiController.updateGameResult(resultMessage);
    }
}
