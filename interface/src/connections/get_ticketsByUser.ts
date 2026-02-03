import axios from "axios";
import type { Ticket_api } from "../types/interfaces";

const API_BASE: string = "http://localhost:3000";

const get_ticketsByUser = async (id: number): Promise<Ticket_api[]> => {
  try {
    const response = await axios.get(`${API_BASE}/user_tickets/${id}`);
    if (!response.data.success) {
      throw new Error("API returned unsuccessful response");
    } else {
      return response.data.tickets;
    }
  } catch (error) {
    throw new Error(`Failed getting user tickets; ${error}`);
  }
};

export default get_ticketsByUser;
