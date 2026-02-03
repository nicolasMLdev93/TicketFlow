import axios from "axios";
import type { Events_api } from "../types/interfaces";

const API_BASE: string = "http://localhost:3000";

const filter_event = async (title:string): Promise<Events_api[]> => {
  try {
    const response = await axios.get(`${API_BASE}/event_name/${title}`);
    if (!response.data.success) {
      throw new Error("API returned unsuccessful response");
    } else {
      return response.data.events;
    }
  } catch (error) {
    throw new Error(`Failed getting all events; ${error}`);
  }
};

export default filter_event;
