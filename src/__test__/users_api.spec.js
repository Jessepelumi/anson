import * as validator from "express-validator";
import * as helpers from "../utils/helpers.js";
import {
  getUsersByUsernameHandler,
  createUserHandler,
} from "../handlers/users_api";
import { User } from "../mongoose/schema/users.js";

jest.mock("../mongoose/schema/users.js");
jest.mock("express-validator", () => ({
  validationResult: jest.fn(() => ({
    isEmpty: jest.fn(() => false),
    array: jest.fn(() => [{ msg: "Invalid entry" }]),
  })),
  matchedData: jest.fn(() => ({
    username: "test",
    password: "password",
  })),
}));

jest.mock("../utils/helpers.js", () => ({
  hashPassword: jest.fn((password) => `hashed_${password}`),
}));

const mockRequest = {
  params: {
    username: "jeolad",
  },
};

const mockResponse = {
  sendStatus: jest.fn(),
  send: jest.fn(),
  status: jest.fn().mockReturnThis(),
  // status: jest.fn(() => mockResponse),
};

describe("get users", () => {
  // beforeEach(() => {
  //   jest.clearAllMocks();
  // });

  it("should get users by username", async () => {
    const mockUser = {
      username: "jeolad",
      firstName: "Jesse",
      email: "jeolad@example.com",
    };

    User.findOne.mockResolvedValue(mockUser);

    await getUsersByUsernameHandler(mockRequest, mockResponse);

    expect(User.findOne).toHaveBeenCalledWith({ username: "jeolad" });
    expect(mockResponse.status).toHaveBeenCalledWith(200);
    expect(mockResponse.send).toHaveBeenCalledWith(mockUser);
  });

  it("should return 404 if user not found", async () => {
    User.findOne.mockResolvedValue(null);

    await getUsersByUsernameHandler(mockRequest, mockResponse);

    expect(User.findOne).toHaveBeenCalledWith({ username: "jeolad" });
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(404);
  });
});

describe("create user", () => {
  const mockRequest = {};
  it("should return 400 when there are errors", async () => {
    await createUserHandler(mockRequest, mockResponse);
    expect(validator.validationResult).toHaveBeenCalled();
    expect(validator.validationResult).toHaveBeenCalledWith(mockRequest);
    expect(mockResponse.status).toHaveBeenCalledWith(400);
    expect(mockResponse.send).toHaveBeenCalledWith([{ msg: "Invalid entry" }]);
  });

  it("should return a status of 201 and the created user", async () => {
    jest.spyOn(validator, "validationResult").mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
    }));

    const saveMethod = jest
      .spyOn(User.prototype, "save")
      .mockResolvedValueOnce({
        id: 1,
        username: "test",
        password: "hashed_password",
      });

    await createUserHandler(mockRequest, mockResponse);
    expect(validator.matchedData).toHaveBeenCalledWith(mockRequest);
    expect(helpers.hashPassword).toHaveBeenCalledWith("password");
    expect(helpers.hashPassword).toHaveReturnedWith("hashed_password");
    expect(User).toHaveBeenCalledWith({
      username: "test",
      password: "hashed_password",
    });
    expect(saveMethod).toHaveBeenCalled();
    expect(mockResponse.status).toHaveBeenCalledWith(201);
    expect(mockResponse.send).toHaveBeenCalledWith({
      id: 1,
      username: "test",
      password: "hashed_password",
    });
  });

  it("should send status of 400 when database fails to save user", async () => {
    jest.spyOn(validator, "validationResult").mockImplementationOnce(() => ({
      isEmpty: jest.fn(() => true),
    }));

    const saveMethod = jest
      .spyOn(User.prototype, "save")
      .mockImplementationOnce(() => Promise.reject("Failed to save user"));

    await createUserHandler(mockRequest, mockResponse);
    expect(saveMethod).toHaveBeenCalled();
    expect(mockResponse.sendStatus).toHaveBeenCalledWith(400);
  });
});
