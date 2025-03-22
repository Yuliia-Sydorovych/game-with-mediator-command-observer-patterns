export class UIController {
    constructor() {
        this.betAmount = 1;
        this.spinButton = document.getElementById("spin-button");
        this.addFundsButton = document.getElementById("add-funds-button");
        this.betButtons = document.querySelectorAll(".bet-button");
        this.balanceElement = document.getElementById("balance");
        this.resultMessage = document.getElementById("game-result");
        this.setupSpinButton();
        this.setupBetButtons();
        this.setupFundsButton();
    }
    bindMediator(mediator) {
        this.mediator = mediator;
    }
    updateGameResult(message) {
        this.resultMessage.textContent = message;
    }
    setSpinButtonState(enabled) {
        this.spinButton.disabled = !enabled;
    }
    setBetButtonsState(enabled) {
        this.betButtons.forEach((button) => {
            button.disabled = !enabled;
        });
    }
    setBalanceValue(value) {
        this.balanceElement.textContent = `Balance: $${value}`;
    }
    setupSpinButton() {
        this.spinButton.addEventListener("click", () => {
            var _a;
            (_a = this.mediator) === null || _a === void 0 ? void 0 : _a.notify(this.spinButton, "spin", this.betAmount);
            this.setBetButtonsState(false);
            this.setSpinButtonState(false);
        });
    }
    setupBetButtons() {
        this.betButtons.forEach((button) => {
            button.addEventListener("click", () => {
                this.selectBet(button);
            });
        });
        this.selectBet(this.betButtons[0]);
    }
    selectBet(button) {
        var _a;
        this.betButtons.forEach((btn) => btn.classList.remove("selected"));
        button.classList.add("selected");
        this.betAmount = parseInt(button.textContent.replace('$', ''));
        document.getElementById("bet-amount").value = this.betAmount.toString();
        (_a = this.mediator) === null || _a === void 0 ? void 0 : _a.notify(button, "bet", this.betAmount);
    }
    setupFundsButton() {
        this.addFundsButton.addEventListener("click", () => {
            var _a;
            (_a = this.mediator) === null || _a === void 0 ? void 0 : _a.notify(this.addFundsButton, "funds", 100);
            this.updateGameResult("You added $100. Spin to play!");
        });
    }
}
