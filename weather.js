#!/usr/bin/enc node
import { getArgs } from "./helpers/args.js";
import { getWeather, getIcon } from "./services/api.service.js";
import { printHelp, printSuccess, printError, printForcast } from "./services/log.service.js";
import { getKeyValue, saveKeyValue, TOKEN_DICTIONARY } from "./services/storage.service.js";

const saveToken = async (token) => {
    if (!token.length) {
        printError("No token");
        return;
    }
    try {
        await saveKeyValue("token", token);
        printSuccess("Token saved!");
    } catch (e) {
        printError(e.message);
    }
};

const saveCity = async (city) => {
    if (!city.length) {
        printError("No city");
        return;
    }
    try {
        await saveKeyValue(TOKEN_DICTIONARY.city, city);
        printSuccess("City saved!");
    } catch (e) {
        printError(e.message);
    }
};

const getForcast = async () => {
    try {
        const city = process.env.CITY ?? await getKeyValue(TOKEN_DICTIONARY.city);
        const weather = await getWeather(city);
        const iconCode = weather.weather[0].icon;
        const icon = getIcon(iconCode);
        printForcast(weather, icon);
    } catch (e) {
        if (e?.response?.status === 404) {
            printError("City is wrong");
        } else if (e?.response?.status === 401) {
            printError("Token is wrong");
        } else {
            printError(e.message);
        }
    }
};
const initCLI = () => {
    const args = getArgs(process.argv);
    if (args.h) {
        return printHelp();
    }

    if (args.s) {
        return saveCity(args.s);
    }

    if (args.t) {
        return saveToken(args.t);
    }

    return getForcast();
};

initCLI();