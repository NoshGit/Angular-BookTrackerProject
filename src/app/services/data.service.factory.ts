import { HttpClient } from "@angular/common/http";
import { DataService } from "./data.service";
import { LoggerService } from "./logger.service";

export function dataFactoryService(logger:LoggerService, http: HttpClient){
    let dataService: DataService = new DataService(logger, http);

    logger.log(`Logging this from Data Factory Service`);

    return dataService;
}