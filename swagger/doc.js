export const swaggerDocumentConfig =
{
  "swagger": "2.0",
  "info": {
    "description": "grades-control API",
    "version": "1.0.0",
    "title": "Grades Control API"
  },
  "host": "localhost:3000",
  "tags": [
    {
      "name": "Grades",
      "description": "Grades Management"
    }
  ],
  "schemes": [
    "http"
  ],
  "paths": {
    "/grades/get-all": {
      "get": {
        "tags": [
          "Grade"
        ],
        "summary": "Get all Grades",
        "description": "Get all Grades",
        "produces": [
          "application/json"
        ],
        "responses": {
          "200": {
            "description": "Grades Fetched",
            "schema": {
              "type": "array",
              "items": {
                "$ref": "#/definitions/Grades"
              }
            }
          },
          "400": {
            "description": "Grades Fetched"
          }
        }
      }
    }
  },
  "definitions": {
    "Grades": {
      "type": "object",
      "properties": {
        "id": {
          "type": "integer",
          "format": "int64"
        },
        "student": {
          "type": "string"
        },
        "subject": {
          "type": "string"
        },
        "value": {
          "type": "integer",
          "format": "int64"
        },
        "timestamp": {
          "type": "string",
          "timestamp": "date-time"
        }
      }
    }
  },
  "externalDocs": {
    "description": "Find out more about Swagger",
    "url": "http://swagger.io"
  }
}