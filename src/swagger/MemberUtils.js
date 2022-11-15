const {Member}=require("../../src/model/Member")
function requestBodyOfMember(schema = Member) {
    return {
      requestBody: {
        description: "",
        content: {
          "application/json": {
            schema,
          },
        },
      },
    }
  }
  function response200OfMember(schema = Member) {
    return {
      responses: {
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema,
            },
          },
        },
      },
    }
  }
  module.exports = {
    requestBodyOfMember,
    response200OfMember
  }
  