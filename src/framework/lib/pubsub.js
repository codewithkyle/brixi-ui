class EventBusController {
    constructor() {
        this.subscriptions = {};
    }
    create(ticket = this.uid()) {
        if (ticket in this.subscriptions) {
            console.warn(`A subscription has already been created for: ${ticket}`);
        }
        else {
            this.subscriptions[ticket] = {};
        }
        return ticket;
    }
    subscribe(ticket, inbox) {
        const id = this.uid();
        if (!this.subscriptions?.[ticket]) {
            this.create(ticket);
        }
        this.subscriptions[ticket][id] = inbox;
        return id;
    }
    unsubscribe(id, ticket = null) {
        if (ticket === null) {
            for (const subTicket in this.subscriptions) {
                for (const inboxId in this.subscriptions[subTicket]) {
                    if (id === inboxId) {
                        ticket = subTicket;
                        break;
                    }
                }
                if (ticket !== null) {
                    break;
                }
            }
        }
        delete this.subscriptions?.[ticket]?.[id];
    }
    publish(ticket, data) {
        for (const id in this.subscriptions?.[ticket]) {
            this.subscriptions[ticket][id](data);
        }
    }
    destroy(ticket) {
        delete this.subscriptions?.[ticket];
    }
    uid() {
        return new Array(4)
            .fill(0)
            .map(() => Math.floor(Math.random() * Number.MAX_SAFE_INTEGER).toString(16))
            .join("-");
    }
}
const EventBus = new EventBusController();
const createSubscription = EventBus.create.bind(EventBus);
const destroySubscription = EventBus.destroy.bind(EventBus);
/** @deprecated use the `publish()` method instead */
const post = EventBus.publish.bind(EventBus);
const publish = EventBus.publish.bind(EventBus);
const subscribe = EventBus.subscribe.bind(EventBus);
const unsubscribe = EventBus.unsubscribe.bind(EventBus);

export { EventBus, createSubscription, destroySubscription, post, publish, subscribe, unsubscribe };
