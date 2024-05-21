export { default } from "next-auth/middleware";

//securing the application
export const config = {
  matcher: ["/issues/new", "/issues/edit/:id+"],
};
