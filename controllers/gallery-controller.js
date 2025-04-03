const express = require('express');
const router = express.Router();
const path = require('path');
const fs = require('fs');
const fsPromises = require('fs').promises;
const { encode } = require('blurhash');
const sharp = require("sharp");

const multerImgUpload = require('../utils/multer-img-upload');
const galleryService = require('../api-services/gallery-service');
const { verifyAccessToken } = require('../middleware/jwt');
const { routePositiveNumberMiscParamSchema } = require('../schema/yup-schemas/request-params');

const uploadIMG = async (req, res) => {
    if(!req.file){
        return res.status(400).json({'message': "No File attached"});
    }
    try {
        const encodedHash = await encodeImageToBlurhash(path.join(__dirname, "..", "gallery", req.file.filename));
        await sharp(path.join(__dirname, "..", "gallery", req.file.filename))
            /*  when you resize/compress an image, the exif data is lost. 
                The exif data includes the correct orientation of the image
                Fortunately sharp does have a feature that does retain the exif data, .withMetadata()
                ref: https://stackoverflow.com/questions/48716266/sharp-image-library-rotates-image-when-resizing*/
            .withMetadata() 
            .toFormat("jpeg", { mozjpeg: true })
            .toFile(path.join(__dirname, "..", "gallery", req.file.filename));
        await galleryService.upload(encodedHash, req.file.filename);
        res.status(200).json({'message': 'Image upload successful'});
    } catch (error) {
        cleanUpFileUpload(req.file);
        return res.status(400).json({'message': error.message});
    }
};

const viewGallery = async (req, res) => {
    //  blur hash images in the gallery folder and save info in imgs db table
    //  read files in the gallery dir
    try {
        res.status(200).json(await galleryService.getAll());
    } catch (error) {
        return res.status(400).json({'message': error.message});
    }
    
};

const getImg = async (req, res) => {
    const fs = require("fs");
    
    const filePath = path.join(__dirname, "..", "gallery", req.params.filename);
    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).json({'message': "File Not Found"});
    }
};

const deleteImg = async (req, res) => {
    try {
        routePositiveNumberMiscParamSchema.validateSync(req.params.id);
        const filename = await galleryService.deleteImg(req.params.id);
        if(fs.existsSync(path.join(__dirname, "..", "gallery", filename)) ){
            await fsPromises.unlink(path.join(__dirname, "..", "gallery", filename));
        }
        res.status(200).json({'message': 'File Operation successful'});
    } catch (error) {
        res.status(400).json({'message': error.message});
    }
}

// PRIVATE METHODS
'=================================='
const encodeImageToBlurhash = async img => {
    //  
    /*  ref: https://blog.opinly.ai/image-optimisation-with-sharp-in-nodejs/
        https://www.digitalocean.com/community/tutorials/how-to-process-images-in-node-js-with-sharp
        https://hamon.in/blog/blurhash/
        https://harshpathak.hashnode.dev/creating-mesmerizing-visual-experiences-a-beginners-guide-to-image-blurring-with-blurhash
    */
    const { data, info } = await sharp(img).ensureAlpha().raw().toBuffer({
        resolveWithObject: true,
    });

    const encoded = encode(
        new Uint8ClampedArray(data),
        info.width,
        info.height,
        4,
        4
    );

    return {
        hash: encoded,
        height: info.height,
        width: info.width,
    };
};

const cleanUpFileUpload = async (file) => {
    // possibility of successful file upload
    // handle file delete in case of multer file upload
    if(file && fs.existsSync(path.join(__dirname, "..", "gallery", file.filename)) ){
        await fsPromises.unlink(path.join(__dirname, "..", "gallery", file.filename));
    }
};

router.route('/all').get( viewGallery );
router.route('/upload').post( verifyAccessToken, multerImgUpload, uploadIMG );
router.route('/delete/:id').put( verifyAccessToken, deleteImg );
router.route('/:filename').get( getImg );

module.exports = router;