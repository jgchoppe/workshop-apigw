 async function ClaimsInfoDecorator(handler, event) {
  const userId = event.requestContext.authorizer.claims["sub"]

  return handler(event, userId)
}

module.exports = {
  ClaimsInfoDecorator,
}