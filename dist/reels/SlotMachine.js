export class SlotMachine {
    constructor(reels) {
        this.reels = reels;
    }
    spinReels() {
        this.reels.forEach((reel) => reel.spin());
        setTimeout(() => {
            this.reels.forEach((reel) => reel.stop());
        }, 2001);
    }
    areReelsSpinning() {
        return this.reels.some((reel) => reel.isSpinning());
    }
    getFinalSymbols() {
        return this.reels.map((reel) => reel.getCurrentSymbol());
    }
    calculatePayout(betAmount) {
        const finalSymbols = this.getFinalSymbols();
        if (finalSymbols.every((symbol) => symbol === finalSymbols[0])) {
            return betAmount * 2;
        }
        return 0;
    }
}
