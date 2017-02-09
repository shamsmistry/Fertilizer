/**
 * Controller for handling all the downloading files like stuff
 *
 * @class downloadfile
 */


/**
 * Requiring Media model
 * @property Media
 * @type file
 */
var Media = require('../models/Media');
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
 * Requiring getFileHelper helper
 * @property getFileHelper
 * @type file
 */
var getFileHelper = require('../helpers/getfile');
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
 * Requiring request npm
 * @property request
 * @type file
 */
var request = require('request');
/**
 * Requiring path npm
 * @property path
 * @type file
 */
var path = require('path');
/**
 * Requiring metaInspector npm
 * @property metaInspector
 * @type file
 */
var metaInspector = require('node-metainspector');
/**
 * Requiring bluebird npm
 * @property promise
 * @type file
 */
var promise = require("bluebird");

/**
 * Returns the Uploaded Files
 *
 * @method getUploadedFiles_v1_0_0
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
exports.getUploadedFiles_v1_0_0 = function (req, res) {
    var id = req.params.id || null;
    var isThumb = req.params.isthumb || null;
    var sizeType = req.params.sizetype || null;
    var fileName = req.params.filename || null;
    if (id != null) {
        return getFileHelper.fetchUploadedFiles_v1_0_0(req, id, isThumb, sizeType, fileName)
            .then(function (response) {
                if (response.status != false) {
                    if (response.fileContentType == 'image') {
                        res.writeHead(200, {'Content-Type': response.fileContentType});
                        res.end(response.data);
                        return;
                    }
                    else if (response.contentType == 'VIDEO') {
                        var path = response.data;
                        var stat = fs.statSync(path);
                        var totalDuration = stat.size;
                        if (req.headers['range']) {
                            var range = req.headers.range;
                            var parts = range.replace(/bytes=/, "").split("-");
                            var partialStart = parts[0];
                            var partialEnd = parts[1];

                            var startRange = parseInt(partialStart, 10);
                            var endRange = partialEnd ? parseInt(partialEnd, 10) : totalDuration - 1;
                            var chunkSize = (endRange - startRange) + 1;

                            console.log('The Range  is : ' + startRange + ' - ' + endRange + ' = ' + chunkSize);

                            var file = fs.createReadStream(path, {start: startRange, end: endRange});
                            res.writeHead(206, {
                                'Content-Range': 'bytes ' + startRange + '-' + endRange + '/' + totalDuration,
                                'Accept-Ranges': 'bytes',
                                'Content-Length': chunkSize,
                                'Content-Type': 'video/' + config.ffmpegConfig.videoFormat
                            });
                            file.pipe(res);
                        } else {
                            console.log('ALL Duration: ' + totalDuration);
                            res.writeHead(200, {
                                'Accept-Ranges': 'bytes',
                                'Content-Length': totalDuration,
                                'Content-Type': 'video/' + config.ffmpegConfig.videoFormat
                            });
                            console.log('File is Streaming');
                            fs.createReadStream(path).pipe(res);
                        }
                    }
                    else {
                        res.send(401, {meta: {status: 401, message: 'File does not exist'}});
                    }
                } else {
                    res.send(401, {meta: {status: 401, message: 'File does not exist'}});
                }
            });
    } else {
        res.send(401, {meta: {status: 401, message: 'File does not exist'}});
    }
};

/**
 * Returns the Downloaded Files
 *
 * @method getDownloadedFiles_v1_0_0
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
exports.getDownloadedFiles_v1_0_0 = function (req, res) {
    var id = req.params.id || null;
    var isThumb = req.params.isthumb || null;
    var sizeType = req.params.sizetype || null;
    var fileName = req.params.filename || null;
    if (id != null) {
        return getFileHelper.fetchDownloadedFiles_v1_0_0(id, isThumb, sizeType, fileName)
            .then(function (response) {
                if (response.status != false) {
                    if (response.fileContentType == 'image') {
                        res.writeHead(200, {'Content-Type': response.fileContentType});
                        res.end(response.data);
                    } else {
                        res.send(401, {meta: {status: 401, message: 'File does not exist'}});
                    }
                } else {
                    res.send(401, {meta: {status: 401, message: 'File does not exist'}});
                }
            });
    }
    else {
        res.send(401, {meta: {status: 401, message: 'File does not exist'}});
    }
};

/**
 * Returns the Default Files
 *
 * @method getDefaultFiles_v1_0_0
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
exports.getDefaultFiles_v1_0_0 = function (req, res) {
    var imageOf = req.params.of;
    var isThumb = req.params.isthumb || null;
    var sizeType = req.params.sizetype || null;
    var fileName = req.params.filename || null;
    if (imageOf != null) {
        return getFileHelper.fetchDefaultFiles_v1_0_0(imageOf, isThumb, sizeType, fileName)
            .then(function (response) {
                if (response.status != false) {
                    if (response.fileContentType == 'image') {
                        res.writeHead(200, {'Content-Type': response.fileContentType});
                        res.end(response.data);
                    } else {
                        res.send(401, {meta: {status: 401, message: 'File does not exist'}});
                    }
                } else {
                    res.send(401, {meta: {status: 401, message: 'File does not exist'}});
                }
            });
    }
    else {
        res.send(401, {meta: {status: 401, message: 'File does not exist'}});
    }
};

/**
 * Returns the Albums of suggested
 * images
 *
 * @method showAlbum_v1_0_0
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
exports.showAlbum_v1_0_0 = function (req, res) {
    var libraryOf = req.params.of;
    var pagination = utility.pagination(req);
    if (libraryOf != null) {
        var model = require('../models');
        var albumObject = {
            files: "",
            info: ""
        };
        model.album.findAll({
            where: {
                $and: [
                    {
                        name: libraryOf
                    },
                    {
                        type: 'IMAGE'
                    },
                    {
                        gen_by: 'ADMIN'
                    },
                    {
                        belongs_to: 'DEFAULT'
                    }
                ]
            }
        })
            .then(function (albumData) {
                if (albumData.length > 0) {
                    var albumId = albumData[0]['dataValues']['id'];
                    return model.user_file_uploads.findAll({
                        attributes: ['id'], where: {album_id: albumId},
                        offset: pagination.offset,
                        limit: pagination.limit
                    })
                        .then(function (result) {
                            if (result != null) {
                                var mediaObj = [];
                                var promiseFor = promise.method(function (condition, action, value) {
                                    if (!condition(value)) return value;
                                    return action(value).then(promiseFor.bind(null, condition, action));
                                });
                                promiseFor(function (count) {
                                    return count < result.length;
                                }, function (count) {
                                    var media = new Media(result[count].dataValues.id);
                                    return media.get()
                                        .then(function (mediaArray) {
                                            mediaObj.push(mediaArray[0]);
                                            return ++count;
                                        });
                                }, 0)
                                    .then(function () {
                                        albumObject.files = mediaObj;
                                        albumObject.info = {
                                            totalFiles: mediaObj.length, // total suggested images
                                            postLink: null,
                                            albumLink: null
                                        };
                                        res.send(200, {
                                            meta: {status: 200, message: 'Suggested Image Library'},
                                            data: albumObject
                                        });
                                    });
                            }
                            else {
                                res.send(405, {
                                    meta: {status: 405, message: 'Image Library does not exist'},
                                    data: albumObject
                                });
                            }
                        });
                } else {
                    res.send(405, {
                        meta: {status: 405, message: 'Image Library does not exist'},
                        data: albumObject
                    });
                }
            });
    }
    else if (libraryOf == null) {
        res.send(405, {meta: {status: 405, message: 'Invalid Parameters'}})
    }
    else {
        res.send(401, {meta: {status: 401, message: 'Parameters required'}});
    }
};

/**
 * Save the Url Meta Information
 *
 * @method saveFetchedUrlInformation_v1_0_0
 * @param {Object} req
 * @param {Object} res
 * @return {Object} fetched Url Object
 */
exports.saveFetchedUrlInformation_v1_0_0 = function (req, res) {
    helper.getActiveSession_v1_0_0(req)
        .then(function (sessionUser) {
            if (sessionUser.type == 'Recognized' || sessionUser.type == 'UnRecognized') {
                //session is active, user has been authenticated
                var fetchedUrl = req.body.url;
                var urlProvider = config.fetchedUrlConfig.urlProvider;
                fetchedUrl = utility.addHttp_v1_0_0(fetchedUrl);
                return utility.removeTrailingSlashesFromUrl_v1_0_0(fetchedUrl)
                    .then(function (fetchedUrl) {
                        if (fetchedUrl != null) {
                            var model = require('../models');
                            return model.fetched_url.findOne({
                                where: {
                                    $and: [
                                        {
                                            url: fetchedUrl
                                        },
                                        {
                                            status: 'ACTIVE'
                                        }
                                    ]
                                }
                            })
                                .then(function (data) {
                                    var isImage = null;
                                    var imageName = null;
                                    var imageExtension = null;
                                    var imagePath = null;
                                    var thumbPath = null;
                                    var thumbSize = null;
                                    var thumbWidth = null;
                                    var thumbHeight = null;
                                    var thumbDirName = null;
                                    var keywords = null;
                                    var links = null;
                                    if (data != null) {
                                        console.log(' === This is a Cached URL ===== ');
                                        //cached url
                                        //update count here
                                        var updatedCountValue = data.dataValues.count_value + 1;
                                        var fetchedUrlId = data.dataValues.id;
                                        model.fetched_url.update({
                                            count_value: updatedCountValue
                                        }, {
                                            where: {
                                                id: fetchedUrlId
                                            }
                                        }).then(function (updateResult) {
                                            if (updateResult == 1) {
                                                return helper.getFetchedUrlData_v1_0_0(fetchedUrlId)
                                                    .then(function (urlData) {
                                                        if (urlData) {
                                                            res.send(200, {
                                                                meta: {status: 200, message: 'Fetched Url Data'},
                                                                data: urlData
                                                            });
                                                        } else {
                                                            res.send(401, {
                                                                meta: {status: 401, message: 'Failed to fetch Url Data'}
                                                            });
                                                        }
                                                    });
                                            } else {
                                                res.send(401, {
                                                    meta: {status: 401, message: 'Failed to fetch Url Data'}
                                                });
                                            }
                                        });
                                    }
                                    else {
                                        console.log('=== This is a new URL ===');
                                        //hence it is a new urls
                                        var client = new metaInspector(fetchedUrl, {timeout: 5000});
                                        client.url = fetchedUrl;
                                        client.on("fetch", function () {
                                            return new promise(function (resolve) {
                                                //checking if url contains video on success return provider name
                                                return helper.parseVideoUrl_v1_0_0(client.url)
                                                    .then(function (videoUrlResult) {
                                                        urlProvider = videoUrlResult;
                                                        //If url contains Images then create thumbs and save it in database
                                                        isImage = client.image || null;
                                                        if (isImage != null || isImage != undefined) {
                                                            request.get({
                                                                    url: client.image,
                                                                    encoding: 'binary'
                                                                },
                                                                function (err, response, body) {
                                                                    if (!err) {
                                                                        imageName = utility.generateFileNameForUrlImage_v1_0_0();
                                                                        imageExtension = utility.extractFileExtensionForUrlImage_v1_0_0(isImage);
                                                                        imagePath = config.path.downloadDir;
                                                                        thumbPath = config.path.downloadDir + config.path.thumbDir;
                                                                        thumbSize = config.fetchedUrlConfig.thumbs[0];
                                                                        thumbWidth = config.thumbSize.urlImage[0].width;
                                                                        thumbHeight = config.thumbSize.urlImage[0].height;
                                                                        thumbDirName = config.thumbNames.urlimage;
                                                                        fs.writeFile(config.path.downloadDir + imageName + imageExtension, body, 'binary', function (err) {
                                                                            if (!err) {
                                                                                var thumbSize = config.thumbSize.urlImage;
                                                                                return new promise(function (resolveResizeImage) {
                                                                                    if (imageExtension != '.jpg') {
                                                                                        var fileExtension = '.' + config.imageConfig.setExtension;
                                                                                        return helper.convertAndCompressOriginalImageFile_v1_0_0(config.path.downloadDir + imageName + fileExtension, config.path.downloadDir + imageName + imageExtension, config.imageConfig.setExtension)
                                                                                            .then(function (result) {
                                                                                                if (result) {
                                                                                                    imageExtension = fileExtension;
                                                                                                    resolveResizeImage(true);
                                                                                                } else {
                                                                                                    resolveResizeImage('Error in Resizing Image');
                                                                                                }
                                                                                            });
                                                                                    }
                                                                                    else {
                                                                                        return helper.compressOriginalImageFile_v1_0_0(config.path.downloadDir + imageName + imageExtension)
                                                                                            .then(function (result) {
                                                                                                if (result) {
                                                                                                    resolveResizeImage(true);
                                                                                                } else {
                                                                                                    resolveResizeImage('Error in Resizing Image');
                                                                                                }
                                                                                            });
                                                                                    }
                                                                                })
                                                                                    .then(function (imageResized) {
                                                                                        if (imageResized) {
                                                                                            setTimeout(function () {
                                                                                                var uploadedFileProperties =
                                                                                                {
                                                                                                    uId: 0,
                                                                                                    uploadedFilePath: config.path.downloadDir + imageName + imageExtension,
                                                                                                    fileOf: 'URLIMAGE',
                                                                                                    fileName: imageName,
                                                                                                    fileExt: imageExtension,
                                                                                                    fileType: 'IMAGE',
                                                                                                    width: null,
                                                                                                    height: null,
                                                                                                    orgFileDirPath: config.path.downloadDir,
                                                                                                    thumbDirPath: config.path.downloadDir + config.path.thumbDir,
                                                                                                    thumbDirNames: thumbDirName,
                                                                                                    thumbSizes: thumbSize,
                                                                                                    videoThumbExtension: null,
                                                                                                    duration: null,
                                                                                                    albumId: null
                                                                                                };
                                                                                                return helper.createThumbnailsOfUrlImage_v1_0_0(uploadedFileProperties, 0, 0)
                                                                                                    .then(function (thumbCreated) {
                                                                                                        if (thumbCreated) {
                                                                                                            resolve(client);
                                                                                                        } else {
                                                                                                            resolve(false);
                                                                                                        }
                                                                                                    })
                                                                                            }, 30);
                                                                                        } else {
                                                                                            resolve(false);
                                                                                        }
                                                                                    });
                                                                            } else {
                                                                                resolve(false);
                                                                            }
                                                                        });
                                                                    } else {
                                                                        resolve(false);
                                                                    }
                                                                });
                                                        }
                                                        else {
                                                            resolve(client);
                                                        }
                                                    });
                                            })
                                                .then(function (client) {
                                                    //now save information of url in database
                                                    if (client != 'false') {
                                                        var urlImageProperties = {
                                                            imagePath: imagePath,
                                                            imageName: imageName,
                                                            imageExtension: imageExtension,
                                                            imageThumbSize: thumbSize,
                                                            imageThumbWidth: thumbWidth,
                                                            imageThumbHeight: thumbHeight,
                                                            thumbPath: thumbPath
                                                        };
                                                        return dbHelper.insertIntoFetchedUrlDataTable_v1_0_0(client, urlProvider, links, urlImageProperties)
                                                            .then(function (result) {
                                                                if (result != null) {
                                                                    return helper.getFetchedUrlData_v1_0_0(result.dataValues.id)
                                                                        .then(function (urlData) {
                                                                            if (urlData) {
                                                                                res.send(200, {
                                                                                    meta: {
                                                                                        status: 200,
                                                                                        message: 'Fetched Url data'
                                                                                    },
                                                                                    data: urlData
                                                                                });
                                                                            } else {
                                                                                res.send(401, {
                                                                                    meta: {
                                                                                        status: 401,
                                                                                        message: 'Failed to fetch Url Data'
                                                                                    }
                                                                                });
                                                                            }
                                                                        });
                                                                } else {
                                                                    res.send(401, {
                                                                        meta: {
                                                                            status: 401,
                                                                            message: 'Failed to get fetched data'
                                                                        }
                                                                    });
                                                                }
                                                            });
                                                    }
                                                    else {
                                                        res.send(401, {
                                                            meta: {status: 401, message: 'Failed to get fetched data'}
                                                        });
                                                    }
                                                });
                                        });
                                        client.on("error", function (err) {
                                            console.log('4', err);
                                            res.send(401, {
                                                meta: {status: 401, message: 'Failed to get fetched data'}
                                            });
                                        });
                                        client.fetch();
                                    }
                                });
                        }
                        else {
                            res.send(405, {meta: {status: 405, message: 'Parameters required'}});
                        }
                    });
            }
            else {
                res.send(401, {meta: {status: 401, message: 'user is not logged or invalid token'}});
            }
        }).error(function (err) {
            res.send(401, {meta: {status: 401, message: err}});
        });
};

