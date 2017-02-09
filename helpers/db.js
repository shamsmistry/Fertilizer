/**
 * Helper file for Handling all the database operations
 *
 * @class db
 */

/**
 * Requiring dbHelper helper
 * @property dbHelper
 * @type file
 */
var dbHelper = require('../helpers/db');
/**
 * Requiring helper
 * @property helper
 * @type file
 */
var helper = require('../helpers/helpers');
/**
 * Requiring dbConnection helper
 * @property dbConnection
 * @type file
 */
var dbConnection = require('../helpers/dbConnection');
/**
 * Requiring config file
 * @property config
 * @type file
 */
var config = require('../config/config');
/**
 * Requiring bluebird npm
 * @property promise
 * @type file
 */
var promise = require("bluebird");

//#####################################################################
//########### Data Insertion Functions ################################
//#####################################################################


/**
 * Save uploaded file information to database
 *
 * @method saveFileToDatabase_v1_0_0
 * @param {Object} uploadedFileProperties
 * @param {String} albumId
 * @param {String} imageType
 * @param {String} parentId
 */
exports.saveFileToDatabase_v1_0_0 = function (uploadedFileProperties, albumId, imageType, parentId) {
    return dbHelper.insertIntoUserUploadFileTable_v1_0_0(uploadedFileProperties, albumId, imageType, parentId)
        .then(function (result) {
            return result;
        });
};

/**
 * To insert original file information
 * in user_file_uploads table
 *
 * @method insertIntoUserUploadFileTable_v1_0_0
 * @param uploadedFileProperties
 * @param albumId
 * @param imageType
 * @param parentId
 * @return {Object} response
 */
exports.insertIntoUserUploadFileTable_v1_0_0 = function (uploadedFileProperties, albumId, imageType, parentId) {
    return new promise(function (resolve) {
        //var tableUserFileUploads = objAllTables.user_file_uploads.user_file_uploads();
        var model = require('../models');
        var path = null;

        if (uploadedFileProperties.fileType == 'IMAGE' || uploadedFileProperties.fileType == 'VIDEO') {
            //since it not contains audios separate folders
            path = uploadedFileProperties.orgFileDirPath;
        } else if (uploadedFileProperties.fileType == 'AUDIO') {
            path = uploadedFileProperties.thumbDirPath;
        }
        //path += path.replace(config.path.rootPath, '');
        return model.user_file_uploads.create({
            uid: uploadedFileProperties.uId,
            parent_id: parentId,
            album_id: albumId,
            post_id: null,
            parent_type: uploadedFileProperties.fileOf,
            media_url: uploadedFileProperties.fileName,
            filetype: uploadedFileProperties.fileType,
            extension: uploadedFileProperties.fileExt,
            width: uploadedFileProperties.width,
            height: uploadedFileProperties.height,
            duration: uploadedFileProperties.duration,
            videothumbextension: uploadedFileProperties.videoThumbExtension,
            path: path,
            status: 'ACTIVE',
            created: helper.getUnixTimeStamp_v1_0_0()
        }).then(function (data) {
            if (data != null) {
                console.log(' ======= Original File Info saved to Database Successfully  ======= ');
                if (uploadedFileProperties.fileType == 'IMAGE') {
                    //add entry in images thumb table
                    return new promise(function (resolve) {
                        dbHelper.insertIntoImageThumbsTable_v1_0_0(data.dataValues.id, uploadedFileProperties, imageType)
                            .then(function (bulkData) {
                                resolve(bulkData);
                            });
                    }).then(function (bulkData) {
                            if (bulkData != null) {
                                resolve(data);
                            } else {
                                resolve(null);
                            }
                        });
                }
                else if (uploadedFileProperties.fileType == 'VIDEO') {
                    //add entry in images thumb and file compressions table
                    return new promise(function (resolve) {
                        dbHelper.insertIntoImageThumbsTable_v1_0_0(data.dataValues.id, uploadedFileProperties, imageType)
                            .then(function (bulkData) {
                                resolve(bulkData);
                            });
                    }).then(function (bulkData) {
                            if (bulkData != null) {
                                resolve(data);
                            } else {
                                resolve(null);
                            }
                        })
                }
                else {
                    resolve(data)
                }

            }
            else {
                console.log(' ======= Failed to Save Original File Info in Database  ======= ');
                throw new Error(null);
            }
        })

    })
        .then(function (data) {
            return data;
        })
        .catch(function () {
            return null;
        });
};

/**
 * To insert thumbnails information in
 * images_thumbs table
 *
 * @method insertIntoImageThumbsTable_v1_0_0
 * @param id
 * @param uploadedFileProperties
 * @param imageType
 * @return {Object} response
 */
exports.insertIntoImageThumbsTable_v1_0_0 = function (id, uploadedFileProperties, imageType) {
    var model = require('../models');
    var promiseFor = promise.method(function (condition, action, value) {
        if (!condition(value)) return value;
        return action(value).then(promiseFor.bind(null, condition, action));
    });
    return new promise(function (resolve) {
        if (uploadedFileProperties.fileType == 'IMAGE') {
            var objLength = 0;
            var thumbArray = [];
            var sizeType = null;
            var thumbPath = null;

            if (uploadedFileProperties.fileOf == 'USERPROFILE' || uploadedFileProperties.fileOf == 'USERCOVER' || uploadedFileProperties.fileOf == 'POST' || uploadedFileProperties.fileOf == 'COMMENT' || uploadedFileProperties.fileOf == 'DEFAULTUSERPROFILE' || uploadedFileProperties.fileOf == 'DEFAULTUSERCOVER' || uploadedFileProperties.fileOf == 'CONTRIBUTE') {
                objLength = config.thumbNames.profile.length;
            }
            else if (uploadedFileProperties.fileOf == 'GOAL' || uploadedFileProperties.fileOf == 'DEFAULTGOAL') {
                objLength = config.thumbNames.goal.length;
            }
            else if (uploadedFileProperties.fileOf == 'CATEGORY' || uploadedFileProperties.fileOf == 'SUBCATEGORY' || uploadedFileProperties.fileOf == 'BANNER') {
                objLength = config.thumbNames.categories.length;
            }
            else if (uploadedFileProperties.fileOf == 'LIBRARY') {
                if (imageType == 'albumprofile') {
                    objLength = config.thumbNames.profile.length;
                }
                else if (imageType == 'albumcover') {
                    objLength = config.thumbNames.cover.length;
                }
                else if (imageType == 'albumgoal') {
                    objLength = config.thumbNames.goal.length;
                }
            }

            promiseFor(function (counter) {
                    return counter < objLength;
                },
                function (counter) {
                    return new promise(function (resolve) {
                        if (uploadedFileProperties.thumbDirNames[counter] == 'small') {
                            sizeType = 'SMALL';
                            thumbPath = uploadedFileProperties.thumbDirPath + config.path.smallThumbDir;
                        } else if (uploadedFileProperties.thumbDirNames[counter] == 'medium') {
                            sizeType = 'MEDIUM';
                            thumbPath = uploadedFileProperties.thumbDirPath + config.path.mediumThumbDir;
                        } else if (uploadedFileProperties.thumbDirNames[counter] == 'large') {
                            sizeType = 'LARGE';
                            thumbPath = uploadedFileProperties.thumbDirPath + config.path.largeThumbDir;
                        } else if (uploadedFileProperties.thumbDirNames[counter] == 'xlarge') {
                            sizeType = 'XLARGE';
                            thumbPath = uploadedFileProperties.thumbDirPath + config.path.xlargeThumbDir;
                        } else if (uploadedFileProperties.thumbDirNames[counter] == 'square') {
                            sizeType = 'SQUARE';
                            thumbPath = uploadedFileProperties.thumbDirPath + config.path.squareThumbDir;
                        }
                        thumbArray.push({
                            image_id: id,
                            'path': thumbPath,
                            'width': uploadedFileProperties.thumbSizes[counter].width,
                            'height': uploadedFileProperties.thumbSizes[counter].height,
                            'sizetype': sizeType,
                            'thumbtype': 'IMAGETHUMB',
                            'status': 'ACTIVE',
                            'created': helper.getUnixTimeStamp_v1_0_0()
                        });
                        resolve(thumbArray);
                    }).then(function () {
                            return ++counter;
                        });

                }, 0)
                .then(function () {
                    model.images_thumbs.bulkCreate(thumbArray).then(function (bulkData) {
                        if (bulkData != null) {
                            console.log(' ======= Thumbnails Info Info saved to Database Successfully  ======= ');
                            resolve(bulkData);
                        } else {
                            console.log(' ======= Thumbnails Info Failed to save in Database ======= ');
                            throw new Error(null);
                        }
                    });
                });
        }
        else if (uploadedFileProperties.fileType == 'VIDEO') {
            var objLength = config.videoConfig.thumbCount;
            var thumbArray = [];
            promiseFor(function (counter) {
                return counter < objLength;
            }, function (counter) {
                return new promise(function (resolve) {
                    var sizeType = null;
                    if (counter == 0) {
                        sizeType = '_1';
                    } else if (counter == 1) {
                        sizeType = '_2';
                    }
                    else if (counter == 2) {
                        sizeType = '_3';
                    }
                    else if (counter == 3) {
                        sizeType = '_4';
                    }

                    var videoFilePath = uploadedFileProperties.orgFileDirPath + config.videoConfig.dirName + '/';
                    var thumbPath = videoFilePath + 'thumb/';
                    thumbArray.push({
                        image_id: id,
                        'path': thumbPath,
                        'width': config.videoConfig.thumbsDimensions.width,
                        'height': config.videoConfig.thumbsDimensions.height,
                        'sizetype': sizeType,
                        'thumbtype': 'VIDEOTHUMB',
                        'status': 'ACTIVE',
                        'created': helper.getUnixTimeStamp_v1_0_0()
                    });
                    resolve(thumbArray);
                }).then(function () {
                        return ++counter;
                    });

            }, 0).then(function () {
                model.images_thumbs.bulkCreate(thumbArray).then(function (bulkData) {
                    if (bulkData != null) {
                        // Add video compression information in database
                        return new promise(function (resolve) {
                            return dbHelper.insertIntoFileCompressionsTable_v1_0_0(id, uploadedFileProperties)
                                .then(function (compressData) {
                                    resolve(compressData);
                                });
                        }).then(function (compressData) {
                                if (compressData != null) {
                                    resolve(compressData);
                                } else {
                                    resolve(null);
                                }
                            });
                    } else {
                        resolve(bulkData);
                    }
                })
            });
        }
    })
        .then(function (data) {
            return (data);
        })
        .catch(function () {
            return null;
        });
};

/**
 * To insert sd and hd video information in
 * file_compressions table
 *
 * @method insertIntoFileCompressionsTable_v1_0_0
 * @param id
 * @param uploadedFileProperties
 * @return {Object} response
 */
exports.insertIntoFileCompressionsTable_v1_0_0 = function (id, uploadedFileProperties) {
    var promiseFor = promise.method(function (condition, action, value) {
        if (!condition(value)) return value;
        return action(value).then(promiseFor.bind(null, condition, action));
    });
    return new promise(function (resolve) {
        var objLength = 0;
        if (uploadedFileProperties.height > 720) {
            objLength = uploadedFileProperties.compressTypes.length;
        } else {
            objLength = 1;
        }
        var compressionArray = [];
        promiseFor(function (counter) {
            return counter < objLength;
        }, function (counter) {
            return new promise(function (resolve) {
                var sizeType = null;
                var videoCompressPath = null;
                var videoFilePath = uploadedFileProperties.orgFileDirPath + config.videoConfig.dirName + '/';
                if (uploadedFileProperties.thumbSizes[counter].width == 640 && uploadedFileProperties.thumbSizes[counter].height == 320) {
                    sizeType = 'SD';
                    videoCompressPath = videoFilePath + config.path.sdDir;
                } else if (uploadedFileProperties.thumbSizes[counter].width == 1280 && uploadedFileProperties.thumbSizes[counter].height == 720) {
                    sizeType = 'HD';
                    videoCompressPath = videoFilePath + config.path.hdDir;
                } else {
                    sizeType = 'SD';
                    videoCompressPath = videoFilePath + config.path.sdDir;
                }
                videoCompressPath = videoCompressPath.replace(config.path.rootPath, '');
                compressionArray.push({
                    'file_id': id,
                    'path': videoCompressPath,
                    'width': uploadedFileProperties.thumbSizes[counter].width,
                    'height': uploadedFileProperties.thumbSizes[counter].height,
                    'sizetype': sizeType,
                    'status': 'ACTIVE',
                    'created': helper.getUnixTimeStamp_v1_0_0()
                });
                resolve(compressionArray);
            }).then(function () {
                    return ++counter;
                });

        }, 0).then(function () {
            //var tableFileCompressions = objAllTables.file_compressions.file_compressions();
            var model = require('../models');
            model.file_compressions.bulkCreate(compressionArray)
                .then(function (bulkData) {
                    if (bulkData != null) {
                        console.log(' ======= SD and HD Info Info saved to Database Successfully  ======= ');
                        resolve(bulkData);
                    } else {
                        console.log(' ======= SD and HD Info Failed to save in Database ======= ');
                        throw new Error(null);
                    }
                });
        });
    })
        .then(function (data) {
            return (data);
        })
        .catch(function () {
            return null;
        });
};

/**
 * To insert fetched url meta information in
 * fetched_url_data table
 *
 * @method insertIntoFetchedUrlDataTable_v1_0_0
 * @param client
 * @param urlProvider
 * @param links
 * @param urlImageProperties
 * @return {Object} response
 */
exports.insertIntoFetchedUrlDataTable_v1_0_0 = function (client, urlProvider, links, urlImageProperties) {
    return new promise(function (resolve) {
        var model = require('../models');
        model.fetched_url.create({
            url: client.url,
            scheme: client.scheme,
            host: client.host,
            rootUrl: client.rootUrl,
            title: client.title,
            links: links,
            author: client.author,
            keywords: null,
            charset: client.charset,
            description: client.description,
            feeds: null,
            ogTitle: client.ogTitle,
            ogDescription: client.ogDescription,
            imageUrl: client.image,
            imagePath: urlImageProperties.imagePath,
            imageName: urlImageProperties.imageName,
            imageExtension: urlImageProperties.imageExtension,
            imageThumbSize: urlImageProperties.thumbSize,
            imageThumbWidth: urlImageProperties.thumbWidth,
            imageThumbHeight: urlImageProperties.thumbHeight,
            thumbPath: urlImageProperties.thumbPath,
            status: 'ACTIVE',
            updated: helper.getUnixTimeStamp_v1_0_0(),
            created: helper.getUnixTimeStamp_v1_0_0(),
            provider: urlProvider
        })
            .then(function (result) {
                if (result != null) {
                    console.log(' ======= URL info Save to Database Successfully ======= ');
                    resolve(result);
                } else {
                    console.log(' ======= URL info Failed to Save in Database  ======= ');
                    resolve(false);
                }
            })
            .error(function () {
                resolve(false);
            });
    })
        .then(function (result) {
            return result;
        });
};

/**
 * To insert user's location in
 * location table
 *
 * @method insertLocation_v1_0_0
 * @param req
 * @return {Object }response
 */
exports.insertLocation_v1_0_0 = function (req) {
    try {
        var model = require('../models');
        var clientIP = "39.48.105.18";
        var maxmind = require('maxmind');
        var path = config.maxmind.path;
        maxmind.init(path);
        var locationObj = maxmind.getLocation(clientIP);
        return model.location.create({
            ip: clientIP,
            countryCode: locationObj.countryCode,
            countryName: locationObj.countryName,
            region: locationObj.region,
            city: locationObj.city,
            postalCode: locationObj.postalCode,
            latitude: locationObj.latitude,
            longitude: locationObj.longitude,
            dmaCode: locationObj.dmaCode,
            areaCode: locationObj.areaCode,
            metroCode: locationObj.metroCode,
            continentCode: locationObj.continentCode,
            regionName: locationObj.regionName
        })
            .then(function (row) {
                return row.id;
            })
            .error(function () {
                return null;
            });
    }
    catch (err) {
        new promise(function () {
            return null;
        });
    }
};

//#####################################################################
//################# Data Get Functions ################################
//#####################################################################

/**
 * To return the default album id on
 * behalf of provided user and file type
 *
 * @method getUserDefaultAlbumId_v1_0_0
 * @param {Number} uId
 * @param {String} fileType
 * @param {String} generatedBy
 * @param {String} belongsTo
 * @return {Object }response
 */
//returns the album id, of user id and file type provided
exports.getUserDefaultAlbumId_v1_0_0 = function (uId, fileType, generatedBy, belongsTo) {
    var model = require('../models');
    return model.album.find({
        where: {
            $and: [
                {
                    uid: uId
                },
                {
                    name: fileType
                },
                {
                    gen_by: generatedBy
                    //gen_by: 'SYSTEM'
                },
                {
                    belongs_to: belongsTo
                    //belongs_to: 'DEFAULT'
                }
            ]
        }
    }).then(function (albumData) {
        if (albumData != null) {
            if (albumData['dataValues']['id'] > 0) {
                return albumData['dataValues']['id'];
            } else {
                return false;
            }
        } else {
            return false;
        }
    }).catch(function () {
        return false;
    });
}
