# WOD GEN API Documentation
The WOD GEN API provides a way to save profiles and what equipment the profiles have.

## Create a new profile.
**Request Format:** `/createprofile` endpoint with body parameter of `profile`

**Request Type:** `POST`

**Returned Data Format**: `JSON`

**Description:** Returns JSON including the given id to the profile and the profile name. If the profile already exists returns a JSON only containing an error field.
- `id` (int) the id given to the profile
- `profile` (string) the name of the profile matching the body parameter
- `equipment_ids` (array) ids of the equipment this profile has

**Example Request:** /createuser with body parameters...
- `profile` = Jackson

**Example Response:**
```json
{
  "id": 4,
  "profile": "Jackson",
  "equipment_ids": [1, 3, 4]
}
```

**Error Handling:**
- If profile name already exists on server `200 code`
```json
{
  "error": "Profile <profile> already exists"
}
```
- If missing body parameter `profile` `400 code`
```
Error: missing body parameter "profile"
```
- If a database error occurs on server `500 code`
```
Error: database error on server
```

## Login to a profile.
**Request Format:** `/login` endpoint with query parameter of `profile`

**Request Type:** `GET`

**Returned Data Format**: `JSON`

**Description:** Returns JSON including the id given to the profile, the name of the profile and the list of equipment ids the profile has.
- `id` (int) the id given to the profile
- `profile` (string) the name of the profile matching the query parameter
- `equipment_ids` (array) ids of the equipment this profile has

**Example Request:** /login with query parameters...
- `profile` = Jackson

**Example Response:**
```json
{
  "id": 4,
  "profile": "Jackson",
  "equipment_ids": [1, 3, 4]
}
```

**Error Handling:**
- If missing body parameter `profile` `400 code`
```
Error: missing query parameter "profile"
```
- If a database error occurs on server `500 code`
```
Error: database error on server
```
