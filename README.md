# Strapi Heroku starter
Based on the [official Strapi docker repository](https://github.com/strapi/strapi-docker).

## Getting started
Install the required packages:
- [Install Docker](https://docs.docker.com/install/)
- Make sure you have docker-compose installed. It should be automatically installed with Docker. Check [here](https://docs.docker.com/compose/install/) for more details.
- [Install Node.js](https://nodejs.org/en/download/).

Running on your local development environment:
- Open a terminal in the project folder
- Run the command `docker-compose up`
- docker-compose automatically creates a database and installs Strapi
- Open localhost:1337 in your browser
- When you are finished developing, stop the local server with `docker-compose down`.

## Deploying to Heroku
Make sure that you've set up the local dev environment by following the instructions above and you've configured the content types in Strapi before deploying.
- Open a terminal in the project folder
- Run the command `node setup-heroku.js`
- Follow the prompts and wait for the script to finish
- Commit any changes you've made to git
- Run the command `git push heroku`
- Open the Heroku console and view your app!