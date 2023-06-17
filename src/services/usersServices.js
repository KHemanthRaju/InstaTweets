import axios from "axios";

export const getAllUsersService = async () => await axios.get("/api/users");
