interface Event {
  id: number;
  title: string;
  description: string;
  start_date: string;
  ending_date: string;
  location: string;
  event_producer: string;
  state: string;
  capacity: number;
}

interface Ticket_type {
  id: number;
  event_id: number;
  name: string;
  price: GLfloat;
  available_quantity: number;
  description: string;
  sale_start_date: string;
  sale_end_date: string;
}

interface Events_api {
  events: Event[];
  success: boolean;
}

interface TicketType_api {
  ticket_types: Ticket_type[];
  success: boolean;
}

interface Event_img {
  id: number;
  image: string;
}

export type { Events_api, Event_img, TicketType_api, Event, Ticket_type };
