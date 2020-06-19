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

## Get a profile.
**Request Format:** `/getprofile` endpoint with query parameter of `profile`

**Request Type:** `GET`

**Returned Data Format**: `JSON`

**Description:** Returns JSON including the id given to the profile, the name of the profile and the list of equipment ids the profile has. If profile does not exist returns json containing error message.
- `id` (int) the id given to the profile
- `profile` (string) the name of the profile matching the query parameter
- `equipment_ids` (array) ids of the equipment this profile has

**Example Request:** /getprofile with query parameters...
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
- If profile does not exist `200 code`
```json
{
  "error": "Profile <profile> does not exist"
}
```
- If missing body parameter `profile` `400 code`
```
Error: missing query parameter "profile"
```
- If a database error occurs on server `500 code`
```
Error: database error on server
```

## Get all of the equipment.
**Request Format:** `/allequipment`

**Request Type:** `GET`

**Returned Data Format**: `JSON`

**Description:** Returns list of all the equipment on the server.
- array of equipment
  - `id` (int) unique id of the equipment
  - `name` (string) name of the equipment

**Example Request:** /allequipment

**Example Response:**
```json
[
  { "id": 1, "name": "Barbells" },
  { "id": 2, "name": "Dumbbells" },
  { "id": 3, "name": "Barbells" }
  // ... for all equipment on server
]
```

**Error Handling:**
- If a database error occurs on server `500 code`
```
Error: database error on server
```

## Select an equipment for a profile.
**Request Format:** `/selectequipment` endpoint with body parameters of...
- `profile` (string) name of the profile
- `equipment` (string) name of the equipment to select

**Request Type:** `POST`

**Returned Data Format**: `JSON`

**Description:** Toggles whether the equipment is selected or not on the profile. If not currently selected changes to selected and if already selected changes to not selected. Returns JSON including information about the profile and equipment selected
- `profile`
  - `id` (int) unique id of the profile
  - `name` (string) the name of the profile
- `equipment`
  - `id` (int) unique id of the equipment
  - `name` (string) the name of the equipment

**Example Request:** /selectequipment with body parameters...
- `profile` = Jackson
- `equipment` = Dumbbells

**Example Response:**
```json
{
  "profile": "Jackson",
  "equipment": "Dumbbells"
}
```

**Error Handling:**
- If profile does not exist on server `200 code`
```json
{
  "error": "Profile <profile> does not exist"
}
```
- If equipment does not exist on server `200 code`
```json
{
  "error": "Equipment <equipment> does not exist"
}
```
- If missing body parameter `profile` and/or `equipment` `400 code`
```
Error: missing body parameter "profile" and/or "equipment"
```
- If a database error occurs on server `500 code`
```
Error: database error on server
```

## Create a workout.
**Request Format:** `/createworkout`

**Request Type:** `GET`

**Returned Data Format**: `JSON`

**Description:** Returns list of all the equipment on the server.
- `type` (string) type of workout (AMRAP/Time)
- `rounds` (int) number of rounds in the workout
- `time` (optional) (int) if AMRAP workout how long the workout is
- `movements` array of movements in the workout
  - `name` (string) name of the movement
  - `reps` (int) number of reps for the movement
  - `weight` (optional) (string) if a non-body weight movement the level of weight for the movement

**Example Request:** /createworkout

**Example Response:**
```json
{
  "type": "AMRAP",
  "time": 15,
  "movements": [
    {
      "name": "Run",
      "reps": 400,
      "scale": "Meters"
    },
    {
      "name": "Back Squat",
      "reps": 10,
      "scale": "reps",
      "weight": "medium"
    },
    {
      "name": "Wall Balls",
      "reps": 20,
      "scale": "reps",
      "weight": "medium"
    }
  ]
}
```

**Error Handling:**
- If a database error occurs on server `500 code`
```
Error: database error on server
```