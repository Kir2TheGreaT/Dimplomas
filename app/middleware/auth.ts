export default defineNuxtRouteMiddleware((to, from) => {
  const authCookie = useCookie("auth-logged-in");

  if (!authCookie.value && to.path !== "/loginPage") {
    return navigateTo("/loginPage");
  }
});
