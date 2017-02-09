/**
 * Controller for handling all the uploading files like stuff
 *
 * @class uploadfile
 */

/**
 * Requiring uploadfile helper
 * @property uploadFileHelper
 * @type file
 */
var uploadFileHelper = require('../helpers/process_uploadedfile');
/**
 * Requiring dbConnection helper
 * @property dbConnection
 * @type file
 */
var dbConnection = require('../helpers/dbConnection');
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
 * Requiring Media model
 * @property Media
 * @type file
 */
var Media = require('../models/Media');


/**
 * To upload image files of all features
 *
 * @method uploadImageFile_v1_0_0
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
exports.uploadImageFile_v1_0_0 = function (req, res) {
    helper.getActiveSession_v1_0_0(req)
        .then(function (sessionUser) {
            //session is active, user has been authenticated
            if (sessionUser.type == 'Recognized' || sessionUser.type == 'UnRecognized') {

                var uId = sessionUser['uid'];
                var imageOf = req.params.imageof;
                var imageType = req.params.imagetype || null;
                var folderPath = '';

                //Features

                if (imageOf == 'profile' && imageType == null) {
                    folderPath += config.path.uploadDir + uId + '/' + config.path.profileDir;
                    return uploadFileHelper.uploadFileIfAttached_v1_0_0(req, folderPath)
                        .then(function (response) {
                            if (response == 'no file attached' || response == 'directory not exist' || response == 'error in parsing file' || response == 'field name is invalid') {
                                //here response is a string messages
                                res.send(500, {
                                    meta: {
                                        status: 500,
                                        message: response
                                    }
                                });
                            }
                            else {
                                //here response is attached file properties object
                                return uploadFileHelper.processUploadedImageFile_v1_0_0(req, uId, 'profile', folderPath, response.files)
                                    .then(function (result) {
                                        if (result != false) {
                                            var mediaObj = new Media(result.id);
                                            return mediaObj.get()
                                                .then(function (mediaArray) {
                                                    if (mediaArray.length > 0) {
                                                        delayedResponse_v1_0_0(res, 200, 'Image Uploaded Successfully', result.id, mediaArray, 250);
                                                    } else {
                                                        res.send(401, {
                                                            meta: {
                                                                status: 401,
                                                                message: 'Some Error Occurred in Uploading Image'
                                                            }
                                                        });
                                                    }
                                                });
                                        } else if (result == false) {
                                            res.send(401, {
                                                meta: {
                                                    status: 401,
                                                    message: 'Failed to Upload Image'
                                                }
                                            });
                                        } else {
                                            res.send(500, {meta: {status: 500, message: result}});
                                        }
                                    });
                            }
                        });
                }
                else if (imageOf == 'cover' && imageType == null) {
                    folderPath += config.path.uploadDir + uId + '/' + config.path.coverDir;
                    return uploadFileHelper.uploadFileIfAttached_v1_0_0(req, folderPath)
                        .then(function (response) {
                            if (response == 'no file attached' || response == 'directory not exist' || response == 'error in parsing file' || response == 'field name is invalid') {
                                //here response is a string messages
                                res.send(500, {
                                    meta: {
                                        status: 500,
                                        message: response
                                    }
                                });
                            }
                            else {
                                //here response is attached file properties object
                                return uploadFileHelper.processUploadedImageFile_v1_0_0(req, uId, 'cover', folderPath, response.files)
                                    .then(function (result) {
                                        if (result != false) {
                                            var mediaObj = new Media(result.id);
                                            return mediaObj.get()
                                                .then(function (mediaArray) {
                                                    if (mediaArray.length > 0) {
                                                        delayedResponse_v1_0_0(res, 200, 'Image Uploaded Successfully', result.id, mediaArray, 250);
                                                    } else {
                                                        res.send(401, {
                                                            meta: {
                                                                status: 401,
                                                                message: 'Some Error Occurred in Uploading Image'
                                                            }
                                                        });
                                                    }
                                                });
                                        } else if (result == false) {
                                            res.send(401, {
                                                meta: {
                                                    status: 401,
                                                    message: 'Failed to Upload Image'
                                                }
                                            });
                                        } else {
                                            res.send(500, {meta: {status: 500, message: result}});
                                        }
                                    });
                            }
                        });
                }
                else if (imageOf == 'goal' && imageType == null) {
                    folderPath += config.path.uploadDir + uId + '/' + config.path.goalDir;
                    return uploadFileHelper.uploadFileIfAttached_v1_0_0(req, folderPath)
                        .then(function (response) {
                            if (response == 'no file attached' || response == 'directory not exist' || response == 'error in parsing file' || response == 'field name is invalid') {
                                //here response is a string messages
                                res.send(500, {
                                    meta: {
                                        status: 500,
                                        message: response
                                    }
                                });
                            }
                            else {
                                //here response is attached file properties object
                                return uploadFileHelper.processUploadedImageFile_v1_0_0(req, uId, 'goal', folderPath, response.files)
                                    .then(function (result) {
                                        if (result != false) {
                                            var mediaObj = new Media(result.id);
                                            return mediaObj.get()
                                                .then(function (mediaArray) {
                                                    if (mediaArray.length > 0) {
                                                        delayedResponse_v1_0_0(res, 200, 'Image Uploaded Successfully', result.id, mediaArray, 250);
                                                    } else {
                                                        res.send(401, {
                                                            meta: {
                                                                status: 401,
                                                                message: 'Some Error Occurred in Uploading Image'
                                                            }
                                                        });
                                                    }
                                                });
                                        } else if (result == false) {
                                            res.send(401, {
                                                meta: {
                                                    status: 401,
                                                    message: 'Failed to Upload Image'
                                                }
                                            });
                                        } else {
                                            res.send(500, {meta: {status: 500, message: result}});
                                        }
                                    });
                            }
                        });
                }
                else if (imageOf == 'post' && imageType == null) {
                    folderPath += config.path.uploadDir + uId + '/' + config.path.postDir;
                    return uploadFileHelper.uploadFileIfAttached_v1_0_0(req, folderPath)
                        .then(function (response) {
                            if (response == 'no file attached' || response == 'directory not exist' || response == 'error in parsing file' || response == 'field name is invalid') {
                                //here response is a string messages
                                res.send(500, {
                                    meta: {
                                        status: 500,
                                        message: response
                                    }
                                });
                            }
                            else {
                                //here response is attached file properties object
                                return uploadFileHelper.processUploadedImageFile_v1_0_0(req, uId, 'post', folderPath, response.files)
                                    .then(function (result) {
                                        if (result != false) {
                                            var mediaObj = new Media(result.id);
                                            return mediaObj.get()
                                                .then(function (mediaArray) {
                                                    if (mediaArray.length > 0) {
                                                        delayedResponse_v1_0_0(res, 200, 'Image Uploaded Successfully', result.id, mediaArray, 250);
                                                    } else {
                                                        res.send(401, {
                                                            meta: {
                                                                status: 401,
                                                                message: 'Some Error Occurred in Uploading Image'
                                                            }
                                                        });
                                                    }
                                                });
                                        } else if (result == false) {
                                            res.send(401, {
                                                meta: {
                                                    status: 401,
                                                    message: 'Failed to Upload Image'
                                                }
                                            });
                                        } else {
                                            res.send(500, {meta: {status: 500, message: result}});
                                        }
                                    });
                            }
                        });
                }
                else if (imageOf == 'comment' && imageType == null) {
                    folderPath += config.path.uploadDir + uId + '/' + config.path.commentDir;
                    return uploadFileHelper.uploadFileIfAttached_v1_0_0(req, folderPath)
                        .then(function (response) {
                            if (response == 'no file attached' || response == 'directory not exist' || response == 'error in parsing file' || response == 'field name is invalid') {
                                //here response is a string messages
                                res.send(500, {
                                    meta: {
                                        status: 500,
                                        message: response
                                    }
                                });
                            }
                            else {
                                //here response is attached file properties object
                                return uploadFileHelper.processUploadedImageFile_v1_0_0(req, uId, 'comment', folderPath, response.files)
                                    .then(function (result) {
                                        if (result != false) {
                                            var mediaObj = new Media(result.id);
                                            return mediaObj.get()
                                                .then(function (mediaArray) {
                                                    if (mediaArray.length > 0) {
                                                        delayedResponse_v1_0_0(res, 200, 'Image Uploaded Successfully', result.id, mediaArray, 250);
                                                    } else {
                                                        res.send(401, {
                                                            meta: {
                                                                status: 401,
                                                                message: 'Some Error Occurred in Uploading Image'
                                                            }
                                                        });
                                                    }
                                                });
                                        } else if (result == false) {
                                            res.send(401, {
                                                meta: {
                                                    status: 401,
                                                    message: 'Failed to Upload Image'
                                                }
                                            });
                                        } else {
                                            res.send(500, {meta: {status: 500, message: result}});
                                        }
                                    });
                            }
                        });
                }

                //albums

                else if (imageOf == 'profile' && imageType == 'album') {
                    folderPath += config.path.uploadDir + config.path.albumsDir + config.path.imagesAlbumDir + config.path.profileDir;
                    return uploadFileHelper.uploadFileIfAttached_v1_0_0(req, folderPath)
                        .then(function (response) {
                            if (response == 'no file attached' || response == 'directory not exist' || response == 'error in parsing file' || response == 'field name is invalid') {
                                //here response is a string messages
                                res.send(500, {
                                    meta: {
                                        status: 500,
                                        message: response
                                    }
                                });
                            }
                            else {
                                //here response is attached file properties object
                                return uploadFileHelper.processUploadedImageFile_v1_0_0(req, uId, 'albumprofile', folderPath, response.files)
                                    .then(function (result) {
                                        if (result != false) {
                                            var mediaObj = new Media(result.id);
                                            return mediaObj.get()
                                                .then(function (mediaArray) {
                                                    if (mediaArray.length > 0) {
                                                        delayedResponse_v1_0_0(res, 200, 'Image Uploaded Successfully', result.id, mediaArray, 250);
                                                    } else {
                                                        res.send(401, {
                                                            meta: {
                                                                status: 401,
                                                                message: 'Some Error Occurred in Uploading Image'
                                                            }
                                                        });
                                                    }
                                                });
                                        } else if (result == false) {
                                            res.send(401, {
                                                meta: {
                                                    status: 401,
                                                    message: 'Failed to Upload Image'
                                                }
                                            });
                                        } else {
                                            res.send(500, {meta: {status: 500, message: result}});
                                        }
                                    });
                            }
                        });
                }
                else if (imageOf == 'cover' && imageType == 'album') {
                    folderPath += config.path.uploadDir + config.path.albumsDir + config.path.imagesAlbumDir + config.path.coverDir;
                    return uploadFileHelper.uploadFileIfAttached_v1_0_0(req, folderPath)
                        .then(function (response) {
                            if (response == 'no file attached' || response == 'directory not exist' || response == 'error in parsing file' || response == 'field name is invalid') {
                                //here response is a string messages
                                res.send(500, {
                                    meta: {
                                        status: 500,
                                        message: response
                                    }
                                });
                            }
                            else {
                                //here response is attached file properties object
                                return uploadFileHelper.processUploadedImageFile_v1_0_0(req, uId, 'albumcover', folderPath, response.files)
                                    .then(function (result) {
                                        if (result != false) {
                                            var mediaObj = new Media(result.id);
                                            return mediaObj.get()
                                                .then(function (mediaArray) {
                                                    if (mediaArray.length > 0) {
                                                        delayedResponse_v1_0_0(res, 200, 'Image Uploaded Successfully', result.id, mediaArray, 250);
                                                    } else {
                                                        res.send(401, {
                                                            meta: {
                                                                status: 401,
                                                                message: 'Some Error Occurred in Uploading Image'
                                                            }
                                                        });
                                                    }
                                                });
                                        } else if (result == false) {
                                            res.send(401, {
                                                meta: {
                                                    status: 401,
                                                    message: 'Failed to Upload Image'
                                                }
                                            });
                                        } else {
                                            res.send(500, {meta: {status: 500, message: result}});
                                        }
                                    });
                            }
                        });
                }
                else if (imageOf == 'goal' && imageType == 'album') {
                    folderPath += config.path.uploadDir + config.path.albumsDir + config.path.imagesAlbumDir + config.path.goalDir;
                    return uploadFileHelper.uploadFileIfAttached_v1_0_0(req, folderPath)
                        .then(function (response) {
                            if (response == 'no file attached' || response == 'directory not exist' || response == 'error in parsing file' || response == 'field name is invalid') {
                                //here response is a string messages
                                res.send(500, {
                                    meta: {
                                        status: 500,
                                        message: response
                                    }
                                });
                            }
                            else {
                                //here response is attached file properties object
                                return uploadFileHelper.processUploadedImageFile_v1_0_0(req, uId, 'albumgoal', folderPath, response.files)
                                    .then(function (result) {
                                        if (result != false) {
                                            var mediaObj = new Media(result.id);
                                            return mediaObj.get()
                                                .then(function (mediaArray) {
                                                    if (mediaArray.length > 0) {
                                                        delayedResponse_v1_0_0(res, 200, 'Image Uploaded Successfully', result.id, mediaArray, 250);
                                                    } else {
                                                        res.send(401, {
                                                            meta: {
                                                                status: 401,
                                                                message: 'Some Error Occurred in Uploading Image'
                                                            }
                                                        });
                                                    }
                                                });
                                        } else if (result == false) {
                                            res.send(401, {
                                                meta: {
                                                    status: 401,
                                                    message: 'Failed to Upload Image'
                                                }
                                            });
                                        } else {
                                            res.send(500, {meta: {status: 500, message: result}});
                                        }
                                    });
                            }
                        });
                }

                //explore page

                else if (imageOf == 'category' && imageType == null) {
                    folderPath += config.path.uploadDir + config.path.defaultFilesDir + config.path.categoriesDir;
                    return uploadFileHelper.uploadFileIfAttached_v1_0_0(req, folderPath)
                        .then(function (response) {
                            if (response == 'no file attached' || response == 'directory not exist' || response == 'error in parsing file' || response == 'field name is invalid') {
                                //here response is a string messages
                                res.send(500, {
                                    meta: {
                                        status: 500,
                                        message: response
                                    }
                                });
                            }
                            else {
                                //here response is attached file properties object
                                return uploadFileHelper.processUploadedImageFile_v1_0_0(req, uId, 'category', folderPath, response.files)
                                    .then(function (result) {
                                        if (result != false) {
                                            var mediaObj = new Media(result.id);
                                            return mediaObj.get()
                                                .then(function (mediaArray) {
                                                    if (mediaArray.length > 0) {
                                                        delayedResponse_v1_0_0(res, 200, 'Image Uploaded Successfully', result.id, mediaArray, 250);
                                                    } else {
                                                        res.send(401, {
                                                            meta: {
                                                                status: 401,
                                                                message: 'Some Error Occurred in Uploading Image'
                                                            }
                                                        });
                                                    }
                                                });
                                        } else if (result == false) {
                                            res.send(401, {
                                                meta: {
                                                    status: 401,
                                                    message: 'Failed to Upload Image'
                                                }
                                            });
                                        } else {
                                            res.send(500, {meta: {status: 500, message: result}});
                                        }
                                    });
                            }
                        });
                }
                else if (imageOf == 'subcategory' && imageType == null) {
                    folderPath += config.path.uploadDir + config.path.defaultFilesDir + config.path.subCategoriesDir;
                    return uploadFileHelper.uploadFileIfAttached_v1_0_0(req, folderPath)
                        .then(function (response) {
                            if (response == 'no file attached' || response == 'directory not exist' || response == 'error in parsing file' || response == 'field name is invalid') {
                                //here response is a string messages
                                res.send(500, {
                                    meta: {
                                        status: 500,
                                        message: response
                                    }
                                });
                            }
                            else {
                                //here response is attached file properties object
                                return uploadFileHelper.processUploadedImageFile_v1_0_0(req, uId, 'subcategory', folderPath, response.files)
                                    .then(function (result) {
                                        if (result != false) {
                                            var mediaObj = new Media(result.id);
                                            return mediaObj.get()
                                                .then(function (mediaArray) {
                                                    if (mediaArray.length > 0) {
                                                        delayedResponse_v1_0_0(res, 200, 'Image Uploaded Successfully', result.id, mediaArray, 250);
                                                    } else {
                                                        res.send(401, {
                                                            meta: {
                                                                status: 401,
                                                                message: 'Some Error Occurred in Uploading Image'
                                                            }
                                                        });
                                                    }
                                                });
                                        } else if (result == false) {
                                            res.send(401, {
                                                meta: {
                                                    status: 401,
                                                    message: 'Failed to Upload Image'
                                                }
                                            });
                                        } else {
                                            res.send(500, {meta: {status: 500, message: result}});
                                        }
                                    });
                            }
                        });
                }
                else if (imageOf == 'banner' && imageType == null) {
                    folderPath += config.path.uploadDir + config.path.defaultFilesDir + config.path.bannerDir;
                    return uploadFileHelper.uploadFileIfAttached_v1_0_0(req, folderPath)
                        .then(function (response) {
                            if (response == 'no file attached' || response == 'directory not exist' || response == 'error in parsing file' || response == 'field name is invalid') {
                                //here response is a string messages
                                res.send(500, {
                                    meta: {
                                        status: 500,
                                        message: response
                                    }
                                });
                            }
                            else {
                                //here response is attached file properties object
                                return uploadFileHelper.processUploadedImageFile_v1_0_0(req, uId, 'banner', folderPath, response.files)
                                    .then(function (result) {
                                        if (result != false) {
                                            var mediaObj = new Media(result.id);
                                            return mediaObj.get()
                                                .then(function (mediaArray) {
                                                    if (mediaArray.length > 0) {
                                                        delayedResponse_v1_0_0(res, 200, 'Image Uploaded Successfully', result.id, mediaArray, 250);
                                                    } else {
                                                        res.send(401, {
                                                            meta: {
                                                                status: 401,
                                                                message: 'Some Error Occurred in Uploading Image'
                                                            }
                                                        });
                                                    }
                                                });
                                        } else if (result == false) {
                                            res.send(401, {
                                                meta: {
                                                    status: 401,
                                                    message: 'Failed to Upload Image'
                                                }
                                            });
                                        } else {
                                            res.send(500, {meta: {status: 500, message: result}});
                                        }
                                    });
                            }
                        });
                }

                //default

                else if (imageOf == 'profile' && imageType == 'default') {
                    folderPath += config.path.uploadDir + config.path.defaultFilesDir + config.path.profileDir;
                    return uploadFileHelper.processUploadedImageFile_v1_0_0(req, uId, 'defaultprofile', folderPath, null)
                        .then(function (result) {
                            if (result != false) {
                                var mediaObj = new Media(result.id);
                                return mediaObj.get()
                                    .then(function (mediaArray) {
                                        if (mediaArray.length > 0) {
                                            delayedResponse_v1_0_0(res, 200, 'Image Uploaded Successfully', result.id, mediaArray, 250);
                                        } else {
                                            res.send(401, {
                                                meta: {
                                                    status: 401,
                                                    message: 'Some Error Occurred in Uploading Image'
                                                }
                                            });
                                        }
                                    });
                            }
                            else if (result == false) {
                                res.send(401, {
                                    meta: {
                                        status: 401,
                                        message: 'Failed to Upload Image'
                                    }
                                });
                            } else {
                                res.send(500, {meta: {status: 500, message: result}});
                            }
                        });
                }
                else if (imageOf == 'cover' && imageType == 'default') {
                    folderPath += config.path.uploadDir + config.path.defaultFilesDir + config.path.coverDir;
                    return uploadFileHelper.processUploadedImageFile_v1_0_0(req, uId, 'defaultcover', folderPath, null)
                        .then(function (result) {
                            if (result != false) {
                                var mediaObj = new Media(result.id);
                                return mediaObj.get()
                                    .then(function (mediaArray) {
                                        if (mediaArray.length > 0) {
                                            delayedResponse_v1_0_0(res, 200, 'Image Uploaded Successfully', result.id, mediaArray, 250);
                                        } else {
                                            res.send(401, {
                                                meta: {
                                                    status: 401,
                                                    message: 'Some Error Occurred in Uploading Image'
                                                }
                                            });
                                        }
                                    });
                            }
                            else if (result == false) {
                                res.send(401, {
                                    meta: {
                                        status: 401,
                                        message: 'Failed to Upload Image'
                                    }
                                });
                            } else {
                                res.send(500, {meta: {status: 500, message: result}});
                            }
                        });
                }
                else if (imageOf == 'goal' && imageType == 'default') {
                    folderPath += config.path.uploadDir + config.path.defaultFilesDir + config.path.goalDir;
                    return uploadFileHelper.processUploadedImageFile_v1_0_0(req, uId, 'defaultgoal', folderPath, null)
                        .then(function (result) {
                            if (result != false) {
                                var mediaObj = new Media(result.id);
                                return mediaObj.get()
                                    .then(function (mediaArray) {
                                        if (mediaArray.length > 0) {
                                            delayedResponse_v1_0_0(res, 200, 'Image Uploaded Successfully', result.id, mediaArray, 250);
                                        } else {
                                            res.send(401, {
                                                meta: {
                                                    status: 401,
                                                    message: 'Some Error Occurred in Uploading Image'
                                                }
                                            });
                                        }
                                    });
                            }
                            else if (result == false) {
                                res.send(401, {
                                    meta: {
                                        status: 401,
                                        message: 'Failed to Upload Image'
                                    }
                                });
                            } else {
                                res.send(500, {meta: {status: 500, message: result}});
                            }
                        });
                }
                else if (imageOf == null && imageType == null) {
                    res.send(405, {meta: {status: 405, message: 'Invalid Parameters'}});
                }
                else {
                    res.send(405, {meta: {status: 401, message: 'Parameters required'}});
                }
            }
            //user is not logged in, or provided incorrect or expired token
            else {
                res.send({meta: {status: 401, message: 'user is not logged or invalid token'}});
            }
        }).error(function (err) {
            res.send({meta: {status: 401, message: err}});
        });
};

/**
 * To upload gif files of all features
 *
 * @method uploadGifImageFile_v1_0_0
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
exports.uploadGifImageFile_v1_0_0 = function (req, res) {
    helper.getActiveSession_v1_0_0(req)
        .then(function (sessionUser) {
            //session is active, user has been authenticated
            if (sessionUser.type == 'Recognized' || sessionUser.type == 'UnRecognized') {
                var uId = sessionUser['uid'];
                var giphyFileId = req.params.imageid || 'null'; //respective imageid
                var fileOf = req.params.imageof || 'null';      //imageof is image related to which feature either of POST, GOAL etc
                if (giphyFileId != 'null') {
                    return uploadFileHelper.processUploadedGifImageFile_v1_0_0(giphyFileId, uId, fileOf)
                        .then(function (result) {
                            if (result != false) {
                                var mediaObj = new Media(result.id);
                                return mediaObj.get()
                                    .then(function (mediaArray) {
                                        if (mediaArray.length > 0) {
                                            delayedResponse_v1_0_0(res, 200, 'Image Uploaded Successfully', result.id, mediaArray, 250);
                                        } else {
                                            res.send(401, {
                                                meta: {
                                                    status: 401,
                                                    message: 'Some Error Occurred in Uploading Image'
                                                }
                                            });
                                        }
                                    });
                            } else {
                                res.send(401, {
                                    meta: {
                                        status: 401,
                                        message: 'Failed to Upload Image'
                                    }
                                });
                            }
                        });
                }
                else {
                    res.send(401, {
                        meta: {
                            status: 401,
                            message: 'Failed to Upload Image'
                        }
                    });
                }
            }
            else {
                res.send(401, {meta: {status: 401, message: 'user is not logged or invalid token'}});
            }
        });
};

/**
 * To upload video files of all features
 *
 * @method uploadVideoFile_v1_0_0
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
exports.uploadVideoFile_v1_0_0 = function (req, res) {
    helper.getActiveSession_v1_0_0(req)
        .then(function (sessionUser) {
            if (sessionUser.type == 'Recognized' || sessionUser.type == 'UnRecognized') {
                //session is active, user has been authenticated
                var uId = sessionUser['uid'];
                var videoOf = req.params.videoof || null;
                var folderPath = '';
                if (videoOf == 'post') {
                    folderPath += config.path.uploadDir + uId + '/' + config.path.postDir;
                    return uploadFileHelper.uploadFileIfAttached_v1_0_0(req, folderPath)
                        .then(function (response) {
                            if (response == 'no file attached' || response == 'directory not exist' || response == 'error in parsing file' || response == 'field name is invalid') {
                                res.send(500, {
                                    meta: {
                                        status: 500,
                                        message: response
                                    }
                                });
                            }
                            else {
                                return uploadFileHelper.processUploadedVideoFile_v1_0_0(req, uId, 'post', folderPath, response.files)
                                    .then(function (result) {
                                        if (result.id) {
                                            var mediaObj = new Media(result.id);
                                            return mediaObj.get()
                                                .then(function (mediaArray) {
                                                    if (mediaArray.length > 0) {
                                                        delayedResponse_v1_0_0(res, 200, 'Video uploaded successfully', result.id, mediaArray, 250);
                                                    } else {
                                                        res.send(401, {
                                                            meta: {
                                                                status: 401,
                                                                message: 'Some error occurred in Uploading Video'
                                                            }
                                                        });
                                                    }
                                                });
                                        } else if (result == false) {
                                            res.send(401, {meta: {status: 401, message: 'Failed to upload Video'}});
                                        } else {
                                            res.send(401, {meta: {status: 401, message: result}});
                                        }
                                    });
                            }
                        });

                }
                else if (videoOf == 'comment') {
                    folderPath += config.path.uploadDir + uId + '/' + config.path.commentDir;
                    return uploadFileHelper.uploadFileIfAttached_v1_0_0(req, folderPath)
                        .then(function (response) {
                            //here response is string messages
                            if (response == 'no file attached' || response == 'directory not exist' || response == 'error in parsing file' || response == 'field name is invalid') {
                                res.send(500, {
                                    meta: {
                                        status: 500,
                                        message: response
                                    }
                                });
                            }
                            else {
                                return uploadFileHelper.processUploadedVideoFile_v1_0_0(req, uId, 'CO', folderPath, response.files)
                                    .then(function (result) {
                                        if (result.id) {
                                            var mediaObj = new Media(result.id);
                                            return mediaObj.get()
                                                .then(function (mediaArray) {
                                                    if (mediaArray.length > 0) {
                                                        delayedResponse_v1_0_0(res, 200, 'Video uploaded successfully', result.id, mediaArray, 250);
                                                    } else {
                                                        res.send(401, {
                                                            meta: {
                                                                status: 401,
                                                                message: 'Some error occurred in Uploading Video'
                                                            }
                                                        });
                                                    }
                                                });
                                        } else if (result == false) {
                                            res.send(401, {meta: {status: 401, message: 'Failed to upload Video'}});
                                        } else {
                                            res.send(401, {meta: {status: 401, message: result}});
                                        }
                                    });
                            }
                        });
                }
                else if (videoOf == null) {
                    res.send(405, {meta: {status: 405, message: 'Invalid Parameters'}});
                }
                else {
                    res.send(405, {meta: {status: 405, message: 'Parameters required'}});
                }
            }
            else {
                //user is not logged in, or provided incorrect or expired token
                res.send(401, {meta: {status: 401, message: 'user is not logged or invalid token'}});
            }
        }).error(function (err) {
            res.send(401, {meta: {status: 401, message: err}});
        });
};

/**
 * To crop image on customize parameters
 *
 * @method customizeCropImage_v1_0_0
 * @param {Object} req
 * @param {Object} res
 * @return {Object} response
 */
exports.customizeCropImage_v1_0_0 = function (req, res) {
    helper.getActiveSession_v1_0_0(req)
        .then(function (sessionUser) {
            if (sessionUser.type == 'Recognized' || sessionUser.type == 'UnRecognized') {
                //session is active, user has been authenticated
                var fileId = req.body.attach_id || null;
                var customWidth = req.body.width || null;
                var customHeight = req.body.height || null;
                var xOrdinate = req.body.x || null;
                var yOrdinate = req.body.y || null;
                var customRotation = req.body.rotation || null;
                if (fileId != null) {
                    return uploadFileHelper.fetchImageFileToCropOnCustomizeParameters_v1_0_0(fileId, customWidth, customHeight, xOrdinate, yOrdinate, customRotation)
                        .then(function (result) {
                            if (result) {
                                var mediaObj = new Media(fileId);
                                return mediaObj.get()
                                    .then(function (mediaArray) {
                                        if (mediaArray.length > 0) {
                                            delayedResponse_v1_0_0(res, 200, 'Image Cropped Successfully', fileId, mediaArray, 250);
                                        } else {
                                            res.send(401, {
                                                meta: {
                                                    status: 401,
                                                    message: 'Failed to Crop Image'
                                                }
                                            });
                                        }
                                    });
                            } else {
                                res.send(401, {
                                    meta: {
                                        status: 401,
                                        message: 'Failed to Crop Image'
                                    }
                                });
                            }
                        });
                }
                else {
                    res.send(405, {meta: {status: 405, message: 'Parameters required'}});
                }
            }
            else {
                //user is not logged in, or provided incorrect or expired token
                res.send(401, {meta: {status: 401, message: 'user is not logged or invalid token'}});
            }
        })
        .error(function (err) {
            res.send(401, {meta: {status: 401, message: err}});
        });
};

/**
 * To delay the response on given timeout
 *
 * @method delayedResponse_v1_0_0
 * @param {Object} res
 * @param {Number} metaStatus
 * @param {String} metaMessage
 * @param {Number} dataId
 * @param {Object} dataObj
 * @param {Number} timeout
 * @return {Object} response
 */
var delayedResponse_v1_0_0 = function (res, metaStatus, metaMessage, dataId, dataObj, timeout) {
    var timeout = timeout || 0;
    setTimeout(function () {
        res.send(metaStatus, {
            meta: {status: metaStatus, message: metaMessage},
            data: {
                fileId: dataId,
                file: dataObj[0]
            }
        })
    }, timeout)
};

//verify provided media id (call from api-server)+

/**
 * To Verify the media id
 *
 * @param {Object} req
 * @param {Object} res
 * @return {Boolean} True/False
 */
exports.verifyMediaId = function (req, res) {
    var fileId = req.headers['file-id'] || null;
    var userId = req.headers['user-id'] || null;
    var goalId = req.headers['goal-id'] || null;
    var requestFrom = req.headers['req-from'];

    var folderPath = null;
    var fileSize = null;
    var dir = null;
    var fileOf = null;
    var imageType = null;
    var albumName = null;

    if (requestFrom == 'GOAL') {
        folderPath = config.path.uploadDir + userId + '/' + config.path.goalDir;
        fileSize = config.thumbSize.goal;
        dir = config.thumbNames.goal;
        fileOf = requestFrom;
        imageType = 'goal';
        albumName = 'default_goal';
    }
    else if (requestFrom == 'USERPROFILE') {
        folderPath = config.path.uploadDir + userId + '/' + config.path.profileDir;
        fileSize = config.thumbSize.profile;
        dir = config.thumbNames.profile;
        fileOf = requestFrom;
        imageType = 'profile';
        albumName = 'default_profile';
    } else if (requestFrom == 'USERCOVER') {
        folderPath = config.path.uploadDir + userId + '/' + config.path.coverDir;
        fileSize = config.thumbSize.cover;
        dir = config.thumbNames.cover;
        fileOf = requestFrom;
        imageType = 'cover';
        albumName = 'default_cover';
    }


    if (fileId != null) {

        // now if fileId is of Library then make a copy of file and also create the row in user_upload_file_table
        //otherwise just update the user_upload_file_table
        var model = require('../models');
        return new Promise(function (resolve) {
            return model.user_file_uploads.findAll({
                where: {
                    $and: [
                        {
                            id: fileId
                        },
                        {
                            filetype: 'IMAGE'
                        },
                        {
                            status: 'ACTIVE'
                        }
                    ]
                }
            }).then(function (fileData) {
                if (fileData.length > 0) {
                    var parentType = fileData[0]['dataValues'].parent_type;
                    var fileName = fileData[0]['dataValues'].media_url;
                    var fileExtension = fileData[0]['dataValues'].extension;
                    var fileType = fileData[0]['dataValues'].filetype;
                    var fileWidth = fileData[0]['dataValues'].width;
                    var fileHeight = fileData[0]['dataValues'].height;
                    var filePath = fileData[0]['dataValues'].path;
                    if (parentType == 'LIBRARY') {
                        //hence fileId is of Library
                        return fs.readFile(filePath + fileName + fileExtension, function (err, data) {
                            if (err) {
                                //file not exist
                                res.send(false); // it is responding to API Server
                            } else {
                                var fileParamsObj =
                                {
                                    uid: userId,
                                    source: folderPath,
                                    destination: folderPath + 'thumb' + '/',
                                    dir: dir,
                                    fileOf: fileOf,
                                    filePath: folderPath + fileName + fileExtension,
                                    fileName: fileName,
                                    fileExt: fileExtension,
                                    fileType: fileType,
                                    width: fileWidth,
                                    height: fileHeight,
                                    videothumbextension: null,
                                    duration: null,
                                    fileSize: fileSize,
                                    albumId: null
                                };
                                return fsExtra.ensureDir(filePath + fileName + fileExtension, function (err) {
                                    return fsExtra.copy(filePath + fileName + fileExtension, folderPath + '/' + fileParamsObj.fileName + fileParamsObj.fileExt, function (err) {
                                        if (err) {
                                            //error occur in copy
                                            res.send(false); // it is responding to API Server
                                        }
                                        else {
                                            return new Promise(function () {
                                                return helpers.createDirectory(fileParamsObj)
                                                    .then(function () {
                                                        return helpers.getUserDefaultAlbumId(0, albumName, 'ADMIN', 'DEFAULT')
                                                            .then(function (id) {
                                                                var albumId = null;
                                                                if (id != false) {
                                                                    albumId = id;
                                                                } else {
                                                                    albumId = null;
                                                                }
                                                                if (imageType == 'goal') {
                                                                    return helpers.insertInUserUploadFileTable(fileParamsObj, albumId, imageType, goalId)
                                                                        .then(function (data) {
                                                                            if (data != null) {
                                                                                //now update goal_image_id field
                                                                                var uploadedFileId = data.dataValues.id;
                                                                                if (imageType == 'goal') {
                                                                                    model.goals.update({
                                                                                        goal_image_id: uploadedFileId
                                                                                    }, {
                                                                                        where: {
                                                                                            goal_id: goalId
                                                                                        }
                                                                                    }).then(function (updateGoal) {
                                                                                        if (updateGoal == 1) {
                                                                                            resolve(true);
                                                                                        } else {
                                                                                            resolve(false);
                                                                                        }
                                                                                    })
                                                                                }
                                                                            } else {
                                                                                resolve(false);
                                                                            }
                                                                        });
                                                                } else {
                                                                    return helpers.insertInUserUploadFileTable(fileParamsObj, albumId, imageType, userId)
                                                                        .then(function (data) {
                                                                            if (data != null) {
                                                                                //now update goal_image_id field
                                                                                var uploadedFileId = data.dataValues.id;
                                                                                var tableUsers = objAllTables.users.users();
                                                                                if (imageType == 'profile') {
                                                                                    model.users.update({
                                                                                        profile_image_id: uploadedFileId
                                                                                    }, {
                                                                                        where: {
                                                                                            uid: userId
                                                                                        }
                                                                                    }).then(function (updatedProfile) {
                                                                                        if (updatedProfile == 1) {
                                                                                            resolve(true);
                                                                                        } else {
                                                                                            resolve(false);
                                                                                        }
                                                                                    })
                                                                                } else if (imageType == 'cover') {
                                                                                    model.users.update({
                                                                                        cover_image_id: uploadedFileId
                                                                                    }, {
                                                                                        where: {
                                                                                            uid: userId
                                                                                        }
                                                                                    }).then(function (updatedCover) {
                                                                                        if (updatedCover == 1) {
                                                                                            resolve(true);
                                                                                        } else {
                                                                                            resolve(false);
                                                                                        }
                                                                                    })
                                                                                }
                                                                            } else {
                                                                                resolve(false);
                                                                            }
                                                                        });
                                                                }
                                                            });
                                                    });
                                            });
                                        }
                                    });
                                });
                            }
                        });
                    }
                    else if (parentType == 'GOAL' || parentType == 'USERPROFILE' || parentType == 'USERCOVER') {
                        //hence fileId is of other than Library now,
                        //fetching user's default album id which is to be updated with user_file_upload table
                        return helpers.getUserDefaultAlbumId(0, albumName, 'ADMIN', 'DEFAULT')
                            .then(function (id) {
                                var albumId = null;
                                if (id != false) {
                                    albumId = id;
                                    return model.user_file_uploads.update({
                                        album_id: albumId,
                                        parent_id: goalId,
                                        updated: helpers.getUnixTimeStamp()
                                    }, {
                                        where: {
                                            id: fileId
                                        }
                                    }).then(function (update) {
                                        if (update == 1) {
                                            if (imageType == 'goal') {
                                                //now updating goal table w.r.t fileId
                                                return model.goals.update({
                                                    goal_image_id: fileId
                                                }, {
                                                    where: {
                                                        goal_id: goalId
                                                    }
                                                }).then(function (updateGoal) {
                                                    if (updateGoal == 1) {
                                                        //successfully updated the goal's image field'
                                                        resolve(updateGoal);
                                                    }
                                                })
                                            } else if (imageType == 'profile') {
                                                model.users.update({
                                                    profile_image_id: fileId
                                                }, {
                                                    where: {
                                                        uid: userId
                                                    }
                                                }).then(function (updatedProfile) {
                                                    if (updatedProfile == 1) {
                                                        resolve(true);
                                                    } else {
                                                        resolve(false);
                                                    }
                                                })
                                            } else if (imageType == 'cover') {
                                                model.users.update({
                                                    cover_image_id: fileId
                                                }, {
                                                    where: {
                                                        uid: userId
                                                    }
                                                }).then(function (updatedCover) {
                                                    if (updatedCover == 1) {
                                                        resolve(true);
                                                    } else {
                                                        resolve(false);
                                                    }
                                                })
                                            }
                                        } else {
                                            //can't update
                                            res.send(false); // it is responding to API Server
                                        }
                                    });
                                } else {
                                    res.send(false); // it is responding to API Server
                                }
                            });
                    } else {
                        //invalid file Id
                        res.send(false); // it is responding to API Server
                    }
                } else {
                    //fileId not exist
                    resolve(false); // it is responding to API Server
                }
            });
        }).then(function (result) {
                if (result) {
                    res.send(true); // it is responding to API Server
                } else {
                    res.send(false); // it is responding to API Server
                }
            });
    } else {
        res.send(false);    // it is responding to API Server
    }
};
