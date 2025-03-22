import { GameMediator } from "../mediator/GameMediator";

export class UIController
{
    private mediator!: GameMediator;
    private spinButton: HTMLButtonElement;
    private addFundsButton: HTMLButtonElement;
    private betButtons: NodeListOf<HTMLButtonElement>;
    private balanceElement: HTMLElement;
    private resultMessage: HTMLElement;
    private betAmount: number = 1;
  
    constructor()
    {
        this.spinButton = document.getElementById("spin-button") as HTMLButtonElement;
        this.addFundsButton = document.getElementById("add-funds-button") as HTMLButtonElement;
        this.betButtons = document.querySelectorAll(".bet-button") as NodeListOf<HTMLButtonElement>;
        this.balanceElement = document.getElementById("balance")!;
        this.resultMessage = document.getElementById("game-result")!;

        this.setupSpinButton();
        this.setupBetButtons();
        this.setupFundsButton();
    }

    public bindMediator(mediator: GameMediator): void
    {
        this.mediator = mediator;
    }

    public updateGameResult(message: string): void
    {
        this.resultMessage.textContent = message;
    }

    public setSpinButtonState(enabled: boolean): void
    {
        this.spinButton.disabled = !enabled;
    }

    public setBetButtonsState(enabled: boolean): void
    {
        this.betButtons.forEach((button) =>
        {
            button.disabled = !enabled;
        });
    }

    public setBalanceValue(value: number): void
    {
        this.balanceElement.textContent = `Balance: $${value}`;
    }

    private setupSpinButton(): void
    {
        this.spinButton.addEventListener("click", () =>
        {
            this.mediator?.notify(this.spinButton, "spin", this.betAmount);

            this.setBetButtonsState(false);
            this.setSpinButtonState(false);
        });
    }

    private setupBetButtons(): void
    {
        this.betButtons.forEach((button) =>
        {
            button.addEventListener("click", () =>
            {
                this.selectBet(button);
            });
        });

        this.selectBet(this.betButtons[0]);
    }

    private selectBet(button: HTMLButtonElement): void
    {
        this.betButtons.forEach((btn) => btn.classList.remove("selected"));
        button.classList.add("selected");

        this.betAmount = parseInt(button.textContent!.replace('$', ''));
        (document.getElementById("bet-amount") as HTMLInputElement).value = this.betAmount.toString();

        this.mediator?.notify(button, "bet", this.betAmount);
    }

    private setupFundsButton(): void
    {
        this.addFundsButton.addEventListener("click", () =>
        {
            this.mediator?.notify(this.addFundsButton, "funds", 100);

            this.updateGameResult("You added $100. Spin to play!");
        });
    }
}
  