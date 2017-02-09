/**
 * Utility file contains all the utility functions
 *
 * @class utility
 */

/**
 * Requiring config file
 * @property config
 * @type file
 */
var config = require('../config/config');
/**
 * Requiring helper
 * @property helper
 * @type file
 */
var helper = require('../helpers/helpers');
/**
 * Requiring utility file
 * @property utility
 * @type file
 */
var utility = require('../helpers/utility');

/**
 * Requiring (bluebird) npm
 * @property promise
 * @type file
 */
var promise = require("bluebird");
/**
 * Requiring http npm
 * @property http
 * @type file
 */
var http = require('http');
/**
 * Requiring fs npm
 * @property fs
 * @type file
 */
var fs = require('fs');
/**
 * Requiring hashIds npm
 * @property hashIds
 * @type file
 */
var hashIds = require("hashids");
/**
 * Requiring path npm
 * @property path
 * @type file
 */
var path = require('path');
/**
 * Requiring request npm
 * @property request
 * @type file
 */
var request = require('request');

/**
 * Appending the http and https prefix
 * to the provided url only if it
 * is missing in url
 *
 * @method addHttp_v1_0_0
 * @param {String} url
 * @return {String} url
 */
exports.addHttp_v1_0_0 = function (url) {
    if (url.indexOf("http://") == 0 || url.indexOf("https://") == 0) {
        return url
    } else {
        return "http://" + url;
    }
};

//generate hashed key using hashId
//used in setting file name etc

/**
 * Generates the unique hash key
 * using hashids npm
 *
 * @method generateHashedKey_v1_0_0
 * @param {Number} id
 * @return {String} hashed id
 */
exports.generateHashedKey_v1_0_0 = function (id) {
    var hashId = new hashIds(config.encryption.salt, config.encryption.size);
    var timestamp = Math.floor(Date.now() / 1000);
    return hashId.encode(id, timestamp);
};

/**
 * Return the offset and pagination
 *
 * @method pagination
 * @param {Object} req
 * @return {Object}
 */
exports.pagination = function (req) {
    var errors = [];
    var limit;
    var offset;
    //offset
    if (req.query.offset == null || req.query.offset == undefined || req.query.offset == '' || req.query.offset == 0)
        offset = config.pagination.offset;
    else if (+req.query.offset)
        offset = req.query.offset;
    else
        errors.push(helper.generateErrorObject_v1_0_0(1001, 'offset', 'offset is not a valid integer'));

    //limit
    if (req.query.limit == null || req.query.limit == undefined || req.query.limit == '')
        limit = config.pagination.limit;
    else if (+req.query.limit)
        limit = req.query.limit;
    else
        errors.push(helper.generateErrorObject_v1_0_0(1001, 'limit', 'limit is not a valid integer'));

    if (errors.length != 0) {
        throw new Error({message: 'in pagination', details: errors});
    }
    else {
        var obj = {
            limit: parseInt(limit),
            offset: parseInt(offset)
        };
        return obj;
    }
};

/**
 * Get the file from remote server
 *
 * @method getFileFromRemoteServer_v1_0_0
 * @param {String} sourceUrl
 * @param {String} destinationPath
 * @return {Object} response
 */
exports.getFileFromRemoteServer_v1_0_0 = function (sourceUrl, destinationPath) {
    return new promise(function (resolve) {
        request.head(sourceUrl, function (err, res, body) {
            request(sourceUrl).pipe(fs.createWriteStream(destinationPath))
                .on('close', function () {
                    console.log(' ======= File is Successfully Fetched and Saved ======= ');
                    resolve(true);
                })
                .on('error', function (err) {
                    console.log(' ======= Error in Saving File ======= ', err);
                    resolve(false);
                })
        });
    })
        .then(function (result) {
            return result;
        });
};

/**
 * Extract the file name from file path
 *
 * @method extractFileName_v1_0_0
 * @param {String} filePath
 * @param {Number} pathLength
 * @return {Object} response
 */
exports.extractFileName_v1_0_0 = function (filePath, uploadPathLength) {
    var filePath = filePath || null;
    var pathLength = uploadPathLength || 0;
    if (filePath != null) {
        if (pathLength > 0) {
            var fileName = filePath.substring(pathLength);
            if (fileName != null || fileName != "") {
                fileName = fileName.split(".");
                if (fileName.length > 0 && fileName.length == 2) {
                    fileName = fileName[0];
                    return fileName;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        } else {
            return false;
        }
    }
    else {
        return false;
    }
};

/**
 * Extract the extension from giving fileName
 *
 * @method extractFileExtension_v1_0_0
 * @param {String} fileName
 * @return {Object} response
 */
exports.extractFileExtension_v1_0_0 = function (fileName) {
    var fileName = fileName || null;
    if (fileName != null) {
        var fileExtension = fileName.split(".");
        if (fileExtension.length > 0 && fileExtension.length == 2) {
            fileExtension = '.' + fileExtension[1];
            return fileExtension.toLowerCase();
        } else {
            return false;
        }
    }
    else {
        return false;
    }
};

/**
 * Extract the name and extension of Default Image File
 *
 * @method extractFileNameAndExtension_v1_0_0
 * @param {String} defaultFileName
 * @return {Object} response
 */
exports.extractFileNameAndExtension_v1_0_0 = function (defaultFileName) {
    var defaultFileName = defaultFileName || null;
    var responseObject = {
        name: null,
        extension: null
    };
    if (defaultFileName != null) {
        var defaultFileExtension = defaultFileName.split(".");
        if (defaultFileExtension.length > 0 && defaultFileExtension.length == 2) {
            defaultFileName = defaultFileExtension[0];
            defaultFileExtension = '.' + defaultFileExtension[1];
            responseObject.name = defaultFileName;
            responseObject.extension = defaultFileExtension;
            return responseObject;
        } else {
            return false;
        }
    }
    else {
        return false;
    }
};

/**
 * Removes the trailing slashes
 * from provided url
 *
 * @method removeTrailingSlashesFromUrl_v1_0_0
 * @param {String} url
 * @return {String} url
 */
exports.removeTrailingSlashesFromUrl_v1_0_0 = function (url) {
    return new promise(function (resolve) {
        resolve(url.rtrim('/'));
    })
        .then(function (result) {
            return result;
        });
};

/**
 * Generate unique file name
 * for Url Image
 *
 * @method generateFileNameForUrlImage_v1_0_0
 * @param {Number} id
 * @return {String} hashed key
 */
exports.generateFileNameForUrlImage_v1_0_0 = function () {
    return utility.generateHashedKey_v1_0_0(12345);
};

/**
 * Extract extension for image exist
 * in Url meta
 *
 * @method extractFileExtensionForUrlImage_v1_0_0
 * @param {String} image
 * @return {string} image
 */
exports.extractFileExtensionForUrlImage_v1_0_0 = function (image) {
    return path.extname(image).toLowerCase();
};

/**
 * Prototype for removing slashes
 * from url
 *
 * @method rtrim
 * @param {String} str
 * @return {String} response
 */
String.prototype.rtrim = function (str) {
    return this.replace(new RegExp(str + "*$"), '');
};