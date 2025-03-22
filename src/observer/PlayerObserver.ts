import { UIController } from "../ui/UIController";
import { Player } from "./Player";

export class PlayerObserver
{
    private player: Player;
    private uiController: UIController;

    constructor(player: Player, uiController: UIController)
    {
        this.player = player;
        this.uiController = uiController;

        this.observe();
    }

    private observe(): void
    {
        this.uiController.setBalanceValue(this.player.getBalance());
    }
    
    public update()
    {
        this.observe();

        if (this.player.isBroke())
        {
            this.uiController.setSpinButtonState(false);
            this.uiController.updateGameResult("You are out of money! Please add more funds.");
        }
        else
        {
            this.uiController.setSpinButtonState(true);
        }
    }
}
