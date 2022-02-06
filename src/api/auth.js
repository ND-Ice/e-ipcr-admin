import client from "./client";

const login = (user) => client.post("/auth/admin", user);

const authApi = { login };
export default authApi;
