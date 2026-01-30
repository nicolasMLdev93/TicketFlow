import type { Event_img } from "../types/interfaces";
import tech_event from '../images/tech_event.webp'
import bad_bunny from '../images/bad_bunny_event.jpg'
import pilsen_rock from '../images/pilsen_rock_event.webp'
import armin_van from '../images/armin_van_buuren.jpg'
import fisher_event from '../images/fisher_event.jpg'
import retiro_event from '../images/retiro_event.png'

const event_images: Event_img[] = [
  {
    id: 1,
    image: tech_event,
  },
  {
    id: 2,
    image: bad_bunny,
  },
  {
    id: 3,
    image: pilsen_rock
  },
  {
    id: 4,
    image: armin_van,
  },
  {
    id: 5,
    image: fisher_event,
  },
  {
    id: 6,
    image: retiro_event,
  },
];

export default event_images;
