import Observer from './Observer';

export default class Observable {
    observers: Observer[];

    constructor() {
        this.observers = [];
    }

    register(observer: Observer): void {
        this.observers.push(observer);
    }

    notifyAll(input: Record<string, unknown>): void {
        for (const observer of this.observers) {
            observer.toReact(input);
        }
    }
}
