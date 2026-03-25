import { User } from "@/types/types";
import { http } from "../http/http";

export const registerUser = (user: User) => 
  http('/api/register', {
    method: 'POST',
    body: user
  })