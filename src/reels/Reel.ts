export class Reel
{
  private symbols: string[];
  private currentSymbol: string;
  private spinning: boolean;
  private reelElement: HTMLElement | null;

  constructor(symbols: string[], reelIndex: number)
  {
    this.symbols = symbols;
    this.currentSymbol = symbols[0];
    this.spinning = false;
    this.reelElement = document.getElementById(`reel-${reelIndex}`);
  }

  public spin(): void
  {
    this.spinning = true;
    let index = 0;

    const interval = setInterval(() =>
    {
      index = Math.floor(Math.random() * this.symbols.length);
      
      this.currentSymbol = this.symbols[index];

      if (this.reelElement)
      {
        this.reelElement.textContent = this.currentSymbol;
      }

      if (!this.spinning)
      {
        clearInterval(interval);
      }
    }, 100);
  }

  public stop(): void
  {
    this.spinning = false;
  }

  public getCurrentSymbol(): string
  {
    return this.currentSymbol;
  }

  public isSpinning(): boolean
  {
    return this.spinning;
  }
}
