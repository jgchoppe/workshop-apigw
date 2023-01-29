const {ClaimsInfoDecorator} = require("../../../../common/decorators/ClaimsInfoDecorator");
const {TodoListRepository} = require("../../../../common/dynamodb/TodoListRepository");
const {buildDocumentClient} = require("../../../../libs/buildDocument");
const config = require("../../../../common/config/environment")
const {generateResponse} = require("../../../../libs/response");
const {StatusCodes} = require("http-status-codes");

const TodoList = new TodoListRepository({documentClient: buildDocumentClient({}), tableName: config.TODO_LIST_TABLE})

async function getTask(event, userId) {
  const { id } = event.pathParameters

  const item = await TodoList.GetTask(id)
  if (!item) {
    return generateResponse(StatusCodes.NOT_FOUND, "task has not been found")
  } else if (item.userId !== userId) {
    return generateResponse(StatusCodes.FORBIDDEN, "Task User ID doesn't correspond to the request sender.")
  }

  return generateResponse(StatusCodes.OK, {
    task: {
      ...item,
    }
  })
}

const handler = (event) => ClaimsInfoDecorator(getTask, event)

module.exports = {
  handler,
}