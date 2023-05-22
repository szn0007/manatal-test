# News Application

This repository contains a front-end application built with Vue.js (Vuetify Framework) that allows users to view news articles from various websites. The application utilizes the NewsAPI to fetch the latest news data.

## About The Application

1. News articles from various sources: Fetches news articles from different sources using the NewsAPI.

2. Vue Router: Implements Vue Router to enable navigation between different views within the application i.e. Home page and News detail page.

3. Vuetify: Utilizes Vuetify, a Material Design component framework, to create a visually appealing user interface with pre-built UI components.

4. Vuex: Implements Vuex, a state management pattern and library for Vue.js, to manage the application's state and data flow. Vuex-Persist is also used with Local Forage to store state of the application to persisted storage - localstorage.

5. Airbnb JavaScript Style Guide: The code in this project follows the Airbnb JavaScript style guide, ensuring consistent and readable code.

6. Jest: Unit testing using the most popular framework.

## Clone the repository:
```
git clone https://github.com/szn0007/manatal-test.git
```

## Project setup
```
cd manatal-test
npm install
```

### Configure .env file:

```
Sign up for an API key at NewsAPI and replace the placeholder API key in the .env with your own key. Or use below API Key:

VUE_APP_API_KEY=27da6db7a5df4f2285812f85096e52cd

```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Run unit test
```
npm run test:unit
```

### Directory Structured
```

├── public/                  # Public assets and index.html
├── src/                     # Source code
│   ├── assets/              # Application assets such as images
│   ├── components/          # Reusable Vue components
│   ├── views/               # Application views
│   ├── router/              # Handles rounting in the application
│   ├── services/            # Services for fetching news data
│   ├── store/               # Vuex store modules for state management
│   ├── App.vue              # Root component
│   └── main.js              # Entry point
│   └── event-bus.js         # Default Vue global pipeline that triggers and receive events
│   ├── mixins/              # To distribute reusable functionalities for Vue components
├── tests/                   # Unit tests using Jest
├── .gitignore               # Git ignore configuration
├── package.json             # NPM dependencies and scripts
├── jest.config.js           # Jest configuration
├── Dockerfile               # Docker file
├── docker-compose.yml       # Docker compose file
└── README.md                # Project readme (you're reading it!)
```
