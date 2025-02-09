import { FastifyInstance } from "fastify";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { create } from "./create-controller";
import { validate } from "./validate-controller";
import { metrics } from "./metrics-controller";
import { history } from "./history-controller";

export async function checkInRoutes(app:FastifyInstance) {
   app.addHook('onRequest', verifyJWT);

   app.get("/check-ins/history", history);
   app.get("/check-ins/metrics", metrics);

   app.post('/gyms/:gymId/check-ins', create);
   app.patch("/check-ins/:checkInId/validate", validate);
}