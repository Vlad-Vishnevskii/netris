type ZoneKeys = 'width' | 'height' | 'top' | 'left';

export interface Event {
  timestamp: number;
  duration: number;
  zone: Record<ZoneKeys, number>;
}

export interface EventsState {
  events: Event[];
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
}
