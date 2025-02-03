import { FastifyInstance } from "fastify";
import { authenticateController } from "./authenticate-controller";
import { verifyJWT } from "../../middlewares/verify-jwt";
import { profileController } from "./profile-controller";
import { registerController } from "./register-controller";
import { refresh } from "./refresh";


export async function userRoutes(app:FastifyInstance) {
    app.post("/users", registerController);
    app.post("/sessions", authenticateController);

    app.patch("/token/refresh", refresh);
    
    app.get("/me",{onRequest:[verifyJWT]}, profileController);
}