process.env.NODE_ENV = "test";
const request = require("supertest");
const app = require("./app");
let items = require("./fake.Db")
let item = { name: "apple", price: 5 }

beforeEach(function()  {
  items.push(item)
});

afterEach(function()  {
  items = []
});


describe("GET /items", function () {
  test("Gets a list of items", async function () {
    const response = await request(app).get(`/items`);
    const { items } = response.body;
    expect(response.statusCode).toBe(200);
    expect(items).toHaveLength(3);
  });
});


describe("GET /items/:name",  function () {
  test("Gets a single item", async function () {
    const response = await request(app).get(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body.item).toEqual(item);
  });

  test("Cannot find item",  async function () {
    const response = await request(app).get(`/items/fhfh`);
    expect(response.statusCode).toBe(404);
  });
});


describe("POST /items",  function () {
  test("Creates a new item", async function () {
    const response = await request(app)
      .post(`/items`)
      .send({
        name: "mango",
        price: 0.99
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
        "added": {
            "name": "mango",
            "price": 0.99
        }
    });
  });
});


describe("PATCH /items/:name", function () {
  test("Updates an item", async function () {
    const response = await request(app)
      .patch(`/items/${item.name}`)
      .send({
        name: "kiwi",
        price: 1
      });
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({
        "updated": {
            "name": "kiwi",
            "price": 1
        }
    });
    
  });

  test("Can't find item", async function () {
    const response = await request(app).patch(`/items/djdj`);
    expect(response.statusCode).toBe(404);
  });
});

describe("DELETE /items/:name", function () {
  test("Deletes a single a item", async function () {
    const response = await request(app)
      .delete(`/items/${item.name}`);
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual({ message: "Deleted" });
  });
});
