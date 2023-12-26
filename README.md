# BRIDGE IN Test Assessment

a single-page React App with TypeScript 

## Demo
https://bridge-test-assessment.vercel.app/

## Installation

1. Clone the repository 
2. Install dependencies
3. Run the development server 

## Project Structure

1. assets - Includes assets, resources for the project.
2. Components - Includes Modular components for easy customization including custom table and pagination
3. pages - Includes main pages of the project
4. config - Includes main configuration variables of the project
5. services - Includes api endpoints of third-party APIs
6. store - Includes Redux store for state management

## Solutions for challenges
The main challenge was that there was no teamId parameter in the getplayers api to get a team roster.

For that, I got all players from the server and stored in the redux state management for filtering players in frontend part.
I sent getPlayers apis with a certain delay time and I used throttling for avoiding 429 error in the server.
It was an efficient way to reduce response time and avoid server errors(too many request error)


