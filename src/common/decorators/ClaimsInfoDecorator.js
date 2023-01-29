 async function ClaimsInfoDecorator(handler, event) {
  // TODO: Retrieve user id return error if no id has been found
  const userId = event.requestContext.authorizer.claims["sub"]

   return handler(event, userId)
}

module.exports = {
  ClaimsInfoDecorator,
}