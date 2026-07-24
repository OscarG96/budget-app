import { http } from "../http/http";

export const fetchDashboardData = (month: number, year: number) => http(`/api/dashboard?month=${month}&year=${year}`);