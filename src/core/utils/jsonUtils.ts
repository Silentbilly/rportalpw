import { APIResponse } from 'playwright';
import { logger } from '../../../playwright.config';
import Ajv2020 from "ajv/dist/2020";

export class JsonUtils {

    static async validateJsonSchema(jsonSchema: JSON, jsonReponse: APIResponse): Promise<boolean> {
        const ajv = new Ajv2020();
        const isValid = ajv.validate(jsonSchema, jsonReponse);

        logger.info('Validating Json schema');

        if (!isValid) {
            throw new Error('Json is not valid');
        }
        return isValid;
    }
}