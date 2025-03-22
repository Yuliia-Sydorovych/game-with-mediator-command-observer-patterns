export class Player {
    constructor(initialBalance) {
        this.observers = [];
        this.balance = initialBalance;
    }
    updateBalance(amount) {
        this.balance += amount;
        this.notifyObservers();
    }
    placeBet(amount) {
        if (this.balance >= amount) {
            this.balance -= amount;
            this.notifyObservers();
            return true;
        }
        return false;
    }
    checkBet(amount) {
        return this.balance >= amount;
    }
    getBalance() {
        return this.balance;
    }
    isBroke() {
        return this.balance <= 0;
    }
    addObserver(observer) {
        this.observers.push(observer);
    }
    notifyObservers() {
        for (const observer of this.observers) {
            observer.update();
        }
    }
}
