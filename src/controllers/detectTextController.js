const DetectText = require('../helpers/detectText');
const {success, error} = require('../helpers/response');

exports.detectText = async (req, res) => {
    try {
        await DetectText.uploadImage(req);

        let result = await DetectText.detectText(req.file.originalname);
        
        await DetectText.deleteImage(req.file.originalname);
        
        success(res, result.data, 201, result.message);
    } catch (err) {
        error(res, err, 422)
    }
}