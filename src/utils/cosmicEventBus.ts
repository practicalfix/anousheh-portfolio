export type CosmicEventType = 'star' | 'meteor' | 'aurora' | 'supernova';

export interface CosmicEventDetail {
  type: CosmicEventType;
}

class CosmicEventBus extends EventTarget {
  dispatch(type: CosmicEventType) {
    const event = new CustomEvent<CosmicEventDetail>('cosmic-event', {
      detail: { type }
    });
    this.dispatchEvent(event);
  }

  subscribe(callback: (type: CosmicEventType) => void) {
    const handler = (e: Event) => {
      const customEvent = e as CustomEvent<CosmicEventDetail>;
      callback(customEvent.detail.type);
    };
    this.addEventListener('cosmic-event', handler);
    return () => this.removeEventListener('cosmic-event', handler);
  }
}

export const cosmicEvents = new CosmicEventBus();
