const AWS = require('aws-sdk');

AWS.config.update({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
    region: process.env.region
});

const rekognition = new AWS.Rekognition();

const s3 = new AWS.S3();

exports.uploadImage = (req) => {
    
    if(!req.file) return reject('Please input image!')

    return new Promise((resolve, reject) => {

        const params = {
            Bucket: process.env.BUCKET,
            Key: req.file.originalname, // File name you want to save as in S3
            Body: req.file.buffer
        };
        // Uploading files to the bucket
        s3.upload(params, function (err, data) {
            if (err) {
                return reject(err);
            }
            
            return resolve(`File uploaded successfully. ${data.Location}`);
        });
    })
}

exports.deleteImage = (image_name) => {

    return new Promise((resolve, reject) => {

        const params = {
            Bucket: process.env.BUCKET,
            Key: image_name, // File name you want to save as in S3
        };

        // Uploading files to the bucket
        s3.deleteObject(params, function (err, data) {
            if (err) {
                return reject(err);
            }
            return resolve(`Image successfuly deleted. ${data}`);
        });
    })
}

exports.detectText = (image_name) => {

    return new Promise((resolve, reject) => {
        
        var params = {
            Image: {
                S3Object: {
                    Bucket: process.env.BUCKET,
                    Name: image_name
                }
            }
        };

        rekognition.detectText(params, function (err, data) {
            if (err) return reject(err, err.stack);

            else {
                var allText = [];
                data.TextDetections.map(text => {
                    
                    allText.push({ Text: text.DetectedText, data:{ Type: text.Type, Id: text.Id }} );
                })
                // .then(() => {
                //     return resolve({ data: text, message: 'Successfuly scaning the image' })
                // })
                
                return resolve({ data: allText, message:'Successfuly scaning the image'})
            }
        })
    })
}