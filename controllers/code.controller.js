const { respond, respondWithException } = require('../loader').helpers
const { codeTransformer } = require('../transformers/code.transformer')
const LanguagesData = require('../enums/supportedLanguages');
const codeService = require('../services/code.service')
const { isValidForExecute } = require('../validators/code.validator')

const execute = async (req, res) => {
    try {
        const validatedData = await isValidForExecute(req.body)
        console.log(validatedData);
        const responseBody = await codeService.execute(validatedData, res)
        return respond(res, responseBody.statusCode, codeTransformer.transform(responseBody))
    } catch (error) {
        respondWithException(res, error)
    }
}
const Languages = async (req, res) => {
    try {
        let languages = [];
        Object.entries(LanguagesData).map((element, index) => {
            languages.push({ id: index, Language: element[1] });
        });
        return res.status(200).json({ languages });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Internal Server Error' });
    }
};

module.exports = {
    execute,
    Languages
}
