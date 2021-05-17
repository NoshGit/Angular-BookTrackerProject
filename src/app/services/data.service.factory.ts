import { DataService } from "./data.service";
import { LoggerService } from "./logger.service";

export function dataFactoryService(logger:LoggerService){
    let dataService: DataService = new DataService(logger);

    logger.log(`Logging this from Data Factory Service`);

    return dataService;
}