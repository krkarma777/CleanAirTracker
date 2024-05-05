![image](https://github.com/krkarma777/CleanAirTracker/assets/149022496/75fac6c7-59e5-4fb8-9974-49e20db7dbb0)

# Clean Air Tracker

## Project Description

Clean Air Tracker is a website that utilizes the AirKorea OpenAPI from the Korea Environment Corporation to provide real-time air quality information, including particulate matter, fine particulate matter, and ozone. The website is developed using Express, TypeScript, Svelte, PostgreSQL, and TypeORM. Through this site, users can easily check the current air quality status of various regions across the country

## Features
- **Real-Time Air Quality Information**: Users can view real-time air quality information for selected locations.
- **Database Storage**: Collected air quality data is stored in a database, providing historical data access.
- **Automatic Data Updates**: Air quality data is automatically updated at set intervals.

## Getting Started
This section details the prerequisites and installation steps needed to get the project running locally.

### Prerequisites
- Node.js (v14 or higher)
- npm (Node Package Manager)
- TypeScript
- TypeORM
- PostgreSQL or a compatible SQL database

### Installation
1. Clone the project:
   ```bash
   git clone https://github.com/krkarma777/CleanAirTracker.git
   cd [Cloned Directory Name]
   ```
2. Install necessary packages:
    ```bash
    npm install
    ```
3. Create an environment configuration file (.env):
     ```
     # .env
    API_KEY=[Your API key]
    ```
4. Configure the database connection:
   Add the `ormconfig.js` file to the root of your project directory with the following content:
   ```javascript
   module.exports = {
       type: "postgres",
       host: "localhost",
       port: 5432,
       username: "CleanAirTracker",
       password: "root",
       database: "CleanAirTracker",
       synchronize: true, // Note: set this to false in production to avoid unintended data loss
       logging: false,
       entities: [
           "dist/**/*.entity.js" // Ensure this path matches your compiled files
       ]
   }
This configuration sets up the database connection for your PostgreSQL database. Adjust the settings as necessary to match your environment.

5. Start the application:
  To run the server locally, use the following command:
  ```
  npm start
  ```

## Usage
After starting the server, navigate to `http://localhost:3000` in your web browser to view the Clean Air Tracker site. You can interact with the real-time data and explore different regions' air quality metrics.

## Contributing
Contributions to Clean Air Tracker are welcome. Please consider the following steps:
1. Fork the repository.
2. Create a new branch (`git checkout -b feature-branch`).
3. Make your changes.
4. Commit your updates (`git commit -am 'Add some feature'`).
5. Push to the branch (`git push origin feature-branch`).
6. Submit a pull request.

## Acknowledgments
- Thanks to the Korea Environment Corporation for providing the AirKorea OpenAPI.
- Special thanks to everyone who has contributed to the project.
