interface Event {
  title: string;
  description: string;
  start_date: string;
  ending_date: string;
  location: string;
  event_producer: string;
  state: string;
  capacity: number;
}

interface Events_api {
  events: Event[];
  success: boolean;
}

interface Event_img {
  id: number;
  image: string;
}

export type { Events_api, Event_img };
