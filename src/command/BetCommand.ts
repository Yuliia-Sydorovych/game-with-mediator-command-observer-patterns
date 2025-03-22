import { Event } from "../event/IEvent";
import { Player } from "../observer/Player";
import { UIController } from "../ui/UIController";

export class BetCommand implements Event
{
  public type: string;
  
  private player: Player;
  private uiController: UIController;
  private betAmount: number;

  constructor(player: Player, uiController: UIController, betAmount: number)
  {
    this.player = player;
    this.uiController = uiController;
    this.betAmount = betAmount;
    this.type = "bet";
  }

  public execute(): void
  {
    if (this.player.checkBet(this.betAmount))
    {
      this.uiController.updateGameResult(`Bet of $${this.betAmount} placed successfully.`);
    }
    else
    {
      this.uiController.updateGameResult("Insufficient funds to place the bet.");
    }
  }
}
