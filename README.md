# Social Media App – Posts & Comments

Setup: `npm install`, set `JWT_SECRET` (and optionally `MONGO_URI`, `PORT`), then `npm run dev`.
Send `Authorization: Bearer <token>` on every request. The token payload must contain `id`
(the user's _id). If you have your own auth middleware from Assignment 1, use it instead of src/middleware/auth.js
(it only needs to set `req.user.id`).

## Posts
| Method | Endpoint | Rule |
|---|---|---|
| POST | /posts | any authenticated user |
| GET | /posts | returns only the logged-in user's posts |
| GET | /posts/:postId | single post |
| PATCH | /posts/:postId | post owner only |
| DELETE | /posts/:postId | post owner only (cascades to its comments) |

## Comments
| Method | Endpoint | Rule |
|---|---|---|
| POST | /posts/:postId/comments | any authenticated user |
| GET | /posts/:postId/comments | all comments of a post |
| GET | /comments/:commentId | single comment |
| PATCH | /comments/:commentId | comment owner only |
| DELETE | /comments/:commentId | comment owner OR post owner |

Body for create/update: `{ "content": "text" }`
Status codes: 201 created, 400 bad input/ID, 401 not authenticated, 403 not allowed, 404 not found.
