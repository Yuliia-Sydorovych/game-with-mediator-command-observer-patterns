import { Player } from "./observer/Player";
import { Reel } from "./reels/Reel";
import { GameMediator } from "./mediator/GameMediator";
import { EventSystem } from "./event/EventSystem";
import { PlayerObserver } from "./observer/PlayerObserver";
import { SlotMachine } from "./reels/SlotMachine";
import { UIController } from "./ui/UIController";

const initialBalance = 1000;
const player = new Player(initialBalance);

const symbols = ["🍒", "🍋", "🍊", "🍉", "🍇"];
const reels: Reel[] = [];
const reelsCount = 3;
for (let i = 0; i < reelsCount; i++)
{
  reels.push(new Reel(symbols, i));
}

const slotMachine = new SlotMachine(reels);

const eventSystem = new EventSystem();

const uiController = new UIController();

const mediator = new GameMediator(slotMachine, player, eventSystem, uiController);

const playerObserver = new PlayerObserver(player, uiController);
player.addObserver(playerObserver);

eventSystem.enqueueEvent(
{
    type: "gameStart",
    execute: () =>
    {
        console.log("Game started!");
    }
});

function gameLoop()
{
    mediator.process();
    requestAnimationFrame(gameLoop);
}

gameLoop();
