export class Reel {
    constructor(symbols, reelIndex) {
        this.symbols = symbols;
        this.currentSymbol = symbols[0];
        this.spinning = false;
        this.reelElement = document.getElementById(`reel-${reelIndex}`);
    }
    spin() {
        this.spinning = true;
        let index = 0;
        const interval = setInterval(() => {
            index = Math.floor(Math.random() * this.symbols.length);
            this.currentSymbol = this.symbols[index];
            if (this.reelElement) {
                this.reelElement.textContent = this.currentSymbol;
            }
            if (!this.spinning) {
                clearInterval(interval);
            }
        }, 100);
    }
    stop() {
        this.spinning = false;
    }
    getCurrentSymbol() {
        return this.currentSymbol;
    }
    isSpinning() {
        return this.spinning;
    }
}
