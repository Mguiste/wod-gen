# WOD GEN API Documentation
The WOD GEN API provides a way to save profiles and what equipment the profiles have.

## Create a new profile.
**Request Format:** /createprofile endpoint with body parameters of `profile`

**Request Type:** POST

**Returned Data Format**: JSON

**Description:** Returns JSON including the given id to the profile and the profile name. If the profile already exists returns a JSON only containing an error field.
- `id` (int) the id given to the profile
- `profile` (string) the name of the profile matching the body parameter

**Example Request:** /createuser with body parameters...
- `profile` = Jackson

**Example Response:**
```json
{
  "id": 4,
  "profile": "Jackson"
}
```

**Error Handling:**
- If profile name already exists on server (200 code)
```json
{
  "error": "Profile <profile> already exists"
}
```
- If missing body parameter `profile` (400 code)
- Possible 400 (invalid request)
```
Error: missing body parameter "name"
```
- If a database error occurs on server (500 code)
```
Error: database error on server
```
