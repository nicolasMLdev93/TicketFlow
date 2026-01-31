import axios from "axios";
import type { TicketType_api } from "../types/interfaces";

const API_BASE: string = "http://localhost:3000";

const get_ticketTypesEvent = async (event_id:number): Promise<TicketType_api[]> => {
  try {
    const response = await axios.get(`${API_BASE}/ticket_type/${event_id}`);
    if (!response.data.success) {
      throw new Error("API returned unsuccessful response");
    } else {
      return response.data.ticket_types;
    }
  } catch (error) {
    throw new Error(`Failed getting ticket types by event id; ${error}`);
  }
};

export default get_ticketTypesEvent;
