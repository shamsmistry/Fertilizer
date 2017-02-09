/**
 * Helper file for handling operations like get files from server
 * child for downloadfile controller
 *
 * @class getfile
 */


/**
 * Requiring helper
 * @property helper
 * @type file
 */
var helper = require('../helpers/helpers');
/**
 * Requiring config file
 * @property config
 * @type file
 */
var config = require('../config/config');
/**
 * Requiring utility file
 * @property utility
 * @type file
 */
var utility = require('../helpers/utility');

/**
 * Requiring fs npm
 * @property fs
 * @type file
 */
var fs = require('fs');
/**
 * Requiring bluebird npm
 * @property promise
 * @type file
 */
var promise = require("bluebird");

//#####################################################################
//########### Functions for Getting Files from Servers ################
//#####################################################################

/**
 * Core function for fetching
 * the uploaded files from server
 *
 * @method fetchUploadedFiles_v1_0_0
 * @param {Number} id
 * @param {String} isThumb
 * @param {String} sizeType
 * @param {String} fileName
 * @return {Object} response
 */
exports.fetchUploadedFiles_v1_0_0 = function (req, id, isThumb, sizeType, fileName) {
    return new promise(function (resolve) {
        var model = require('../models');
        var getFilePath = null;
        var fileType = null;
        var fileContentType = null;
        var responseObject = {
            status: false,
            data: "",
            fileContentType: "",
            filePath: ""
        };
        if (sizeType != null) {
            sizeType = sizeType.toUpperCase();
        }
        sizeType = sizeType.toUpperCase();

        // Fetching Uploaded Files
        return model.user_file_uploads.findOne({
            where: {
                $and: [
                    {
                        id: id
                    },
                    {
                        status: 'ACTIVE'
                    }
                ]
            }
        })
            .then(function (data) {
                if (data != null) {
                    return new promise(function (resolveFile) {
                        fileType = data.dataValues.filetype;
                        //original file
                        if (isThumb == 'org' && sizeType == 'ORG' && fileType != 'AUDIO' && fileName != null) {
                            getFilePath = data.dataValues.path + fileName;
                            fileContentType = 'image';
                            resolveFile(getFilePath);
                        }
                        //thumbs
                        else if ((isThumb == 'thumb' && sizeType == 'SMALL' && fileName != null) || (isThumb == 'thumb' && sizeType == 'MEDIUM' && fileName != null) || (isThumb == 'thumb' && sizeType == 'LARGE' && fileName != null) || (isThumb == 'thumb' && sizeType == 'XLARGE' && fileName != null) || (isThumb == 'thumb' && sizeType == 'SQUARE' && fileName != null)) {
                            //now fetch from image thumb table
                            fileContentType = 'image';
                            return model.images_thumbs.findOne({
                                where: {
                                    $and: [
                                        {
                                            image_id: id
                                        },
                                        {
                                            sizetype: sizeType
                                        },
                                        {
                                            status: 'ACTIVE'
                                        }
                                    ]
                                }
                            }).then(function (thumbData) {
                                if (thumbData != null) {
                                    getFilePath = thumbData.dataValues.path + fileName;
                                    resolveFile(getFilePath);
                                } else {
                                    resolveFile(getFilePath);
                                }
                            });
                        }

                        // video compress files

                        else if ((isThumb == 'cmp' && sizeType == 'SD' && fileName != null) || (isThumb == 'cmp' && sizeType == 'HD' && fileName != null)) {
                            //now fetch from file compressions table
                            fileContentType = 'video';
                            return model.file_compressions.findOne({
                                where: {
                                    $and: [
                                        {
                                            file_id: id
                                        },
                                        {
                                            sizetype: sizeType
                                        },
                                        {
                                            status: 'ACTIVE'
                                        }
                                    ]
                                }
                            }).then(function (fileCompressData) {
                                if (fileCompressData != null) {
                                    getFilePath = fileCompressData.dataValues.path + fileName;
                                    resolveFile(getFilePath);
                                } else {
                                    resolveFile(getFilePath);
                                }
                            });
                        }

                        //videos thumbs

                        else if ((isThumb == 'thumb' && sizeType == '_1' && fileName != null) || (isThumb == 'thumb' && sizeType == '_2' && fileName != null) || (isThumb == 'thumb' && sizeType == '_3' && fileName != null) || (isThumb == 'thumb' && sizeType == '_4' && fileName != null)) {
                            //now fetch from image thumb table
                            fileContentType = 'image';
                            return model.images_thumbs.findOne({
                                where: {
                                    $and: [
                                        {
                                            image_id: id
                                        },
                                        {
                                            sizetype: sizeType
                                        },
                                        {
                                            status: 'ACTIVE'
                                        }
                                    ]
                                }
                            }).then(function (thumbData) {

                                if (thumbData != null) {
                                    getFilePath = thumbData.dataValues.path + fileName;
                                    console.log('getFilePath', getFilePath);
                                    resolveFile(getFilePath);
                                } else {
                                    resolveFile(getFilePath);
                                }
                            });
                        }

                        //audio file

                        else if (isThumb == 'org' && sizeType == 'ORG' && fileType == 'AUDIO' && fileName != null) {
                            getFilePath = data.dataValues.path + fileName;
                            fileContentType = 'audio';
                            resolveFile(getFilePath);
                        }

                        else {
                            resolveFile(getFilePath);
                        }
                    })
                        .then(function (getFilePath) {
                            if (getFilePath != null) {
                                fs.stat(getFilePath, function (err, stat) {
                                    if (err == null) {
                                        fs.readFile(getFilePath, function (err, file) {
                                            if (err) {
                                                console.log(' ======= Reading File Error  ======= ', err);
                                                responseObject.status = false;
                                                resolve(responseObject);
                                            }
                                            else {
                                                console.log(' ======= File is Exist  ======= ');
                                                if (fileContentType == 'image') {
                                                    responseObject.status = true;
                                                    responseObject.fileContentType = fileContentType;
                                                    responseObject.data = file;
                                                    resolve(responseObject);
                                                }
                                                //video file

                                                else if (fileContentType == 'video') {

                                                    //instering Audio / Video counts
                                                    /****======== Start of, Registering the Views / Listen of Video / Audio File =============***/
                                                    helper.getActiveSession_v1_0_0(req)
                                                        .then(function (sessionUser) {
                                                            //session is active, user has been authenticated
                                                            if (sessionUser.type == 'Recognized' || sessionUser.type == 'UnRecognized') {
                                                                utility.viewsCount_v1_0_0(sessionUser.uid, id, fileType, req)
                                                            }
                                                        }).error(function (err) {
                                                            console.log('error', err);
                                                        });
                                                    ///****======== End of, Registering the Views / Listen of Video / Audio File =============***/

                                                    responseObject.status = true;
                                                    responseObject.fileContentType = fileContentType;
                                                    responseObject.data = getFilePath;
                                                    resolve(responseObject);
                                                }
                                                else {
                                                    resolve(responseObject);
                                                }
                                            }
                                        });
                                    }
                                    else if (err.code == 'ENOENT') {
                                        console.log(' ======= Fetching File Error  ======= ', err.code);
                                        responseObject.status = false;
                                        resolve(responseObject);
                                    } else {
                                        console.log(' ======= Fetching File Error  ======= ', err);
                                        responseObject.status = false;
                                        resolve(responseObject);
                                    }
                                });
                            }
                            else {
                                console.log(' ======= No File Exist  ======= ');
                                resolve(responseObject);
                            }
                        });
                }
                else {
                    console.log(' ======= No File Exist  ======= ');
                    resolve(responseObject);
                }
            });
    })
        .then(function (result) {
            return result;
        });
};

/**
 * Core function for fetching
 * the downloading(from url meta) files
 * from server
 *
 * @method fetchDownloadedFiles_v1_0_0
 * @param {Number} id
 * @param {String} isThumb
 * @param {String} sizeType
 * @param {String} fileName
 * @return {Object} response
 */
exports.fetchDownloadedFiles_v1_0_0 = function (id, isThumb, sizeType, fileName) {
    return new promise(function (resolve) {
        var model = require('../models');
        var getFilePath = null;
        var responseObject = {
            status: false,
            data: "",
            fileContentType: "",
            filePath: ""
        };
        if (sizeType != null) {
            sizeType = sizeType.toUpperCase();
        }
        return model.fetched_url.findOne({
            where: {
                $and: [
                    {
                        id: id
                    },
                    {
                        status: 'ACTIVE'
                    }
                ]
            }
        }).then(function (data) {
            if (data != null) {
                if (isThumb == 'org' && sizeType == 'ORG' && fileName != null) {
                    getFilePath = data.dataValues.imagePath + fileName;
                } else if ((isThumb == 'thumb' && sizeType == 'SMALL' && fileName != null) || (isThumb == 'thumb' && sizeType == 'MEDIUM' && fileName != null) || (isThumb == 'thumb' && sizeType == 'LARGE' && fileName != null) || (isThumb == 'thumb' && sizeType == 'XLARGE' && fileName != null) || (isThumb == 'thumb' && sizeType == 'SQUARE' && fileName != null)) {
                    getFilePath = data.dataValues.thumbPath + fileName;
                }
                if (getFilePath != null) {
                    fs.stat(getFilePath, function (err, stat) {
                        if (err == null) {
                            fs.readFile(getFilePath, function (err, file) {
                                if (err) {
                                    console.log(' ======= Reading File Error  ======= ', err);
                                    resolve(responseObject);
                                }
                                else {
                                    console.log(' ======= File is Exist  ======= ');
                                    responseObject.status = true;
                                    responseObject.fileContentType = "image";
                                    responseObject.data = file;
                                    resolve(responseObject);
                                }
                            });
                        }
                        else if (err.code == 'ENOENT') {
                            console.log(' ======= Fetching File Error  ======= ', err.code);
                            resolve(responseObject);
                        }
                        else {
                            console.log(' ======= Fetching File Error  ======= ', err);
                            resolve(responseObject);
                        }
                    });
                }
                else {
                    console.log(' ======= No File Exist  ======= ');
                    resolve(responseObject);
                }
            }
            else {
                console.log(' ======= No File Exist  ======= ');
                resolve(responseObject);
            }
        });
    })
        .then(function (result) {
            return result;
        });
};

/**
 * Core function for fetching
 * default files from server
 *
 * @method fetchDefaultFiles_v1_0_0
 * @param {String}  imageOf
 * @param {String} isThumb
 * @param {String} sizeType
 * @param {String} fileName
 * @return {Object} response
 */
//function for reading all default files
exports.fetchDefaultFiles_v1_0_0 = function (imageOf, isThumb, sizeType, fileName) {
    var defaultFilesPath = config.path.uploadDir + config.path.defaultFilesDir; // global path
    var getFilePath = null;
    var responseObject = {
        status: false,
        data: "",
        fileContentType: "",
        filePath: ""
    };
    return new promise(function (resolve) {
        if (sizeType != null) {
            sizeType = sizeType.toUpperCase();
        }
        //profile
        if (imageOf == 'profile') {
            if (isThumb == 'org' && sizeType == 'ORG' && fileName != null) {
                getFilePath = defaultFilesPath + config.path.profileDir + config.defaultImages.profile;
                resolve(getFilePath);
            }
            else if (isThumb == 'thumb' && sizeType == 'SMALL' && fileName != null) {
                getFilePath = defaultFilesPath + config.path.profileDir + config.path.thumbDir + config.path.smallThumbDir + config.defaultImages.profile;
                resolve(getFilePath);
            }
            else if (isThumb == 'thumb' && sizeType == 'MEDIUM' && fileName != null) {
                getFilePath = defaultFilesPath + config.path.profileDir + config.path.thumbDir + config.path.mediumThumbDir + config.defaultImages.profile;
                resolve(getFilePath);
            }
            else if (isThumb == 'thumb' && sizeType == 'LARGE' && fileName != null) {
                getFilePath = defaultFilesPath + config.path.profileDir + config.path.thumbDir + config.path.largeThumbDir + config.defaultImages.profile;
                resolve(getFilePath);
            }
            else if (isThumb == 'thumb' && sizeType == 'SQUARE' && fileName != null) {
                getFilePath = defaultFilesPath + cconfig.path.profileDir + config.path.thumbDir + config.path.squareThumbDir + config.defaultImages.profile;
                resolve(getFilePath);
            }
        }
        //cover
        else if (imageOf == 'cover') {
            if (isThumb == 'org' && sizeType == 'ORG' && fileName != null) {
                getFilePath = defaultFilesPath + config.path.coverDir + config.defaultImages.cover;
                resolve(getFilePath);
            }
            else if (isThumb == 'thumb' && sizeType == 'SMALL' && fileName != null) {
                getFilePath = defaultFilesPath + config.path.coverDir + config.path.thumbDir + config.path.smallThumbDir + config.defaultImages.cover;
                resolve(getFilePath);
            }
            else if (isThumb == 'thumb' && sizeType == 'MEDIUM' && fileName != null) {
                getFilePath = defaultFilesPath + config.path.coverDir + config.path.thumbDir + config.path.mediumThumbDir + config.defaultImages.cover;
                resolve(getFilePath);
            }
            else if (isThumb == 'thumb' && sizeType == 'LARGE' && fileName != null) {
                getFilePath = defaultFilesPath + config.path.coverDir + config.path.thumbDir + config.path.largeThumbDir + config.defaultImages.cover;
                resolve(getFilePath);
            }
            else if (isThumb == 'thumb' && sizeType == 'SQUARE' && fileName != null) {
                getFilePath = defaultFilesPath + config.path.coverDir + config.path.thumbDir + config.path.squareThumbDir + config.defaultImages.cover;
                resolve(getFilePath);
            }
        }
        //goals
        else if (imageOf == 'goals') {
            if (isThumb == 'org' && sizeType == 'ORG' && fileName != null) {
                getFilePath = defaultFilesPath + config.path.goalDir + config.defaultImages.goal;
                resolve(getFilePath);
            }
            else if (isThumb == 'thumb' && sizeType == 'SMALL' && fileName != null) {
                getFilePath = defaultFilesPath + config.path.goalDir + config.path.thumbDir + config.path.smallThumbDir + config.defaultImages.goal;
                resolve(getFilePath);
            }
            else if (isThumb == 'thumb' && sizeType == 'MEDIUM' && fileName != null) {
                getFilePath = defaultFilesPath + config.path.goalDir + config.path.thumbDir + config.path.mediumThumbDir + config.defaultImages.goal;
                resolve(getFilePath);
            }
            else if (isThumb == 'thumb' && sizeType == 'LARGE' && fileName != null) {
                getFilePath = defaultFilesPath + config.path.goalDir + config.path.thumbDir + config.path.largeThumbDir + config.defaultImages.goal;
                resolve(getFilePath);
            }
            else if (isThumb == 'thumb' && sizeType == 'XLARGE' && fileName != null) {
                getFilePath = defaultFilesPath + config.path.goalDir + config.path.thumbDir + config.path.xlargeThumbDir + config.defaultImages.goal;
                resolve(getFilePath);
            }
            else if (isThumb == 'thumb' && sizeType == 'SQUARE' && fileName != null) {
                getFilePath = defaultFilesPath + config.path.goalDir + config.path.thumbDir + config.path.squareThumbDir + config.defaultImages.goal;
                resolve(getFilePath);
            }
        } else {
            resolve(getFilePath);
        }
    })
        .then(function (getFilePath) {
            return new Promise(function (innerResolve) {
                if (getFilePath != null) {
                    fs.stat(getFilePath, function (err, stat) {
                        if (err == null) {
                            fs.readFile(getFilePath, function (err, file) {
                                if (err) {
                                    console.log(' ======= Reading File Error  ======= ', err);
                                    //return responseObject;
                                    innerResolve(responseObject);
                                }
                                else {
                                    console.log(' ======= File is Exist  ======= ');
                                    responseObject.status = true;
                                    responseObject.fileContentType = "image";
                                    responseObject.data = file;
                                    innerResolve(responseObject);
                                }
                            });
                        } else if (err.code == 'ENOENT') {
                            console.log(' ======= Fetching File Error  ======= ', err.code);
                            innerResolve(responseObject);
                        } else {
                            console.log(' ======= Fetching File Error  ======= ', err);
                            innerResolve(responseObject);
                        }
                    });
                }
                else {
                    console.log(' ======= No File Exist  ======= ');
                    innerResolve(responseObject);
                }
            })
                .then(function (innerResult) {
                    return innerResult;
                });
        });
};