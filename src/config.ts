const { SECRET_JWT_KEY, PORT } = process.env;

export const port = PORT || 3000;
export const secret = SECRET_JWT_KEY || "secret";
