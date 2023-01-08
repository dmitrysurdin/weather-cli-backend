import chalk from "chalk";
import dedent from "dedent-js";

const printError = (error) => {
    console.log(`${chalk.bgRed(" ERROR ")} ${error}`);
};

const printSuccess = (message) => {
    console.log(`${chalk.bgGreenBright(" Success ")} ${message}`);
};

const printHelp = () => {
    console.log(dedent(`
    ${chalk.bgBlackBright("HELP")} 
    Без параметров - вывод погоды 
    -s [CITY] для устновка города
    -h для вывода помощи
    -t [API_KEY] для сохранения токена
    `));
};

const printForcast = (weather, icon) => {
    console.log(dedent(`
    ${chalk.bgGreenBright("WEATHER FORCAST")} 
    City: ${weather.name}
    Main: ${weather.weather[0].main} ${icon} 
    Description: ${weather.weather[0].description}
    Temperature: ${weather.main.temp}°C
    Feels like: ${weather.main.feels_like}°C
    Wind speed: ${weather.wind.speed}m/s 
    Humidity: ${weather.main.humidity}%
    `));
};

export { printError, printSuccess, printHelp, printForcast };