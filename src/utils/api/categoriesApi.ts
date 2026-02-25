import { http } from "../http/http";

export const fetchCategories = () => http<[]>('/api/categories');
