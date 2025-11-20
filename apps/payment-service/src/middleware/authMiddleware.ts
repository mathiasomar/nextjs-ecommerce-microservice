import { getAuth } from "@hono/clerk-auth";
import { createMiddleware } from "hono/factory";
import { Variables } from "hono/types";
import type { CustomJWTSessionClaims } from "@repo/types";

export const shouldBeUser = createMiddleware<{
  Variables: {
    userId: string;
  };
}>(async (c, next) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      message: "You are not logged in.",
    });
  }

  c.set("userId", auth.userId);

  await next();
});

export const shouldBeAdmin = createMiddleware<{
  Variables: {
    userId: string;
  };
}>(async (c, next) => {
  const auth = getAuth(c);

  if (!auth?.userId) {
    return c.json({
      message: "You are not logged in.",
    });
  }

  const claims = auth.sessionClaims as CustomJWTSessionClaims;

  if (claims.metadata?.role !== "admin") {
    return c.json({ message: "you are not an admin" });
  }

  c.set("userId", auth.userId);

  await next();
});
