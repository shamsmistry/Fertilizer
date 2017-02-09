/**
 * Helper file contains function like object generators, re-useables
 * child for uploadfile and downloadfile controllers
 *
 * @class helper
 */

/**
 * Requiring helper
 * @property helper
 * @type file
 */
var helper = require('../helpers/helpers');
/**
 * Requiring dbHelper helper
 * @property dbHelper
 * @type file
 */
var dbHelper = require('../helpers/db');
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
/**
 * Requiring mkdirp (create directory with promise) npm
 * @property mkdirp
 * @type file
 */
var mkdirp = require('mkdir-promise');
/**
 * Requiring fs npm
 * @property fs
 * @type file
 */
var fs = require('fs');
/**
 * Requiring gm npm
 * @property gm
 * @type file
 */
var gm = require('gm');
/**
 * Requiring imageMagick npm
 * @property imageMagick
 * @type file
 */
var imageMagick = gm.subClass({imageMagick: true});
/**
 * Requiring sequelize npm
 * @property sequelize
 * @type file
 */
var sequelize = require('sequelize');
/**
 * Requiring _ (loadash)npm
 * @property _
 * @type file
 */
var _ = require('lodash');

//#####################################################################
//########################### REUSABLES ###############################
//#####################################################################

/**
 * Core function for getting the active session
 *
 * @method getActiveSession_v1_0_0
 * @param {Object} req
 * @return {Object} response
 */
exports.getActiveSession_v1_0_0 = function (req) {
    //################### Validations ###################
    if ((typeof req.headers == 'undefined' || req.headers == null)
        || (typeof req.headers.token == 'undefined' || req.headers.token == null)) {

        return new promise(function (resolve) {
            resolve({uid: -1, type: 'UnRecognized'});
        });

    }
    else {
        //################### Code ###################
        var token = req.headers.token;

        var model = require('../models');

        var userSession = null;
        var permissions = {
            Goal: {read: 1, create: 1, edit: 1, "delete": 1},
            Contribution: {read: 1, create: 1, edit: 1, "delete": 1},
            Comment: {read: 1, create: 1, edit: 1, "delete": 1},
            Milestones: {read: 1, create: 1, edit: 1, "delete": 1},
            Progress: {read: 1, create: 1, edit: 1, "delete": 1},
            Tag: {read: 1, create: 1, edit: 1, "delete": 1},
            Category: {read: 1, create: 1, edit: 1, "delete": 1},
            Sub_Category: {read: 1, create: 1, edit: 1, "delete": 1},
            HotNewGoals: {read: 1, create: 1, edit: 0, "delete": 1},
            Popular_Goals: {read: 1, create: 1, edit: 0, "delete": 1},
            Featured_User: {read: 1, create: 1, edit: 0, "delete": 1},
            Post: {read: 1, create: 1, edit: 1, "delete": 1},
            Role: {read: 1, create: 1, edit: 1, "delete": 1},
            Permission: {read: 1, create: 1, edit: 1, "delete": 1},
            Motivate: {read: 1, create: 1, edit: 0, "delete": 1},
            ThumbsUp: {read: 1, create: 1, edit: 0, "delete": 1},
            ThumbsDown: {read: 1, create: 1, edit: 0, "delete": 1},
            Goal_Follow: {read: 1, create: 1, edit: 0, "delete": 1},
            User_Follow: {read: 1, create: 1, edit: 0, "delete": 1},
            Upload_Image: {read: 1, create: 1, edit: 0, "delete": 1},
            Upload_Video: {read: 1, create: 1, edit: 0, "delete": 1},
            Upload_Audio: {read: 1, create: 1, edit: 0, "delete": 1},
            Interest: {read: 1, create: 1, edit: 0, "delete": 1},
            Goal_Link: {read: 1, create: 1, edit: 0, "delete": 1},
            User_Block: {read: 1, create: 1, edit: 0, "delete": 1},
            Mute_User: {read: 1, create: 1, edit: 0, "delete": 1},
            Mute_Goal: {read: 1, create: 1, edit: 0, "delete": 1},
            Flag: {read: 1, create: 1, edit: 0, "delete": 1}
        };
        return model.sessions.findOne({
            attributes: ['clientid', 'clientsecret', 'token'],
            where: {status: 'ACTIVE', token: token},
            include: {
                attributes: ['uid', 'username', 'user_email'].concat([[sequelize.literal("CONCAT_WS(' ', first_name, last_name)"), 'name']]),
                model: model.users,
                where: {status: 'ACTIVE'}
            }
        }).then(function (session) {
            if (session != null) {
                console.log('=========  User is Authenticated and has the Session =========');
                var user = session.get().user.get();
                userSession = _.merge(user, {
                    clientid: session.get('clientid'),
                    clientsecret: session.get('clientsecret'),
                    token: session.get('token')
                });
                userSession.permissions = permissions;
                userSession.type = 'Recognized';
                return userSession;
            } else {
                throw new Error('Invalid token');
            }
        })
            .error(function (err) {
                console.log('=========  ERROR in helpers.getActiveSession_v1_0_0 (in error) ========= ', err);
                return {type: 'InvalidToken'};
            })
            .catch(function (err) {
                console.log('=========  ERROR 2 in helpers.getActiveSession_v1_0_0 (in catch) ========= ', err);
                return {type: 'InvalidToken'};
            });
    }
};

/**
 * Core function for creating the
 * thumb directory only if it is not exist
 * previously
 *
 * @method createThumbDirectoryIfNotExist_v1_0_0
 * @param {Object} uploadedFileProperties
 * @return {Boolean} true/false
 */
exports.createThumbDirectoryIfNotExist_v1_0_0 = function (uploadedFileProperties) {
    return new promise(function (resolve) {
        return mkdirp(uploadedFileProperties.thumbDirPath)
            .then(function () {
                return promise.map(uploadedFileProperties.thumbDirNames, function (arrayKey) {
                    return mkdirp(uploadedFileProperties.thumbDirPath + '/' + arrayKey + '/')
                        .then(function () {
                            return true;
                        }, function (ex) {
                            console.log('=========  Failed to Create Directory ========= ', ex);
                            throw new Error('Failed to Create Directory')
                        });
                })
                    .then(function () {
                        console.log('=========  Thumb Directory Created Successfully ========= ');
                        resolve(true);
                    });
            }, function (ex) {
                console.log('========= Failed to Create Directory ========= ', ex);
                throw new Error('Failed to Create Directory');
            });
    })
        .then(function (result) {
            return result;
        })
        .catch(function (err) {
            if (err == 'Failed to Create Directory') {
                return false;
            }
        });

};

/**
 * Returns the current time in unix timestamp
 *
 * @method getUnixTimeStamp_v1_0_0
 * @return {Number} timestamp
 */
exports.getUnixTimeStamp_v1_0_0 = function () {
    return Math.floor(Date.now() / 1000);
};

/**
 * Checks against the provided file extension
 * whether it is allowed or not
 *
 * @method isValidFileExtension_v1_0_0
 * @return {Object} response
 */
exports.isValidFileExtension_v1_0_0 = function (fileExt) {
    var fileObj = {fileType: "", validity: ""};
    var fileType = "";
    if (fileExt == '.jpg' || fileExt == '.jpeg' || fileExt == '.png' || fileExt == '.gif' || fileExt == '.mp4' || fileExt == '.flv' || fileExt == '.3gp' || fileExt == '.mkv' || fileExt == '.avi' || fileExt == '.mng' || fileExt == '.webm' || fileExt == '.vob' || fileExt == '.wmv' || fileExt == '.mov' || fileExt == '.mp3' || fileExt == '.wav') {
        if (fileExt == '.jpg' || fileExt == '.jpeg' || fileExt == '.png' || fileExt == '.gif') {
            fileType = "IMAGE";
        } else if (fileExt == '.mp4' || fileExt == '.flv' || fileExt == '.3gp' || fileExt == '.mkv' || fileExt == '.avi' || fileExt == '.mng' || fileExt == '.webm' || fileExt == '.vob' || fileExt == '.wmv' || fileExt == '.mov') {
            fileType = "VIDEO";
        }
        else if (fileExt == '.mp3' || fileExt == '.wav') {
            fileType = "AUDIO";
        }
        fileObj = {fileType: fileType, validity: "true"};
        return fileObj;
    }
    else {
        fileObj = {fileType: "NONE", validity: "false"};
        return fileObj;
    }
};

/**
 * Core function to parse the video file
 * in the provided url
 *
 * @method parseVideoUrl_v1_0_0
 * @param url
 * @return {String} 'true'/'false'
 */
exports.parseVideoUrl_v1_0_0 = function (url) {
    var urlArray = config.fetchedUrlConfig.allowedVideoUrls;
    var arrayLength = config.fetchedUrlConfig.allowedVideoUrls.length;
    var matches = null;
    var service = config.fetchedUrlConfig.urlProvider;
    var isMatched = 'false';
    return new promise(function (resolveFirstPromise) {
        var promiseFor = promise.method(function (condition, action, value) {
            if (!condition(value)) return value;
            return action(value).then(promiseFor.bind(null, condition, action));
        });
        promiseFor(function (counter) {
                return counter < arrayLength;
            },
            function (counter) {
                var target = urlArray[counter];
                return new promise(function (resolveSecondPromise) {
                    if ((matches = target.pattern.exec(url)) !== null) {
                        service = target.provider;
                        isMatched = 'true';
                        resolveSecondPromise(isMatched);
                    } else {
                        resolveSecondPromise(isMatched);
                    }
                })
                    .then(function () {
                        if (isMatched == 'true') {
                            counter = arrayLength;
                        } else {
                            return ++counter;
                        }
                    })
            }, 0)
            .then(function () {
                resolveFirstPromise(service);
            });
    }).then(function (resultFirstPromise) {
            return resultFirstPromise;
        })
};

/**
 * Returns the aspect ratios for
 * resize post image on provided
 * widht
 *
 * @method postResizeRatio_v1_0_0
 * @param {Number} width
 * @return {Array} post resize ratio
 */
exports.postResizeRatio_v1_0_0 = function (width) {
    return new promise(function (resolveRatio) {
        var ratios = [];
        if (width <= 1024) {
            ratios = config.thumbSize.postLesser1024; // array
        } else if (width > 1024 && width <= 2048) {
            ratios = config.thumbSize.postGreater1024; // array
        }
        resolveRatio(ratios)
    })
        .then(function (ratioArray) {
            return ratioArray;
        });
};

/**
 * Records the listen and views count
 * of audio and video file
 *
 * @method viewsCount_v1_0_0
 * @param {Number} session_uid
 * @param {Number} target_id
 * @param {String} target_type
 * @param {Object} req
 * @return {Null}
 */
exports.viewsCount_v1_0_0 = function (session_uid, target_id, target_type, req) {
    return dbHelper.insertLocation_v1_0_0(req)
        .then(function (id) {
            var model = require('../models');
            if (target_type == "VIDEO") {
                model.views_video.create({
                    uid: session_uid,
                    video_file_id: target_id,
                    location_id: id,
                    created: helper.getUnixTimeStamp_v1_0_0()
                }).then(function () {
                    return;
                })
            }
            else if (target_type == "AUDIO") {
                model.listen_audio.create({
                    uid: session_uid,
                    audio_file_id: target_id,
                    location_id: id,
                    created: helper.getUnixTimeStamp_v1_0_0()
                }).then(function () {
                    return;
                })
            } else {
                return;
            }
        })
};

//#####################################################################
//########################### Create Thumbs ###########################
//#####################################################################

/**
 * Core function for creating thumbnails
 * of images like post,comments,goal,user-profile
 * user-cover
 *
 * @method createThumbnails_v1_0_0
 * @param {Object} uploadedFileProperties
 * @param {Number} xOrdinate
 * @param {Number} yOrdinate
 * @returns {Boolean} true/false
 */
exports.createThumbnails_v1_0_0 = function (uploadedFileProperties, xOrdinate, yOrdinate) {
    return new promise(function (resolveImageModified) {
        var thumbDirLength = uploadedFileProperties.thumbDirNames.length;
        var sourcePath = uploadedFileProperties.uploadedFilePath;
        if (thumbDirLength > 0) {
            var promiseFor = promise.method(function (condition, action, value) {
                if (!condition(value)) return value;
                return action(value).then(promiseFor.bind(null, condition, action));
            });
            promiseFor(function (counter) {
                    return counter < thumbDirLength;
                },
                function (counter) {
                    return new promise(function (resolve) {
                        var destinationPath = uploadedFileProperties.thumbDirPath + uploadedFileProperties.thumbDirNames[counter] + '/';
                        fs.stat(destinationPath, function (err, stat) {
                            if (err == null) {
                                destinationPath = destinationPath + uploadedFileProperties.fileName + uploadedFileProperties.fileExt;
                                if (uploadedFileProperties.fileOf == 'POST' || uploadedFileProperties.fileOf == 'CONTRIBUTE' || uploadedFileProperties.fileOf == 'COMMENT') {
                                    //image is of POST, CONTRIBUTE, COMMENT
                                    if (uploadedFileProperties.thumbDirNames[counter] == 'square') {
                                        gm(sourcePath)
                                            .resize(config.thumbSize.square.width, config.thumbSize.square.height, '^')
                                            .gravity('Center')
                                            .quality(92)
                                            .crop(config.thumbSize.square.width, config.thumbSize.square.height, xOrdinate, yOrdinate)
                                            .write(destinationPath, function (err) {
                                                if (err) {
                                                    console.log('========= Failed to Create Thumb =======', err);
                                                    throw new Error('Failed to Create Thumb');
                                                } else {
                                                    //nothing to throw
                                                    console.log('========= Thumb Created Successfully ==========');
                                                    resolve(true);
                                                }
                                            });
                                    }
                                    else {
                                        return helper.postResizeRatio_v1_0_0(uploadedFileProperties.width)
                                            .then(function (ratioArray) {
                                                if (ratioArray.length > 0) {
                                                    var resizeWidth = Math.floor((parseFloat(ratioArray[counter])) * (uploadedFileProperties.width));
                                                    var resizeHeight = Math.floor((parseFloat(ratioArray[counter])) * (uploadedFileProperties.height));
                                                    uploadedFileProperties.thumbSizes[counter].width = resizeWidth;
                                                    uploadedFileProperties.thumbSizes[counter].height = resizeHeight;
                                                    gm(sourcePath)
                                                        .resize(resizeWidth, resizeHeight, '^')
                                                        .noProfile()
                                                        .write(destinationPath, function (err) {
                                                            if (err) {
                                                                console.log('========= Failed to Create Thumb =======', err);
                                                                throw new Error('Failed to Create Thumb');
                                                            } else {
                                                                //nothing to throw
                                                                console.log('========= Thumb Created Successfully ==========');
                                                                resolve(true);
                                                            }
                                                        });
                                                } else {
                                                    console.log('=========  Failed to Create thumb Post Resize Ratio is out of Range ========= ');
                                                    throw new Error('Failed to Create Thumb');
                                                }
                                            });
                                    }
                                }
                                else if (uploadedFileProperties.fileOf == 'USERPROFILE' || uploadedFileProperties.fileOf == 'USERCOVER' || uploadedFileProperties.fileOf == 'GOAL' || uploadedFileProperties.fileOf == 'DEFAULTUSERPROFILE' || uploadedFileProperties.fileOf == 'DEFAULTUSERCOVER' || uploadedFileProperties.fileOf == 'DEFAULTGOAL' || uploadedFileProperties.fileOf == 'LIBRARY' || uploadedFileProperties.fileOf == 'CATEGORY' || uploadedFileProperties.fileOf == 'SUBCATEGORY' || uploadedFileProperties.fileOf == 'BANNER' || uploadedFileProperties.fileOf == 'URLIMAGE') {
                                    //image is of other than POST, CONTRIBUTE, COMMENT
                                    var cropImage = gm(sourcePath);
                                    if (uploadedFileProperties.thumbDirNames[counter] == 'square') {
                                        gm(sourcePath)
                                            .resize(config.thumbSize.square.width, config.thumbSize.square.height, '^')
                                            .gravity('Center')
                                            .quality(92)
                                            .crop(config.thumbSize.square.width, config.thumbSize.square.height, xOrdinate, yOrdinate)
                                            .write(destinationPath, function (err) {
                                                if (err) {
                                                    console.log('========= Failed to Create Thumb =======', err);
                                                    throw new Error('Failed to Create Thumb');
                                                } else {
                                                    //nothing to throw
                                                    console.log('========= Thumb Created Successfully ==========');
                                                    resolve(true);
                                                }
                                            });

                                    }
                                    else {
                                        cropImage.resize(uploadedFileProperties.thumbSizes[counter].width, uploadedFileProperties.thumbSizes[counter].height, '^');
                                        cropImage.gravity('Center');
                                        cropImage.quality(92);
                                        cropImage.crop(uploadedFileProperties.thumbSizes[counter].width, uploadedFileProperties.thumbSizes[counter].height, xOrdinate, yOrdinate);
                                        cropImage.write(destinationPath, function (err) {
                                            if (err) {
                                                console.log('========= Failed to Create Thumb =======', err);
                                                throw new Error('Failed to Create Thumb');
                                            } else {
                                                //nothing to throw
                                                console.log('========= Thumb Created Successfully ==========');
                                                resolve(true);
                                            }
                                        });
                                    }
                                }
                            }
                            else if (err.code == 'ENOENT') {
                                console.log('========= Failed to Create Thumb =======', err);
                                throw new Error('Failed to Create Thumb');
                            } else {
                                console.log('========= Failed to Create Thumb =======', err);
                                throw new Error('Failed to Create Thumb');
                            }
                        });
                    })
                        .then(function () {
                            return ++counter;
                        });
                }, 0)
                .then(function () {
                    resolveImageModified(true);
                })
        } else {
            resolveImageModified(false);
        }
    })
        .then(function (result) {
            return result;
        })
        .catch(function (err) {
            if (err == 'Failed to Create Thumb') {
                return false;
            }
        })
};

/**
 * Core function for creating
 * thumbs on custom parameters i-e
 * width,height and rotation degrees
 *
 * @method createThumbnailsOfCustomizedCroppedImage_v1_0_0
 * @param {String} uploadedFileProperties
 * @param {Number} thumbData
 * @param {Number} noOfThumbs
 * @returns {Boolean} true/false
 */
exports.createThumbnailsOfCustomizedCroppedImage_v1_0_0 = function (uploadedFileProperties, thumbData, noOfThumbs) {
    return new promise(function (resolve) {
        var promiseFor = promise.method(function (condition, action, value) {
            if (!condition(value)) return value;
            return action(value).then(promiseFor.bind(null, condition, action));
        });
        promiseFor(function (counter) {
            return counter < noOfThumbs;
        }, function (counter) {
            return new promise(function (innerResolve) {
                var destinationPath = thumbData[counter].path + uploadedFileProperties.fileName + uploadedFileProperties.fileExt;
                if (uploadedFileProperties.fileOf == 'POST' || uploadedFileProperties.fileOf == 'CONTRIBUTE' || uploadedFileProperties.fileOf == 'COMMENT') {
                    if (thumbData[counter].sizetype == 'SQUARE') {
                        gm(uploadedFileProperties.newDestinationPath)
                            .resize(config.thumbSize.square.width, config.thumbSize.square.height, '^')
                            .gravity('Center')
                            .quality(92)
                            .crop(150, 150, 0, 0)
                            .write(destinationPath, function (err) {
                                if (err) {
                                    console.log(' ========= Failed to Create Thumb ======= ', err);
                                    throw new Error('Failed to Create Thumb');
                                } else {
                                    //nothing to throw
                                    console.log('========= Thumb Created Successfully ==========');
                                    innerResolve(true);
                                }
                            });
                    }
                    else {
                        return helper.postResizeRatio_v1_0_0(thumbData[counter].width)
                            .then(function (ratioArray) {
                                if (ratioArray.length > 0) {
                                    var resizeWidth = Math.floor((parseFloat(ratioArray[counter])) * (uploadedFileProperties.width));
                                    var resizeHeight = Math.floor((parseFloat(ratioArray[counter])) * (uploadedFileProperties.height));
                                    thumbData[counter].width = resizeWidth;
                                    thumbData[counter].height = resizeHeight;
                                    gm(uploadedFileProperties.newDestinationPath)
                                        .resize(resizeWidth, resizeHeight, '^')
                                        .noProfile()
                                        .write(destinationPath, function (err) {
                                            if (err) {
                                                console.log(' ========= Failed to Create Thumb ======= ', err);
                                                throw new Error('Failed to Create Thumb');
                                            } else {
                                                //nothing to throw
                                                console.log(' ========= Thumb Created Successfully ========== ');
                                                innerResolve(true);
                                            }
                                        });
                                } else {
                                    console.log(' ========= Failed to Create thumb Post Resize Ratio is out of Range ========= ');
                                    throw new Error('Failed to Create Thumb');
                                }
                            });
                    }
                }
                else if (uploadedFileProperties.fileOf == 'USERPROFILE' || uploadedFileProperties.fileOf == 'USERCOVER' || uploadedFileProperties.fileOf == 'GOAL' || uploadedFileProperties.fileOf == 'DEFAULTUSERPROFILE' || uploadedFileProperties.fileOf == 'DEFAULTUSERCOVER' || uploadedFileProperties.fileOf == 'DEFAULTGOAL' || uploadedFileProperties.fileOf == 'LIBRARY' || uploadedFileProperties.fileOf == 'CATEGORY' || uploadedFileProperties.fileOf == 'SUBCATEGORY' || uploadedFileProperties.fileOf == 'BANNER') {
                    if (thumbData[counter].sizetype == 'SQUARE') {
                        gm(uploadedFileProperties.newDestinationPath)
                            .resize(config.thumbSize.square.width, config.thumbSize.square.height, '^')
                            .gravity('Center')
                            .quality(92)
                            .crop(150, 150, 0, 0)
                            .write(destinationPath, function (err) {
                                if (err) {
                                    console.log(' ========= Failed to Create Thumb ======= ', err);
                                    throw new Error('Failed to Create Thumb');
                                } else {
                                    console.log(' ========= Thumb Created Successfully ========== ');
                                    innerResolve(true);
                                }
                            });
                    }
                    else {
                        return gm(uploadedFileProperties.newDestinationPath)
                            .resize(thumbData[counter].width, thumbData[counter].height, '^')
                            .gravity('Center')
                            .quality(92)
                            .crop(thumbData[counter].width, thumbData[counter].height, 0, 0)
                            .write(thumbData[counter].path + uploadedFileProperties.fileName + uploadedFileProperties.fileExt, function (err) {
                                if (err) {
                                    console.log(' ========= Failed to Create Thumb ======= ', err);
                                    throw new Error('Failed to Create Thumb');
                                } else {
                                    //nothing to throw
                                    console.log('=========  Thumb Created Successfully ==========');
                                    innerResolve(true);
                                }
                            });
                    }
                }
            })
                .then(function () {
                    return ++counter;
                });
        }, 0)
            .then(function () {
                resolve(true);
            });
    })
        .then(function (result) {
            return result;
        })
        .catch(function (err) {
            if (err == 'Failed to Create Thumb') {
                return false;
            }
        });
};

/**
 * Core function for creating
 * thumbnails of Image extracted
 * from URL
 *
 * @method createThumbnailsOfUrlImage_v1_0_0
 * @param {String} uploadedFileProperties
 * @param {Number} xOrdinate
 * @param {Number} yOrdinate
 * @returns {Boolean} true/false
 */
exports.createThumbnailsOfUrlImage_v1_0_0 = function (uploadedFileProperties, xOrdinate, yOrdinate) {
    return new promise(function (resolve) {
        var sourcePath = uploadedFileProperties.uploadedFilePath;
        var createThumb = gm(sourcePath); //source path
        var noOfThumbs = uploadedFileProperties.thumbDirNames.length;
        var promiseFor = promise.method(function (condition, action, value) {
            if (!condition(value)) return value;
            return action(value).then(promiseFor.bind(null, condition, action));
        });
        promiseFor(function (counter) {
                return counter < noOfThumbs;
            },
            function (counter) {
                return new promise(function (innerResolve) {
                    fs.stat(sourcePath, function (err, stat) {
                        if (err == null) {
                            var destinationPath = uploadedFileProperties.thumbDirPath + uploadedFileProperties.fileName + uploadedFileProperties.fileExt;
                            createThumb.resize(uploadedFileProperties.thumbSizes[counter].width, uploadedFileProperties.thumbSizes[counter].height, '^');
                            createThumb.gravity('Center');
                            createThumb.quality(92);
                            createThumb.crop(uploadedFileProperties.thumbSizes[counter].width, uploadedFileProperties.thumbSizes[counter].height, xOrdinate, yOrdinate);
                            createThumb.write(destinationPath, function (err) {
                                if (err) {
                                    console.log(' ========= Failed to Create Thumb ======= ', err);
                                    throw new Error('Failed to Create Thumb');
                                } else {
                                    //nothing to throw
                                    console.log(' ========= Thumb Created Successfully ========== ');
                                    innerResolve(true);
                                }
                            });
                        }
                        else if (err.code == 'ENOENT') {
                            console.log(' ========= Failed to Create Thumb ======= ', err);
                            throw new Error('Failed to Create Thumb');
                        } else {
                            console.log(' ========= Failed to Create Thumb ======= ', err);
                            throw new Error('Failed to Create Thumb');
                        }
                    });
                })
                    .then(function () {
                        return ++counter;
                    });
            }, 0)
            .then(function () {
                resolve(true);
            })

    })
        .then(function (result) {
            return result;
        });
};

/**
 * Core function for creating
 * thumbnails of Gif Image
 *
 * @method createThumbnailsOfGifImage_v1_0_0
 * @param {String} uploadedFileProperties
 * @param {Number} xOrdinate
 * @param {Number} yOrdinate
 * @return {Boolean} true/false
 */
exports.createThumbnailsOfGifImage_v1_0_0 = function (uploadedFileProperties, xOrdinate, yOrdinate) {
    return new promise(function (resolveImageModified) {
        var thumbDirLength = uploadedFileProperties.thumbDirNames.length;
        var sourcePath = uploadedFileProperties.uploadedFilePath;
        if (thumbDirLength > 0) {
            var promiseFor = promise.method(function (condition, action, value) {
                if (!condition(value)) return value;
                return action(value).then(promiseFor.bind(null, condition, action));
            });
            promiseFor(function (counter) {
                    return counter < thumbDirLength;
                },
                function (counter) {
                    return new promise(function (resolve) {
                        var destinationPath = uploadedFileProperties.thumbDirPath + uploadedFileProperties.thumbDirNames[counter] + '/';
                        fs.stat(destinationPath, function (err, stat) {
                            if (err == null) {
                                destinationPath = destinationPath + uploadedFileProperties.fileName + uploadedFileProperties.fileExt;
                                if (uploadedFileProperties.fileOf == 'POST' || uploadedFileProperties.fileOf == 'CONTRIBUTE' || uploadedFileProperties.fileOf == 'COMMENT') {
                                    //image is of POST, CONTRIBUTE, COMMENT
                                    if (uploadedFileProperties.thumbDirNames[counter] == 'square') {
                                        imageMagick(sourcePath)
                                            .coalesce()
                                            .resize(config.thumbSize.square.width, config.thumbSize.square.height, '^')
                                            .noProfile()
                                            .crop(config.thumbSize.square.width, config.thumbSize.square.height, xOrdinate, yOrdinate)
                                            .write(destinationPath, function (err) {
                                                if (err) {
                                                    console.log(' ========= Failed to Create Thumb ======= ', err);
                                                    throw new Error('Failed to Create Thumb');
                                                } else {
                                                    //nothing to throw
                                                    console.log(' ========= Thumb Created Successfully ========== ');
                                                    resolve(true);
                                                }
                                            });
                                    }
                                    else {
                                        return helper.postResizeRatio_v1_0_0(uploadedFileProperties.width)
                                            .then(function (ratioArray) {
                                                if (ratioArray.length > 0) {
                                                    var resizeWidth = Math.floor((parseFloat(ratioArray[counter])) * (uploadedFileProperties.width));
                                                    var resizeHeight = Math.floor((parseFloat(ratioArray[counter])) * (uploadedFileProperties.height));
                                                    uploadedFileProperties.thumbSizes[counter].width = resizeWidth;
                                                    uploadedFileProperties.thumbSizes[counter].height = resizeHeight;
                                                    imageMagick(sourcePath)
                                                        .coalesce()
                                                        .resize(resizeWidth, resizeHeight, '^')
                                                        .noProfile()
                                                        .write(destinationPath, function (err) {
                                                            if (err) {
                                                                console.log(' ========= Failed to Create Thumb ======= ', err);
                                                                throw new Error('Failed to Create Thumb');
                                                            } else {
                                                                //nothing to throw
                                                                console.log(' ========= Thumb Created Successfully ========== ');
                                                                resolve(true);
                                                            }
                                                        });
                                                } else {
                                                    console.log(' ========= Failed to Create thumb Post Resize Ratio is out of Range  ========= ');
                                                    throw new Error('Failed to Create Thumb');
                                                }
                                            });
                                    }
                                }
                                else if (uploadedFileProperties.fileOf == 'USERPROFILE' || uploadedFileProperties.fileOf == 'USERCOVER' || uploadedFileProperties.fileOf == 'GOAL' || uploadedFileProperties.fileOf == 'DEFAULTUSERPROFILE' || uploadedFileProperties.fileOf == 'DEFAULTUSERCOVER' || uploadedFileProperties.fileOf == 'DEFAULTGOAL' || uploadedFileProperties.fileOf == 'LIBRARY' || uploadedFileProperties.fileOf == 'CATEGORY' || uploadedFileProperties.fileOf == 'SUBCATEGORY' || uploadedFileProperties.fileOf == 'BANNER' || uploadedFileProperties.fileOf == 'URLIMAGE') {
                                    //image is of other than POST, CONTRIBUTE, COMMENT
                                    var cropImage = imageMagick(sourcePath);
                                    if (uploadedFileProperties.thumbDirNames[counter] == 'square') {
                                        cropImage.coalesce();
                                        cropImage.resize(config.thumbSize.square.width, config.thumbSize.square.height, '^');
                                        cropImage.noProfile();
                                        cropImage.crop(config.thumbSize.square.width, config.thumbSize.square.height, xOrdinate, yOrdinate);
                                        cropImage.write(destinationPath, function (err) {
                                            if (err) {
                                                console.log(' ========= Failed to Create Thumb ======= ', err);
                                                throw new Error('Failed to Create Thumb');
                                            } else {
                                                //nothing to throw
                                                console.log(' ========= Thumb Created Successfully ========== ');
                                                resolve(true);
                                            }
                                        });
                                    }
                                    else {
                                        cropImage.coalesce();
                                        cropImage.resize(uploadedFileProperties.thumbSizes[counter].width, uploadedFileProperties.thumbSizes[counter].height, '^');
                                        cropImage.noProfile();
                                        cropImage.crop(uploadedFileProperties.thumbSizes[counter].width, uploadedFileProperties.thumbSizes[counter].height, xOrdinate, yOrdinate);
                                        cropImage.write(destinationPath, function (err) {
                                            if (err) {
                                                console.log(' ========= Failed to Create Thumb ======= ', err);
                                                throw new Error('Failed to Create Thumb');
                                            } else {
                                                //nothing to throw
                                                console.log(' ========= Thumb Created Successfully ========== ');
                                                resolve(true);
                                            }
                                        });
                                    }
                                }
                            }
                            else if (err.code == 'ENOENT') {
                                console.log(' ========= Failed to Create Thumb ======= ', err);
                                throw new Error('Failed to Create Thumb');
                            } else {
                                console.log(' ========= Failed to Create Thumb ======= ', err);
                                throw new Error('Failed to Create Thumb');
                            }
                        });
                    })
                        .then(function () {
                            return ++counter;
                        });
                }, 0)
                .then(function () {
                    resolveImageModified(true);
                })
        } else {
            resolveImageModified(false);
        }
    })
        .then(function (result) {
            return result;
        })
        .catch(function (err) {
            if (err == 'Failed to Create Thumb') {
                return false;
            }
        })
};

/**
 * Core function for cropping the image
 * on custom parameters i-e
 * width,height and rotation degrees
 *
 * @method cropImageOnCustomParameters_v1_0_0
 * @param {String} destinationPath
 * @param {Number} compressWidth
 * @param {Number} compressHeight
 * @param {Number} customRotation
 * @return {Boolean} true/false
 */
exports.cropImageOnCustomParameters_v1_0_0 = function (uploadedFileProperties, xOrdinate, yOrdinate, customRotation) {
    return new promise(function (resolve) {
        var sourcePath = uploadedFileProperties.uploadedFilePath;
        var customizeCrop = gm(sourcePath);
        var destinationPath = uploadedFileProperties.newDestinationPath;
        if ((config.validRotationDegree.range.indexOf(customRotation) > -1)) {
            customizeCrop.rotate('white', customRotation);
        }
        customizeCrop.quality(92);
        customizeCrop.crop(uploadedFileProperties.width, uploadedFileProperties.height, xOrdinate, yOrdinate);
        customizeCrop.write(destinationPath, function (err) {
            if (err) {
                console.log(' ========= Failed to Crop =======', err);
                throw new Error('Failed to Crop');
            } else {
                console.log(' ======= Cropped Successfully ======== ');
                resolve(true);
            }
        });
    })
        .then(function (result) {
            return result;
        })
        .catch(function (err) {
            if (err == 'Failed to Crop') {
                return false;
            }
        });
};

/**
 * Core function to compress the
 * image file only if it is larger
 * than allowed size
 *
 * @mehod compressOriginalImageFile_v1_0_0
 * @param {String} destinationPath
 * @return {Boolean} true/false
 */
exports.compressOriginalImageFile_v1_0_0 = function (destinationPath) {
    return new promise(function (resolve) {
        var resizeImage = gm(destinationPath);
        resizeImage.autoOrient();
        resizeImage.resize(config.imageConfig.maxWidth, config.imageConfig.maxHeight, '>');
        resizeImage.write(destinationPath, function (err) {
            if (err) {
                console.log(' ======= Error in Compressing/Resizing of Image  ======= ', err);
                throw new Error('Failed');
            } else {
                console.log(' ======= Image Compressed/Resized successfully  ======= ');
                resolve(true);
            }
        });
    })
        .then(function (result) {
            return result;
        })
        .catch(function (err) {
            if (err == 'Failed') {
                return false;
            }
        });
};

/**
 * Core function for compress
 * and converting image file only
 * if it is large than allowed size
 * and not of .jpg extension
 *
 * @method convertAndCompressOriginalImageFile_v1_0_0
 * @param {String} destinationPath
 * @param {String} uploadedFilePath
 * @param {String} convertToExt
 * @return {Boolean} true/false
 */
exports.convertAndCompressOriginalImageFile_v1_0_0 = function (destinationPath, uploadedFilePath, convertToExt) {
    return new promise(function (resolve) {
        var resizeImage = gm(uploadedFilePath);
        resizeImage.setFormat(convertToExt);
        resizeImage.flatten();
        resizeImage.resize(config.imageConfig.maxWidth, config.imageConfig.maxHeight, '>');
        resizeImage.write(destinationPath, function (err) {
            if (err) {
                console.log(' ======= Error in Compressing/Resizing of Image  ======= ', err);
                throw new Error('Failed');
            } else {
                //now deleting the uploaded original image file
                console.log(' ======= Image Compressed/Resized successfully  ======= ');
                fs.unlinkSync(uploadedFilePath);
                resolve(true);
            }
        });
    })
        .then(function (result) {
            return result;
        })
        .catch(function (err) {
            if (err == 'Failed') {
                return false;
            }
        });
};

//#####################################################################
//###################### OBJECTS GENERATORS ###########################
//#####################################################################

/**
 * Generate error object
 * use in sending responce back
 *
 * @method generateErrorObject_v1_0_0
 * @param {Number} code
 * @param {String} field
 * @param {String} message
 * @return {Object} error
 */
exports.generateErrorObject_v1_0_0 = function (code, field, message) {
    var error = {
        code: code,
        field: field,
        message: message
    };

    return error;
};

/**
 * Generate object for
 * uploaded Url image
 *
 * @method getFetchedUrlData_v1_0_0
 * @param {Number} id
 * @return {Object} response
 */
exports.getFetchedUrlData_v1_0_0 = function (id) {
    if (id != null) {
        var model = require('../models');
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
        })
            .then(function (data) {
                if (data != null) {
                    delete data.dataValues.status;
                    delete data.dataValues.updated;
                    delete data.dataValues.created;
                    return data;
                } else {
                    return false;
                }
            });
    } else {
        return new promise(function (resolve) {
            resolve(false);
        })
            .then(function (result) {
                return result;
            });
    }
};








