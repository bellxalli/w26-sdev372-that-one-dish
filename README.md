# Project Overview
## Project Name
That One Dish

## Tagline
Track the dishes worth remembering and share them with friends.

## Problem Statement
People often remember a dish they loved but forget the restaurant name, location,
or details of the meal. Existing apps like notes, photo galleries, or social media
do not organize these food memories effectively. This makes it difficult to revisit
favorite dishes, recommend meals to friends, or recall personal food experiences.

## Solution
That One Dish lets users save photos of dishes along with key details such as
restaurant name, location, cuisine, and personal notes. Users can log dishes from
restaurants they visit or add standalone dishes for cooking inspiration. All
entries are organized in a gallery view and can be shared with friends through
collaborative boards or lists.

## Target Users
- Food lovers who want to keep track of meals they enjoyed
- Students and young professionals who eat out frequently
- Travelers who want to remember restaurants from different cities
- Friends who want to share food recommendations

## Features Breakdown
### MVP Features:
1. Create and read dish entries
2. Fields: Dish name, photo, description/ingredients, optional restaurant info
(name + address), personal notes
3. Gallery view of all dishes
4. Save and get data using MySQL by Node.js API

### Sprint 2:
1. Toggle: “Restaurant dish?” Yes / No
2. Make it possible to edit and delete dishes

### Extended Features:
1. Create shared food board lists with friends
2. Filter or search by cuisine or location
3. Menu photo upload + OCR for auto-filling dish entries

## Data Model Planning
### Core Entities
- **User:** tracks account info, owns dishes, belongs to boards
- **Dish:** primary object: name, photo, description, ingredients, rating, optional
restaurant
- **Restaurant:** name, address, cuisine type; has many dishes
- **Board:** shared list of dishes among users
- **BoardMembership:** joins users to boards

### Key Relationships
- A User can create many Dishes
- A Restaurant can have many Dishes
- A Dish can optionally belong to a Restaurant
- A Board can have many Dishes
- A User can belong to many Boards through BoardMembership
- A Board can have many Users through BoardMembership

## User Experience
### User Flows:
**Create a Dish Entry (Restaurant Dish)**
1. The user signs in to the app.
2. The user clicks “Add Dish”.
3. The user selects “Restaurant Dish”.
4. The user uploads a photo of the dish.
5. The user enters the dish name, restaurant name, location, cuisine, ingredients
and personal notes.
6. The user saves the entry.
7. The dish appears in the user’s gallery view.

**Create a Dish Entry (Inspiration / Home Dish)**
1. The user signs in to the app.
2. The user clicks “Add Dish”.
3. The user selects “Inspiration Dish”.
4. The user uploads a photo of the dish.
5. The user enters the dish name, a brief description, and key ingredients (no full
recipe).
6. The user saves the entry.
7. The dish appears in the user’s gallery view.