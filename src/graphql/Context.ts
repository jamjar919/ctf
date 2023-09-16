enum AuthenticationLevel {
    BASIC,
    ADMIN
}

interface Context {
    authenticationLevel: AuthenticationLevel;
}

export { AuthenticationLevel }
export type { Context }