# strix-test-backend

Simulated Express API consumed by `strix-test-frontend`.
Deliberately contains reviewable issues: SQL injection on `/api/users/:id`
(the frontend passes `?uid=` through verbatim), command injection on
`/api/search`, and path traversal on `/api/export`.
