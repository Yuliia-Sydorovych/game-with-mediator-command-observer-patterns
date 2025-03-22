import { PlayerObserver } from "./PlayerObserver";

export class Player
{
  private balance: number;
  private observers: PlayerObserver[] = [];

  constructor(initialBalance: number)
  {
    this.balance = initialBalance;
  }

  public updateBalance(amount: number): void
  {
    this.balance += amount;
    this.notifyObservers();
  }

  public placeBet(amount: number): boolean
  {
    if (this.balance >= amount)
    {
      this.balance -= amount;
      this.notifyObservers();
      return true;
    }
    return false;
  }

  public checkBet(amount: number): boolean
  {
    return this.balance >= amount;
  }

  public getBalance(): number
  {
    return this.balance;
  }

  public isBroke(): boolean 
  {
    return this.balance <= 0;
  }

  public addObserver(observer: PlayerObserver): void
  {
    this.observers.push(observer);
  }

  private notifyObservers(): void
  {
    for (const observer of this.observers)
    {
      observer.update();
    }
  }
}
