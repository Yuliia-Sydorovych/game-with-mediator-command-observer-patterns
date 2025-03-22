export class PlayerObserver {
    constructor(player, uiController) {
        this.player = player;
        this.uiController = uiController;
        this.observe();
    }
    observe() {
        this.uiController.setBalanceValue(this.player.getBalance());
    }
    update() {
        this.observe();
        if (this.player.isBroke()) {
            this.uiController.setSpinButtonState(false);
            this.uiController.updateGameResult("You are out of money! Please add more funds.");
        }
        else {
            this.uiController.setSpinButtonState(true);
        }
    }
}
