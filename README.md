# FODMAP Food Database

## Overview

The FODMAP Food Database is a comprehensive web application designed to help individuals following a low FODMAP diet easily search, filter, and understand the FODMAP content of various foods.

## 🌐 Live Preview
Check out the live preview [Live Preview](https://fodmap-recipe.netlify.app/). 

## Features

### Key Functionality
- 🔍 Advanced search capabilities
- 🏷️ Multiple filtering options
- 📊 View foods in list or grid mode
- 📱 Responsive design
- 🍽️ Detailed food information

### Filters
- FODMAP Levels (Low, Medium, High)
- Dietary Restrictions
  - Gluten-Free
  - Lactose-Free
  - Dairy-Free
  - Vegan
  - Vegetarian
- Food Categories

### Sorting Options
- Alphabetical
- FODMAP Level (Low to High)
- FODMAP Level (High to Low)

## Tech Stack

- Next.js
- Tailwind CSS
- Framer Motion
- Lucide React Icons

## Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/fodmap-food-database.git
cd fodmap-food-database
```

2. Install dependencies
```bash
npm install
```

3. Run the development server
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) in your browser

## Data Source

The application uses several JSON files located in the `public` directory to manage its data:

1. **`fodmap.json`**: Contains the food database with the following key attributes:
    - Food Name
    - FODMAP Level
    - Category
    - Dietary Restrictions

2. **`resources.json`**: Provides a curated list of educational resources, articles, and guides to help users better understand the low FODMAP diet.

3. **`recipes.json`**: Includes a collection of low FODMAP recipes with details such as:
    - Recipe Name
    - Ingredients
    - Preparation Steps
    - Dietary Suitability (e.g., Vegan, Gluten-Free)

These files can be modified to update or expand the application's content.