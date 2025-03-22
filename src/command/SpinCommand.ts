import { Event } from "../event/IEvent";
import { SlotMachine } from "../reels/SlotMachine";
import { Player } from "../observer/Player";
import { UIController } from "../ui/UIController";

export class SpinCommand implements Event
{
  public type: string;
  
  private slotMachine: SlotMachine;
  private uiController: UIController;
  private player: Player;
  private betAmount: number;

  constructor(slotMachine: SlotMachine, player: Player, uiController: UIController, betAmount: number)
  {
    this.slotMachine = slotMachine;
    this.player = player;
    this.uiController = uiController;
    this.betAmount = betAmount;
    this.type = "spin";
  }

  public execute(): void
  {
    if (this.player.placeBet(this.betAmount))
    {
      this.updateElementsOnSpinMode();
      this.slotMachine.spinReels();

      const spinCheckInterval = setInterval(() =>
      {
        if (!this.slotMachine.areReelsSpinning())
        {
          clearInterval(spinCheckInterval);
          this.updateElementsOnStopMode();
        }
      }, 100);
    }
    else
    {
      this.uiController.updateGameResult("Insufficient funds to place the bet.");
    }
  }

  private updateElementsOnSpinMode(): void
  {
    this.uiController.setSpinButtonState(false);
    this.uiController.setBetButtonsState(false);
    this.uiController.updateGameResult("Spinning...");
  }

  private updateElementsOnStopMode(): void
  {
    this.uiController.setSpinButtonState(true);
    this.uiController.setBetButtonsState(true);

    const payout = this.slotMachine.calculatePayout(this.betAmount);
    this.player.updateBalance(payout);

    let resultMessage: string = "You lost this round.";
    if (payout > 0)
    {
      resultMessage = `You won $${payout}!`;
    }

    this.uiController.updateGameResult(resultMessage);
  }
}
