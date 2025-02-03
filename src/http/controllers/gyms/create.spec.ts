import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '../../../app';
import { createAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user';

describe("Create gyms (e2e)", () => {

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to create a gym", async () => {

    const {token} = await createAndAuthenticateUser(app);

    const response = await request(app.server)
      .post("/gyms")
      .set('Authorization', `Bearer ${token}`)
      .send({
        title:"Javascript gym",
        description:"some description",
        phone:"9999999",
        latitude: -13.6109358,
        longitude: -42.9346089
      });

    expect(response.statusCode).toEqual(201);
  })
});