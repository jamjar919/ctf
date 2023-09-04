enum AuthenticationLevel {
    BASIC,
    ADMIN
}

interface Context {
    authenticationLevel: AuthenticationLevel;
}

export { Context, AuthenticationLevel }