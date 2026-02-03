//  Mocks
const mockHashSync = jest.fn();
const mockHash = jest.fn();
const mockCompareSync = jest.fn();
const mockJwtSign = jest.fn();
const mockUsersCreate = jest.fn();
const mockUsersFindOne = jest.fn();
const mockEventsCreate = jest.fn();
const mockEventsFindAll = jest.fn();
const mockEventsFindOne = jest.fn();
const mockTicketTypesCreate = jest.fn();
const mockTicketTypesFindAll = jest.fn();
const mockTicketTypesFindOne = jest.fn();
const mockTicketTypesDecrement = jest.fn();
const mockTicketTypesIncrement = jest.fn();
const mockOrdersCreate = jest.fn();
const mockOrdersFindAll = jest.fn();
const mockTicketsCreate = jest.fn();
const mockTicketsFindAll = jest.fn();
const mockTicketsFindOne = jest.fn();
const mockTicketsUpdate = jest.fn();

//  Mock de bcrypt
jest.mock("bcrypt", () => ({
  hashSync: mockHashSync,
  hash: mockHash,
  compareSync: mockCompareSync,
}));

//  Mock de jwt
jest.mock("jsonwebtoken", () => ({
  sign: mockJwtSign,
}));

//  Mock de sequelize operators
jest.mock("sequelize", () => ({
  Op: {
    like: "like",
    gt: "gt",
    in: "in",
  },
  where: jest.fn(),
}));

//  Mock de models
jest.mock("../models", () => ({
  users: {
    create: mockUsersCreate,
    findOne: mockUsersFindOne,
    findAll: jest.fn(),
  },
  events: {
    create: mockEventsCreate,
    findAll: mockEventsFindAll,
    findOne: mockEventsFindOne,
  },
  ticket_types: {
    create: mockTicketTypesCreate,
    findAll: mockTicketTypesFindAll,
    findOne: mockTicketTypesFindOne,
    decrement: mockTicketTypesDecrement,
    increment: mockTicketTypesIncrement,
  },
  orders: {
    create: mockOrdersCreate,
    findAll: mockOrdersFindAll,
    findOne: jest.fn(),
  },
  tickets: {
    create: mockTicketsCreate,
    findAll: mockTicketsFindAll,
    findOne: mockTicketsFindOne,
    update: mockTicketsUpdate,
  },
}));

//  Mock de process.env
const originalEnv = process.env;
beforeAll(() => {
  process.env = {
    ...originalEnv,
    JWT_SECRET: "test-secret-key",
  };
});

afterAll(() => {
  process.env = originalEnv;
});

import {
  register_user,
  login_user,
  create_event,
  get_events,
  get_eventByName,
  create_ticketType,
  get_ticket_types,
  get_event,
  create_order,
  get_userTickets,
  cancel_ticket,
} from "../api/controllers/controllers";

// TESTS
describe("Controlador Ticketing - Tests", () => {
  let req: any;
  let res: any;

  beforeEach(() => {
    req = { body: {}, params: {} };
    res = {
      status: jest.fn(() => res),
      json: jest.fn(),
    };

    jest.clearAllMocks();

    mockHash.mockResolvedValue("hashed_password_mock");
    mockHashSync.mockReturnValue("hashed_password_mock");
    mockJwtSign.mockReturnValue("jwt_token_mock");
  });

  // ========== TEST 1: REGISTER USER ==========
  describe("register_user", () => {
    test("registra usuario correctamente", async () => {
      req.body = {
        email: "test@example.com",
        password: "password123",
        name: "John",
        surname: "Doe",
        role: "user",
      };

      await register_user(req, res);

      expect(mockHash).toHaveBeenCalledWith("password123", 10);
      expect(mockUsersCreate).toHaveBeenCalledWith({
        email: "test@example.com",
        password: "hashed_password_mock",
        name: "John",
        surname: "Doe",
        isActive: true,
        role: "user",
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "User created!",
        success: true,
      });
    });

    test("maneja errores en registro", async () => {
      req.body = {
        email: "test@example.com",
        password: "password123",
        name: "John",
        surname: "Doe",
        role: "user",
      };

      const error = new Error("Database error");
      mockHash.mockRejectedValue(error);

      await register_user(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
        success: false,
        error: error,
      });
    });
  });

  // ========== TEST 2: LOGIN USER ==========
  describe("login_user", () => {
    test("login exitoso", async () => {
      req.body = {
        email: "test@example.com",
        password: "password123",
      };

      const mockUser = {
        id: 1,
        email: "test@example.com",
        name: "John",
        password: "hashed_password_mock",
        role: "user",
      };

      mockUsersFindOne.mockResolvedValue(mockUser);
      mockCompareSync.mockReturnValue(true);

      await login_user(req, res);

      expect(mockUsersFindOne).toHaveBeenCalledWith({
        where: { email: "test@example.com" },
      });
      expect(mockCompareSync).toHaveBeenCalledWith(
        "password123",
        "hashed_password_mock",
      );
      expect(mockJwtSign).toHaveBeenCalledWith({ data: 1 }, "test-secret-key");
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Welcome John",
        token: "jwt_token_mock",
        success: true,
        user: {
          id: 1,
          email: "test@example.com",
          role: "user",
        },
      });
    });

    test("login falla con contraseña incorrecta", async () => {
      req.body = {
        email: "test@example.com",
        password: "wrong",
      };

      mockUsersFindOne.mockResolvedValue({
        id: 1,
        password: "hashed_password_mock",
        name: "John",
      });
      mockCompareSync.mockReturnValue(false);

      await login_user(req, res);

      expect(res.status).toHaveBeenCalledWith(400);
      expect(res.json).toHaveBeenCalledWith({
        error: "Your password is incorrect, try again!",
        success: false,
      });
    });

    test("maneja errores en login", async () => {
      req.body = {
        email: "test@example.com",
        password: "password123",
      };

      const error = new Error("Database error");
      mockUsersFindOne.mockRejectedValue(error);

      await login_user(req, res);

      expect(res.status).toHaveBeenCalledWith(500);
      expect(res.json).toHaveBeenCalledWith({
        message: "Internal Server Error",
        success: false,
        error: error,
      });
    });
  });

  // ========== TEST 3: CREATE EVENT ==========
  describe("create_event", () => {
    test("crea evento exitosamente", async () => {
      req.body = {
        title: "Concierto",
        description: "Concierto de rock",
        start_date: "2024-12-01 20:00",
        ending_date: "2024-12-01 23:00",
        location: "Estadio Nacional",
        event_producer: "Productora XYZ",
        state: "active",
        capacity: 1000,
      };

      await create_event(req, res);

      expect(mockEventsCreate).toHaveBeenCalledWith({
        title: "Concierto",
        description: "Concierto de rock",
        start_date: "2024-12-01 20:00",
        ending_date: "2024-12-01 23:00",
        location: "Estadio Nacional",
        event_producer: "Productora XYZ",
        state: "active",
        capacity: 1000,
      });
      expect(res.status).toHaveBeenCalledWith(201);
      expect(res.json).toHaveBeenCalledWith({
        message: "Event created!",
        success: true,
      });
    });
  });

  // ========== TEST 4: GET ALL EVENTS ==========
  describe("get_events", () => {
    test("obtiene todos los eventos", async () => {
      const mockEvents = [
        { id: 1, title: "Evento 1", location: "Lugar 1" },
        { id: 2, title: "Evento 2", location: "Lugar 2" },
      ];

      mockEventsFindAll.mockResolvedValue(mockEvents);

      await get_events(req, res);

      expect(mockEventsFindAll).toHaveBeenCalled();
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        events: mockEvents,
        success: true,
      });
    });
  });

  // ========== TEST 5: GET EVENTS BY NAME ==========
  describe("get_eventByName", () => {
    test("obtiene eventos por nombre", async () => {
      req.params = { title: "concierto" };

      const mockEvents = [
        { id: 1, title: "Concierto Rock", location: "Estadio" },
      ];

      mockEventsFindAll.mockResolvedValue(mockEvents);

      await get_eventByName(req, res);

      expect(mockEventsFindAll).toHaveBeenCalledWith({
        where: {
          title: {
            like: "%concierto%",
          },
        },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        events: mockEvents,
        success: true,
      });
    });
  });

  // ========== TEST 6: CREATE TICKET TYPE ==========
  describe("create_ticketType", () => {
    test("crea tipo de ticket VIP", async () => {
      req.body = {
        event_id: 1,
        name: "vip",
        price: 100,
        description: "Ticket VIP",
      };

      const mockEvent = {
        id: 1,
        capacity: 1000,
        start_date: "2024-12-01 20:00",
      };

      mockEventsFindOne.mockResolvedValue(mockEvent);

      await create_ticketType(req, res);

      expect(mockEventsFindOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(mockTicketTypesCreate).toHaveBeenCalledWith({
        event_id: 1,
        name: "vip",
        price: 100,
        available_quantity: 250,
        description: "Ticket VIP",
        sale_start_date: expect.any(String),
        sale_end_date: "2024-12-01 20:00",
      });
      expect(res.status).toHaveBeenCalledWith(201);
    });

    test("crea tipo de ticket común", async () => {
      req.body = {
        event_id: 1,
        name: "common",
        price: 50,
        description: "Ticket General",
      };

      const mockEvent = {
        id: 1,
        capacity: 1000,
        start_date: "2024-12-01 20:00",
      };

      mockEventsFindOne.mockResolvedValue(mockEvent);

      await create_ticketType(req, res);

      expect(mockTicketTypesCreate).toHaveBeenCalledWith({
        event_id: 1,
        name: "common",
        price: 50,
        available_quantity: 750,
        description: "Ticket General",
        sale_start_date: expect.any(String),
        sale_end_date: "2024-12-01 20:00",
      });
    });
  });

  // ========== TEST 7: GET TICKET TYPES ==========
  describe("get_ticket_types", () => {
    test("obtiene tipos de ticket disponibles", async () => {
      req.params = { event_id: "1" };

      const mockTicketTypes = [
        { id: 1, name: "vip", price: 100, available_quantity: 50 },
        { id: 2, name: "common", price: 50, available_quantity: 100 },
      ];

      mockTicketTypesFindAll.mockResolvedValue(mockTicketTypes);

      await get_ticket_types(req, res);

      expect(mockTicketTypesFindAll).toHaveBeenCalledWith({
        where: {
          event_id: "1",
          available_quantity: { gt: 0 },
        },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        ticket_types: mockTicketTypes,
        success: true,
      });
    });

    test("muestra mensaje si no hay tipos de ticket", async () => {
      req.params = { event_id: "99" };

      mockTicketTypesFindAll.mockResolvedValue([]);

      await get_ticket_types(req, res);

      expect(res.json).toHaveBeenCalledWith({
        message: "This event don´t have ticket_types registered yet!",
        success: true,
      });
    });
  });

  // ========== TEST 8: GET EVENT BY TITLE ==========
  describe("get_event", () => {
    test("obtiene evento por título exacto", async () => {
      req.params = { title: "Concierto Rock" };

      const mockEvent = { id: 1, title: "Concierto Rock", location: "Estadio" };

      mockEventsFindOne.mockResolvedValue(mockEvent);

      await get_event(req, res);

      expect(mockEventsFindOne).toHaveBeenCalledWith({
        where: { title: "Concierto Rock" },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        events: mockEvent,
        success: true,
      });
    });
  });

  // ========== TEST 9: GET USER TICKETS ==========
  describe("get_userTickets", () => {
    test("obtiene tickets de usuario", async () => {
      req.params = { user_id: "1" };

      const mockOrders = [
        { id: 100, user_id: 1 },
        { id: 101, user_id: 1 },
      ];
      const mockTickets = [
        { id: 1, order_id: 100, ticket_type_id: 1 },
        { id: 2, order_id: 101, ticket_type_id: 2 },
      ];

      mockOrdersFindAll.mockResolvedValue(mockOrders);
      mockTicketsFindAll.mockResolvedValue(mockTickets);

      await get_userTickets(req, res);

      expect(mockOrdersFindAll).toHaveBeenCalledWith({
        where: { user_id: "1" },
      });
      expect(mockTicketsFindAll).toHaveBeenCalledWith({
        where: { order_id: { in: [100, 101] } },
      });
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        tickets: mockTickets,
        success: true,
      });
    });
  });

  // ========== TEST 10: CANCEL TICKET ==========
  describe("cancel_ticket", () => {
    test("cancela ticket correctamente", async () => {
      req.params = { ticket_id: "1" };

      const mockTicket = {
        id: 1,
        ticket_type_id: 1,
        state: "confirmed",
      };

      mockTicketsFindOne.mockResolvedValue(mockTicket);
      mockTicketsUpdate.mockResolvedValue([1]);

      await cancel_ticket(req, res);

      expect(mockTicketsUpdate).toHaveBeenCalledWith(
        { state: "canceled" },
        { where: { id: "1" } },
      );
      expect(mockTicketsFindOne).toHaveBeenCalledWith({
        where: { id: "1" },
      });
      expect(mockTicketTypesIncrement).toHaveBeenCalledWith(
        "available_quantity",
        {
          by: 1,
          where: { id: 1 },
        },
      );
      expect(res.status).toHaveBeenCalledWith(200);
      expect(res.json).toHaveBeenCalledWith({
        message: "Ticket canceled!",
        success: true,
      });
    });
  });
});
