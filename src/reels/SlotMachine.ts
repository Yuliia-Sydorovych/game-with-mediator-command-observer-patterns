import { Reel } from "./Reel";

export class SlotMachine
{
  private reels: Reel[];

  constructor(reels: Reel[])
  {
    this.reels = reels;
  }

  public spinReels(): void
  {
    this.reels.forEach((reel) => reel.spin());

    setTimeout(() =>
    {
      this.reels.forEach((reel) => reel.stop());
    }, 2001);
  }

  public areReelsSpinning(): boolean
  {
    return this.reels.some((reel) => reel.isSpinning());
  }

  public getFinalSymbols(): string[]
  {
    return this.reels.map((reel) => reel.getCurrentSymbol());
  }

  public calculatePayout(betAmount: number): number
  {
    const finalSymbols = this.getFinalSymbols();

    if (finalSymbols.every((symbol) => symbol === finalSymbols[0]))
    {
      return betAmount * 2;
    }

    return 0;
  }
}
