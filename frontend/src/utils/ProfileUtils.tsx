var ProfileUtils = (function () {
  var getLoggedIn = function (): boolean {
    return localStorage.getItem("isLoggedIn") === "true";
  };

  var setLoggedIn = function (loggingIn: boolean): void {
    localStorage.setItem("isLoggedIn", String(loggingIn));
  };

  var getEmail = function (): string | null {
    return localStorage.getItem("email");
  };

  var setEmail = function (email: string | null): void {
    localStorage.setItem("email", String(email));
  };

  var getName = function (): string | null {
    return localStorage.getItem("name");
  };

  var setName = function (name: string | null): void {
    localStorage.setItem("name", String(name));
  };

  return {
    getLoggedIn: getLoggedIn,
    setLoggedIn: setLoggedIn,
    getEmail: getEmail,
    setEmail: setEmail,
    getName: getName,
    setName: setName,
  };
})();

export default ProfileUtils;
