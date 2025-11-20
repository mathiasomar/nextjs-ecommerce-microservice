import { FastifyInstance } from "fastify";
import { shouldBeUser } from "../middleware/authMiddleware";
import { Order } from "@repo/order-db";

const orderRoute = async (fastify: FastifyInstance) => {
  fastify.get(
    "/orders",
    { preHandler: shouldBeUser },
    async (request, reply) => {
      const orders = await Order.find({ userId: request.userId });
      return reply.send(orders);
    }
  );
};
