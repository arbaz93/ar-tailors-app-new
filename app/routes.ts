import { type RouteConfig, index, route } from "@react-router/dev/routes";

export default [
    index("routes/home.tsx"),
    route('auth', "routes/auth.tsx"),
    route('customer', "routes/customer.tsx")
] satisfies RouteConfig;
