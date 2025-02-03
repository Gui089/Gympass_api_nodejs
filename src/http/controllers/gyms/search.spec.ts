import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { app } from '../../../app';
import { createAndAuthenticateUser } from '../../../utils/test/create-and-authenticate-user';

describe("Search gyms (e2e)", () => {

  beforeAll(async () => {
    await app.ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("should be able to search a gym", async () => {

    const {token} = await createAndAuthenticateUser(app);

    await request(app.server)
      .post("/gyms")
      .set('Authorization', `Bearer ${token}`)
      .send({
        title:"Javascript gym",
        description:"some description",
        phone:"9999999",
        latitude: -13.6109358,
        longitude: -42.9346089
      });

      await request(app.server)
      .post("/gyms")
      .set('Authorization', `Bearer ${token}`)
      .send({
        title:"Typescript gym",
        description:"some description",
        phone:"9999999",
        latitude: -13.6109358,
        longitude: -42.9346089
      });

      const response = await request(app.server)
      .get("/gyms/search")
      .query({
        q:"Javascript",
      })
      .set('Authorization', `Bearer ${token}`)
      .send();

    expect(response.statusCode).toEqual(200);
    expect(response.body.gyms).toHaveLength(1);
    expect(response.body.gyms).toEqual([
      expect.objectContaining({
        title:"Javascript gym"
      })
    ])
  })
});