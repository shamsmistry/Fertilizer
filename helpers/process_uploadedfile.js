/**
 * Helper file for handling operations like upload files to server
 * child for uploadfile controller
 *
 * @class process_uploadedfile
 */


/**
 * Requiring uploadFileHelper helper
 * @property uploadFileHelper
 * @type file
 */
var uploadFileHelper = require('../helpers/process_uploadedfile');
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
 * Requiring helper
 * @property helper
 * @type file
 */
var utility = require('../helpers/utility');

/**
 * Requiring fsExtra(with promise) npm
 * @property fsExtra
 * @type file
 */
var fsExtra = require('fs-extra');
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
/**
 * Requiring multiparty npm
 * @property multiparty
 * @type file
 */
var multiparty = require('multiparty');
/**
 * Requiring imageInfo (extract images widh and height) npm
 * @property imageInfo
 * @type file
 */
var imageInfo = require('imageinfo');
/**
 * Requiring ffmpeg(to process video file) npm
 * @property ffmpeg
 * @type file
 */
var ffmpeg = require('fluent-ffmpeg-extended');
/**
 * Requiring metalib npm
 * @property metalib
 * @type file
 */
var metalib = require('fluent-ffmpeg-extended').Metadata;

//#####################################################################
//########## Process Uploaded File Functions ##########################
//#####################################################################


/**
 * Process the uploaded Image file
 *
 * @method processUploadedImageFile_v1_0_0
 * @param {Object} req
 * @param {Number} uId
 * @param {String} imageType
 * @param {String} folderPath
 * @param {Object} attachedFileProp
 * @return {Object} response
 */
exports.processUploadedImageFile_v1_0_0 = function (req, uId, imageType, folderPath, attachedFileProp) {
    if (imageType != '' || imageType != null) {

        var thumbSizes = [];
        var thumbDirNames = [];

        //Features

        if (imageType == 'profile') {
            thumbSizes = config.thumbSize.profile;
            thumbDirNames = config.thumbNames.profile;
            var pathLength = folderPath.length;
            return new promise(function (resolve) {
                return uploadFileHelper.processOriginalImageFile_v1_0_0(req, uId, folderPath, thumbDirNames, thumbSizes, pathLength, 'USERPROFILE', attachedFileProp)
                    .then(function (uploadResponse) {
                        resolve(uploadResponse);
                    })
            })
                .then(function (uploadResponse) {
                    if (uploadResponse == 'File should be of type Image' || uploadResponse == 'Invalid file found' || uploadResponse == 'No file found' || uploadResponse == 'Error in Resizing Image') {
                        return uploadResponse;
                    }
                    else {
                        //here uploadResponse is correct and returning uploadedFileProperties object
                        return helper.createThumbDirectoryIfNotExist_v1_0_0(uploadResponse)
                            .then(function (directoryCreated) {
                                if (directoryCreated == true) {
                                    return helper.createThumbnails_v1_0_0(uploadResponse, 0, 0, null)
                                        .then(function (thumbnailsResult) {
                                            if (thumbnailsResult == true) {
                                                return dbHelper.saveFileToDatabase_v1_0_0(uploadResponse, null, imageType, null)
                                                    .then(function (data) {
                                                        if (data != null) {
                                                            return {id: data.dataValues.id};
                                                        } else {
                                                            return false;
                                                        }
                                                    });
                                            } else {
                                                return false;
                                            }
                                        });

                                } else {
                                    return directoryCreated; // false
                                }
                            });
                    }
                });
        }
        else if (imageType == 'cover') {
            thumbSizes = config.thumbSize.cover;
            thumbDirNames = config.thumbNames.cover;
            var pathLength = folderPath.length;
            return new promise(function (resolve) {
                return uploadFileHelper.processOriginalImageFile_v1_0_0(req, uId, folderPath, thumbDirNames, thumbSizes, pathLength, 'USERCOVER', attachedFileProp)
                    .then(function (uploadResponse) {
                        resolve(uploadResponse);
                    })
            })
                .then(function (uploadResponse) {
                    if (uploadResponse == 'File should be of type Image' || uploadResponse == 'Invalid file found' || uploadResponse == 'No file found' || uploadResponse == 'Error in Resizing Image') {
                        return uploadResponse;
                    }
                    else {
                        //here uploadResponse is correct and returning uploadedFileProperties object
                        return helper.createThumbDirectoryIfNotExist_v1_0_0(uploadResponse)
                            .then(function (directoryCreated) {
                                if (directoryCreated == true) {
                                    return helper.createThumbnails_v1_0_0(uploadResponse, 0, 0, null)
                                        .then(function (thumbnailsResult) {
                                            if (thumbnailsResult == true) {
                                                return dbHelper.saveFileToDatabase_v1_0_0(uploadResponse, null, imageType, null)
                                                    .then(function (data) {
                                                        if (data != null) {
                                                            return {id: data.dataValues.id};
                                                        } else {
                                                            return false;
                                                        }
                                                    });
                                            } else {
                                                return false;
                                            }
                                        });

                                } else {
                                    return directoryCreated; // false
                                }
                            });
                    }
                });
        }
        else if (imageType == 'goal') {
            thumbSizes = config.thumbSize.goal;
            thumbDirNames = config.thumbNames.goal;
            var pathLength = folderPath.length;
            return new promise(function (resolve) {
                return uploadFileHelper.processOriginalImageFile_v1_0_0(req, uId, folderPath, thumbDirNames, thumbSizes, pathLength, 'GOAL', attachedFileProp)
                    .then(function (uploadResponse) {
                        resolve(uploadResponse);
                    })
            })
                .then(function (uploadResponse) {
                    if (uploadResponse == 'File should be of type Image' || uploadResponse == 'Invalid file found' || uploadResponse == 'No file found' || uploadResponse == 'Error in Resizing Image') {
                        return uploadResponse;
                    }
                    else {
                        //here uploadResponse is correct and returning uploadedFileProperties object
                        return helper.createThumbDirectoryIfNotExist_v1_0_0(uploadResponse)
                            .then(function (directoryCreated) {
                                if (directoryCreated == true) {
                                    return helper.createThumbnails_v1_0_0(uploadResponse, 0, 0, null)
                                        .then(function (thumbnailsResult) {
                                            if (thumbnailsResult == true) {
                                                return dbHelper.saveFileToDatabase_v1_0_0(uploadResponse, null, imageType, null)
                                                    .then(function (data) {
                                                        if (data != null) {
                                                            return {id: data.dataValues.id};
                                                        } else {
                                                            return false;
                                                        }
                                                    });
                                            } else {
                                                return false;
                                            }
                                        });

                                } else {
                                    return directoryCreated; // false
                                }
                            });
                    }
                });
        }
        else if (imageType == 'post') {
            thumbSizes = config.thumbSize.post;
            thumbDirNames = config.thumbNames.post;
            var pathLength = folderPath.length;
            return new promise(function (resolve) {
                return uploadFileHelper.processOriginalImageFile_v1_0_0(req, uId, folderPath, thumbDirNames, thumbSizes, pathLength, 'POST', attachedFileProp)
                    .then(function (uploadResponse) {
                        resolve(uploadResponse);
                    })
            })
                .then(function (uploadResponse) {
                    if (uploadResponse == 'File should be of type Image' || uploadResponse == 'Invalid file found' || uploadResponse == 'No file found' || uploadResponse == 'Error in Resizing Image') {
                        return uploadResponse;
                    }
                    else {
                        //here uploadResponse is correct and returning uploadedFileProperties object
                        return helper.createThumbDirectoryIfNotExist_v1_0_0(uploadResponse)
                            .then(function (directoryCreated) {
                                if (directoryCreated == true) {
                                    return helper.createThumbnails_v1_0_0(uploadResponse, 0, 0, null)
                                        .then(function (thumbnailsResult) {
                                            if (thumbnailsResult == true) {
                                                return dbHelper.saveFileToDatabase_v1_0_0(uploadResponse, null, imageType, null)
                                                    .then(function (data) {
                                                        if (data != null) {
                                                            return {id: data.dataValues.id};
                                                        } else {
                                                            return false;
                                                        }
                                                    });
                                            } else {
                                                return false;
                                            }
                                        });

                                } else {
                                    return directoryCreated; // false
                                }
                            });
                    }
                });
        }
        else if (imageType == 'comment') {
            thumbSizes = config.thumbSize.comment;
            thumbDirNames = config.thumbNames.comment;
            var pathLength = folderPath.length;
            return new promise(function (resolve) {
                return uploadFileHelper.processOriginalImageFile_v1_0_0(req, uId, folderPath, thumbDirNames, thumbSizes, pathLength, 'COMMENT', attachedFileProp)
                    .then(function (uploadResponse) {
                        resolve(uploadResponse);
                    })
            })
                .then(function (uploadResponse) {
                    if (uploadResponse == 'File should be of type Image' || uploadResponse == 'Invalid file found' || uploadResponse == 'No file found' || uploadResponse == 'Error in Resizing Image') {
                        return uploadResponse;
                    }
                    else {
                        //here uploadResponse is correct and returning uploadedFileProperties object
                        return helper.createThumbDirectoryIfNotExist_v1_0_0(uploadResponse)
                            .then(function (directoryCreated) {
                                if (directoryCreated == true) {
                                    return helper.createThumbnails_v1_0_0(uploadResponse, 0, 0, null)
                                        .then(function (thumbnailsResult) {
                                            if (thumbnailsResult == true) {
                                                return dbHelper.saveFileToDatabase_v1_0_0(uploadResponse, null, imageType, null)
                                                    .then(function (data) {
                                                        if (data != null) {
                                                            return {id: data.dataValues.id};
                                                        } else {
                                                            return false;
                                                        }
                                                    });
                                            } else {
                                                return false;
                                            }
                                        });

                                } else {
                                    return directoryCreated; // false
                                }
                            });
                    }
                });
        }

        //albums

        else if (imageType == 'albumprofile') {
            thumbSizes = config.thumbSize.albumProfile;
            thumbDirNames = config.thumbNames.albumProfile;
            var pathLength = folderPath.length;
            return new promise(function (resolve) {
                return uploadFileHelper.processOriginalImageFile_v1_0_0(req, uId, folderPath, thumbDirNames, thumbSizes, pathLength, 'LIBRARY', attachedFileProp)
                    .then(function (uploadResponse) {
                        resolve(uploadResponse);
                    })
            })
                .then(function (uploadResponse) {
                    if (uploadResponse == 'File should be of type Image' || uploadResponse == 'Invalid file found' || uploadResponse == 'No file found' || uploadResponse == 'Error in Resizing Image') {
                        return uploadResponse;
                    }
                    else {
                        //here uploadResponse is correct and returning uploadedFileProperties object
                        return helper.createThumbDirectoryIfNotExist_v1_0_0(uploadResponse)
                            .then(function (directoryCreated) {
                                if (directoryCreated == true) {
                                    return helper.createThumbnails_v1_0_0(uploadResponse, 0, 0, null)
                                        .then(function (thumbnailsResult) {
                                            if (thumbnailsResult == true) {
                                                return dbHelper.saveFileToDatabase_v1_0_0(uploadResponse, null, imageType, null)
                                                    .then(function (data) {
                                                        if (data != null) {
                                                            return {id: data.dataValues.id};
                                                        } else {
                                                            return false;
                                                        }
                                                    });
                                            } else {
                                                return false;
                                            }
                                        });

                                } else {
                                    return directoryCreated; // false
                                }
                            });
                    }
                });
        }
        else if (imageType == 'albumcover') {
            thumbSizes = config.thumbSize.albumCover;
            thumbDirNames = config.thumbNames.albumCover;
            var pathLength = folderPath.length;
            return new promise(function (resolve) {
                return uploadFileHelper.processOriginalImageFile_v1_0_0(req, uId, folderPath, thumbDirNames, thumbSizes, pathLength, 'LIBRARY', attachedFileProp)
                    .then(function (uploadResponse) {
                        resolve(uploadResponse);
                    })
            })
                .then(function (uploadResponse) {
                    if (uploadResponse == 'File should be of type Image' || uploadResponse == 'Invalid file found' || uploadResponse == 'No file found' || uploadResponse == 'Error in Resizing Image') {
                        return uploadResponse;
                    }
                    else {
                        //here uploadResponse is correct and returning uploadedFileProperties object
                        return helper.createThumbDirectoryIfNotExist_v1_0_0(uploadResponse)
                            .then(function (directoryCreated) {
                                if (directoryCreated == true) {
                                    return helper.createThumbnails_v1_0_0(uploadResponse, 0, 0, null)
                                        .then(function (thumbnailsResult) {
                                            if (thumbnailsResult == true) {
                                                return dbHelper.saveFileToDatabase_v1_0_0(uploadResponse, null, imageType, null)
                                                    .then(function (data) {
                                                        if (data != null) {
                                                            return {id: data.dataValues.id};
                                                        } else {
                                                            return false;
                                                        }
                                                    });
                                            } else {
                                                return false;
                                            }
                                        });

                                } else {
                                    return directoryCreated; // false
                                }
                            });
                    }
                });
        }
        else if (imageType == 'albumgoal') {
            thumbSizes = config.thumbSize.goal;
            thumbDirNames = config.thumbNames.goal;
            var pathLength = folderPath.length;
            return new promise(function (resolve) {
                return uploadFileHelper.processOriginalImageFile_v1_0_0(req, uId, folderPath, thumbDirNames, thumbSizes, pathLength, 'LIBRARY', attachedFileProp)
                    .then(function (uploadResponse) {
                        resolve(uploadResponse);
                    })
            })
                .then(function (uploadResponse) {
                    if (uploadResponse == 'File should be of type Image' || uploadResponse == 'Invalid file found' || uploadResponse == 'No file found' || uploadResponse == 'Error in Resizing Image') {
                        return uploadResponse;
                    }
                    else {
                        //here uploadResponse is correct and returning uploadedFileProperties object
                        return helper.createThumbDirectoryIfNotExist_v1_0_0(uploadResponse)
                            .then(function (directoryCreated) {
                                if (directoryCreated == true) {
                                    return helper.createThumbnails_v1_0_0(uploadResponse, 0, 0, null)
                                        .then(function (thumbnailsResult) {
                                            if (thumbnailsResult == true) {
                                                return dbHelper.saveFileToDatabase_v1_0_0(uploadResponse, null, imageType, null)
                                                    .then(function (data) {
                                                        if (data != null) {
                                                            return {id: data.dataValues.id};
                                                        } else {
                                                            return false;
                                                        }
                                                    });
                                            } else {
                                                return false;
                                            }
                                        });

                                } else {
                                    return directoryCreated; // false
                                }
                            });
                    }
                });
        }

        //explore page

        else if (imageType == 'category') {
            thumbSizes = config.thumbSize.categories;
            thumbDirNames = config.thumbNames.categories;
            var pathLength = folderPath.length;
            return new promise(function (resolve) {
                return uploadFileHelper.processOriginalImageFile_v1_0_0(req, uId, folderPath, thumbDirNames, thumbSizes, pathLength, 'CATEGORY', attachedFileProp)
                    .then(function (uploadResponse) {
                        resolve(uploadResponse);
                    })
            })
                .then(function (uploadResponse) {
                    if (uploadResponse == 'File should be of type Image' || uploadResponse == 'Invalid file found' || uploadResponse == 'No file found' || uploadResponse == 'Error in Resizing Image') {
                        return uploadResponse;
                    }
                    else {
                        //here uploadResponse is correct and returning uploadedFileProperties object
                        return helper.createThumbDirectoryIfNotExist_v1_0_0(uploadResponse)
                            .then(function (directoryCreated) {
                                if (directoryCreated == true) {
                                    return helper.createThumbnails_v1_0_0(uploadResponse, 0, 0, null)
                                        .then(function (thumbnailsResult) {
                                            if (thumbnailsResult == true) {
                                                return dbHelper.saveFileToDatabase_v1_0_0(uploadResponse, null, imageType, null)
                                                    .then(function (data) {
                                                        if (data != null) {
                                                            return {id: data.dataValues.id};
                                                        } else {
                                                            return false;
                                                        }
                                                    });
                                            } else {
                                                return false;
                                            }
                                        });

                                } else {
                                    return directoryCreated; // false
                                }
                            });
                    }
                });
        }
        else if (imageType == 'subcategory') {
            thumbSizes = config.thumbSize.subCategories;
            thumbDirNames = config.thumbNames.subCategories;
            var pathLength = folderPath.length;
            return new promise(function (resolve) {
                return uploadFileHelper.processOriginalImageFile_v1_0_0(req, uId, folderPath, thumbDirNames, thumbSizes, pathLength, 'SUBCATEGORY', attachedFileProp)
                    .then(function (uploadResponse) {
                        resolve(uploadResponse);
                    })
            })
                .then(function (uploadResponse) {
                    if (uploadResponse == 'File should be of type Image' || uploadResponse == 'Invalid file found' || uploadResponse == 'No file found' || uploadResponse == 'Error in Resizing Image') {
                        return uploadResponse;
                    }
                    else {
                        //here uploadResponse is correct and returning uploadedFileProperties object
                        return helper.createThumbDirectoryIfNotExist_v1_0_0(uploadResponse)
                            .then(function (directoryCreated) {
                                if (directoryCreated == true) {
                                    return helper.createThumbnails_v1_0_0(uploadResponse, 0, 0, null)
                                        .then(function (thumbnailsResult) {
                                            if (thumbnailsResult == true) {
                                                return dbHelper.saveFileToDatabase_v1_0_0(uploadResponse, null, imageType, null)
                                                    .then(function (data) {
                                                        if (data != null) {
                                                            return {id: data.dataValues.id};
                                                        } else {
                                                            return false;
                                                        }
                                                    });
                                            } else {
                                                return false;
                                            }
                                        });

                                } else {
                                    return directoryCreated; // false
                                }
                            });
                    }
                });
        }
        else if (imageType == 'banner') {
            thumbSizes = config.thumbSize.banner;
            thumbDirNames = config.thumbNames.banner;
            var pathLength = folderPath.length;
            return new promise(function (resolve) {
                return uploadFileHelper.processOriginalImageFile_v1_0_0(req, uId, folderPath, thumbDirNames, thumbSizes, pathLength, 'BANNER', attachedFileProp)
                    .then(function (uploadResponse) {
                        resolve(uploadResponse);
                    })
            })
                .then(function (uploadResponse) {
                    if (uploadResponse == 'File should be of type Image' || uploadResponse == 'Invalid file found' || uploadResponse == 'No file found' || uploadResponse == 'Error in Resizing Image') {
                        return uploadResponse;
                    }
                    else {
                        //here uploadResponse is correct and returning uploadedFileProperties object
                        return helper.createThumbDirectoryIfNotExist_v1_0_0(uploadResponse)
                            .then(function (directoryCreated) {
                                if (directoryCreated == true) {
                                    return helper.createThumbnails_v1_0_0(uploadResponse, 0, 0, null)
                                        .then(function (thumbnailsResult) {
                                            if (thumbnailsResult == true) {
                                                return dbHelper.saveFileToDatabase_v1_0_0(uploadResponse, null, imageType, null)
                                                    .then(function (data) {
                                                        if (data != null) {
                                                            return {id: data.dataValues.id};
                                                        } else {
                                                            return false;
                                                        }
                                                    });
                                            } else {
                                                return false;
                                            }
                                        });

                                } else {
                                    return directoryCreated; // false
                                }
                            });
                    }
                });
        }

        //default

        else if (imageType == 'defaultprofile') {
            thumbSizes = config.thumbSize.profile;
            thumbDirNames = config.thumbNames.profile;
            return new promise(function (resolve) {
                return uploadFileHelper.processDefaultImage_v1_0_0(req, folderPath, thumbDirNames, thumbSizes, null, 'DEFAULTUSERPROFILE', config.defaultImages.profile)
                    .then(function (uploadResponse) {
                        resolve(uploadResponse);
                    })
            })
                .then(function (uploadResponse) {
                    if (uploadResponse == 'File should be of type Image' || uploadResponse == 'Invalid file found' || uploadResponse == 'No file found' || uploadResponse == 'Error in Resizing Image') {
                        return uploadResponse;
                    }
                    else {
                        //here uploadResponse is correct and returning uploadedFileProperties object
                        return helper.createThumbDirectoryIfNotExist_v1_0_0(uploadResponse)
                            .then(function (directoryCreated) {
                                if (directoryCreated == true) {
                                    return helper.createThumbnails_v1_0_0(uploadResponse, 0, 0, null)
                                        .then(function (thumbnailsResult) {
                                            if (thumbnailsResult == true) {
                                                return dbHelper.saveFileToDatabase_v1_0_0(uploadResponse, null, imageType, null)
                                                    .then(function (data) {
                                                        if (data != null) {
                                                            return {id: data.dataValues.id};
                                                        } else {
                                                            return false;
                                                        }
                                                    });
                                            } else {
                                                return false;
                                            }
                                        });

                                } else {
                                    return directoryCreated; // false
                                }
                            });
                    }
                });
        }
        else if (imageType == 'defaultcover') {
            thumbSizes = config.thumbSize.cover;
            thumbDirNames = config.thumbNames.cover;
            return new promise(function (resolve) {
                return uploadFileHelper.processDefaultImage_v1_0_0(req, folderPath, thumbDirNames, thumbSizes, null, 'DEFAULTUSERCOVER', config.defaultImages.cover)
                    .then(function (uploadResponse) {
                        resolve(uploadResponse);
                    })
            })
                .then(function (uploadResponse) {
                    if (uploadResponse == 'File should be of type Image' || uploadResponse == 'Invalid file found' || uploadResponse == 'No file found' || uploadResponse == 'Error in Resizing Image') {
                        return uploadResponse;
                    }
                    else {
                        //here uploadResponse is correct and returning uploadedFileProperties object
                        return helper.createThumbDirectoryIfNotExist_v1_0_0(uploadResponse)
                            .then(function (directoryCreated) {
                                if (directoryCreated == true) {
                                    return helper.createThumbnails_v1_0_0(uploadResponse, 0, 0, null)
                                        .then(function (thumbnailsResult) {
                                            if (thumbnailsResult == true) {
                                                return dbHelper.saveFileToDatabase_v1_0_0(uploadResponse, null, imageType, null)
                                                    .then(function (data) {
                                                        if (data != null) {
                                                            return {id: data.dataValues.id};
                                                        } else {
                                                            return false;
                                                        }
                                                    });
                                            } else {
                                                return false;
                                            }
                                        });

                                } else {
                                    return directoryCreated; // false
                                }
                            });
                    }
                });
        }
        else if (imageType == 'defaultgoal') {

            thumbSizes = config.thumbSize.goal;
            thumbDirNames = config.thumbNames.goal;
            return new promise(function (resolve) {
                return uploadFileHelper.processDefaultImage_v1_0_0(req, folderPath, thumbDirNames, thumbSizes, null, 'DEFAULTGOAL', config.defaultImages.goal)
                    .then(function (uploadResponse) {
                        resolve(uploadResponse);
                    })
            })
                .then(function (uploadResponse) {
                    if (uploadResponse == 'File should be of type Image' || uploadResponse == 'Invalid file found' || uploadResponse == 'No file found' || uploadResponse == 'Error in Resizing Image') {
                        return uploadResponse;
                    }
                    else {
                        //here uploadResponse is correct and returning uploadedFileProperties object
                        return helper.createThumbDirectoryIfNotExist_v1_0_0(uploadResponse)
                            .then(function (directoryCreated) {
                                if (directoryCreated == true) {
                                    return helper.createThumbnails_v1_0_0(uploadResponse, 0, 0, null)
                                        .then(function (thumbnailsResult) {
                                            if (thumbnailsResult == true) {
                                                return dbHelper.saveFileToDatabase_v1_0_0(uploadResponse, null, imageType, null)
                                                    .then(function (data) {
                                                        if (data != null) {
                                                            return {id: data.dataValues.id};
                                                        } else {
                                                            return false;
                                                        }
                                                    });
                                            } else {
                                                return false;
                                            }
                                        });

                                } else {
                                    return directoryCreated; // false
                                }
                            });
                    }
                });
        }

        else {
            return new promise(function (resolve) {
                resolve(false);
            })
                .then(function (result) {
                    return result;
                })
        }
    }
};

/**
 * Save the uploaded Image to directory
 *
 * @method processOriginalImageFile_v1_0_0
 * @param {Object} req
 * @param {Number} uId
 * @param {String} folderPath
 * @param {String} thumbDirNames
 * @param {String} thumbSizes
 * @param {String} pathLength
 * @param {String} parentType
 * @param {Object} files
 * @return {Object} response
 */
exports.processOriginalImageFile_v1_0_0 = function (req, uId, folderPath, thumbDirNames, thumbSizes, pathLength, parentType, files) {
    return new promise(function (resolve) {
        var uploadedFilePath = files.uploadfile[0]['path'];
        var fileName = utility.extractFileName_v1_0_0(uploadedFilePath, pathLength);
        var fileExtension = utility.extractFileExtension_v1_0_0(files.uploadfile[0]['originalFilename']);
        var isValidFileExt = helper.isValidFileExtension_v1_0_0(fileExtension);
        if (isValidFileExt.validity == "false") {
            //delete file as file is not of valid extension
            console.log(' ======= Invalid file found  ======= ');
            fs.unlinkSync(uploadedFilePath);
            resolve('Invalid file found');
        } else {
            console.log(' ======= File has the valid Extension  ======= ');
            var uploadedFileType = isValidFileExt.fileType;
            if (uploadedFileType == 'IMAGE') {
                return new promise(function (resolveProcessingImage) {
                    if (parentType == 'CATEGORY' || parentType == 'SUBCATEGORY' || parentType == 'BANNER') {
                        return helper.compressOriginalImageFile_v1_0_0(uploadedFilePath)
                            .then(function (result) {
                                if (result) {
                                    resolveProcessingImage(true);
                                } else {
                                    resolveProcessingImage('Error in Resizing Image');
                                }
                            });
                    }
                    else {
                        //if file extension is other than jpg then
                        //convert it to jpg and delete the original file
                        if (fileExtension != '.jpg') {
                            fileExtension = '.' + config.imageConfig.setExtension;
                            var destinationPath = folderPath + fileName + fileExtension;  // the new destination path with .jpg ext
                            return helper.convertAndCompressOriginalImageFile_v1_0_0(destinationPath, uploadedFilePath, config.imageConfig.setExtension)
                                .then(function (result) {
                                    if (result) {
                                        //the original file path will be now override to new path
                                        //i-e path with converted extension
                                        uploadedFilePath = destinationPath;
                                        resolveProcessingImage(true);
                                    } else {
                                        resolveProcessingImage('Error in Resizing Image');
                                    }
                                });
                        }
                        else {
                            return helper.compressOriginalImageFile_v1_0_0(uploadedFilePath)
                                .then(function (result) {
                                    if (result) {
                                        resolveProcessingImage(true);
                                    } else {
                                        resolveProcessingImage('Error in Resizing Image');
                                    }
                                });
                        }
                    }
                })
                    .then(function (resized) {
                        if (resized == true) {
                            var uploadedFileProperties = {};
                            var uploadedFileWidth = 0;
                            var uploadedFileHeight = 0;
                            var uploadedFileInfo = '';

                            //for getting width and height of the uploaded image
                            fs.stat(uploadedFilePath, function (err, stat) {
                                if (err == null) {
                                    return fs.readFile(uploadedFilePath, function (err, data) {
                                        if (err) {
                                            console.log(' ======== No File found ======');
                                            resolve('No file found');
                                        } else {
                                            uploadedFileInfo = imageInfo(data);
                                            uploadedFileWidth = uploadedFileInfo.width;
                                            uploadedFileHeight = uploadedFileInfo.height;
                                            uploadedFileProperties = {
                                                files: files,
                                                fileName: fileName,
                                                fileExtension: fileExtension,
                                                fileType: uploadedFileType,
                                                fileOf: parentType,
                                                filePath: uploadedFilePath,
                                                fileWidth: uploadedFileWidth,
                                                fileHeight: uploadedFileWidth
                                            };
                                            resolve(uploadedFileProperties);
                                        }
                                    });
                                } else if (err.code == 'ENOENT') {
                                    console.log(' ======== No File found ======');
                                    resolve('No file found');
                                } else {
                                    console.log(' ======== No File found ======');
                                    resolve('No file found');
                                }
                            });
                        } else {
                            resolve('Error in Resizing Image');
                        }
                    });
            }
            else {
                //now deleting the original file
                fs.unlinkSync(uploadedFilePath);
            }
        }
    })
        .then(function (uploadResult) {
            //if result value not contains uploadedFileProperties object then return response immediately
            if (uploadResult == 'File should be of type Image' || uploadResult == 'Invalid file found' || uploadResult == 'No file found' || uploadResult == 'Error in Resizing Image') {
                return uploadResult;
            } else {
                var uploadedFileProperties =
                {
                    uId: uId,
                    uploadedFilePath: uploadResult.filePath,
                    fileOf: uploadResult.fileOf,
                    fileName: uploadResult.fileName,
                    fileExt: uploadResult.fileExtension,
                    fileType: uploadResult.fileType,
                    width: uploadResult.fileWidth,
                    height: uploadResult.fileHeight,
                    orgFileDirPath: folderPath,
                    thumbDirPath: folderPath + config.path.thumbDir,
                    thumbSizes: thumbSizes,
                    thumbDirNames: thumbDirNames,
                    videoThumbExtension: null,
                    duration: null,
                    albumId: null
                };
                return uploadedFileProperties;
            }
        })
        .catch(function (err) {
            if (err == 'Failed') {
                return 'Error in Resizing Image';
            }
        });
};

/**
 * Process the uploaded Gif Image
 *
 * @method processUploadedGifImageFile_v1_0_0
 * @param {Object} giphyFileId
 * @param {String} uId
 * @param {String} fileOf
 * @return {Object} response
 */
exports.processUploadedGifImageFile_v1_0_0 = function (giphyFileId, uId, fileOf) {
    return new promise(function (resolve) {
        var dirCounter = "";
        var thumbSizes = "";
        var destinationPath = "";
        var giphyFileObject = {};
        var giphy = require('giphy-api')(config.giphy.apiKey);
        giphy.id(giphyFileId)
            .then(function (fileResponse) {
                if (fileResponse != null || fileResponse != 'null') {
                    var sourceUrl = fileResponse.data[0].images.original.url;
                    var fileName = utility.generateHashedKey_v1_0_0(uId);
                    var fileExtension = '.gif';
                    giphyFileObject = {
                        uId: uId,
                        uploadedFilePath: null,
                        fileOf: null,
                        fileName: fileName,
                        fileExt: fileExtension,
                        fileType: 'IMAGE',
                        width: fileResponse.data[0].images.original.width,
                        height: fileResponse.data[0].images.original.height,
                        orgFileDirPath: null,
                        thumbDirPath: null,
                        thumbDirNames: null,
                        thumbSizes: null,
                        videoThumbExtension: null,
                        duration: null,
                        albumId: null
                    };

                    if (fileOf == 'post') {
                        var imageType = 'post';
                        destinationPath = config.path.uploadDir + uId + '/' + config.path.postDir;
                        giphyFileObject.uploadedFilePath = destinationPath + fileName + fileExtension;
                        giphyFileObject.orgFileDirPath = destinationPath;
                        giphyFileObject.thumbDirPath = destinationPath + config.path.thumbDir;
                        giphyFileObject.thumbSizes = config.thumbSize.post;
                        giphyFileObject.thumbDirNames = config.thumbNames.post;
                        giphyFileObject.fileOf = 'POST';
                    }
                    else if (fileOf == 'comment') {
                        destinationPath = config.path.uploadDir + uId + '/' + config.path.commentDir;
                        giphyFileObject.uploadedFilePath = destinationPath + fileName + fileExtension;
                        giphyFileObject.orgFileDirPath = destinationPath;
                        giphyFileObject.thumbDirPath = destinationPath + config.path.thumbDir;
                        giphyFileObject.thumbSizes = config.thumbSize.comment;
                        giphyFileObject.thumbDirNames = config.thumbNames.comment;
                        giphyFileObject.fileOf = 'COMMENT';
                    }
                    else if (fileOf == 'goal') {
                        destinationPath = config.path.uploadDir + uId + '/' + config.path.goalDir;
                        giphyFileObject.uploadedFilePath = destinationPath + fileName + fileExtension;
                        giphyFileObject.orgFileDirPath = destinationPath;
                        giphyFileObject.thumbDirPath = destinationPath + config.path.thumbDir;
                        giphyFileObject.thumbSizes = config.thumbSize.goal;
                        giphyFileObject.thumbDirNames = config.thumbNames.goal;
                        giphyFileObject.fileOf = 'GOAL';
                    }
                    else if (fileOf == 'profile') {
                        destinationPath = config.path.uploadDir + uId + '/' + config.path.profileDir;
                        giphyFileObject.uploadedFilePath = destinationPath + fileName + fileExtension;
                        giphyFileObject.orgFileDirPath = destinationPath;
                        giphyFileObject.thumbDirPath = destinationPath + config.path.thumbDir;
                        giphyFileObject.thumbSizes = config.thumbSize.profile;
                        giphyFileObject.thumbDirNames = config.thumbNames.profile;
                        giphyFileObject.fileOf = 'USERPROFILE';
                    }
                    else if (fileOf == 'cover') {
                        destinationPath = config.path.uploadDir + uId + '/' + config.path.coverDir;
                        giphyFileObject.uploadedFilePath = destinationPath + fileName + fileExtension;
                        giphyFileObject.orgFileDirPath = destinationPath;
                        giphyFileObject.thumbDirPath = destinationPath + config.path.thumbDir;
                        giphyFileObject.thumbSizes = config.thumbSize.cover;
                        giphyFileObject.thumbDirNames = config.thumbNames.cover;
                        giphyFileObject.fileOf = 'USERCOVER';
                    }
                    else {
                        return false;
                    }
                } else {
                    return false;
                }
                return utility.getFileFromRemoteServer_v1_0_0(sourceUrl, destinationPath + fileName + fileExtension)
                    .then(function (result) {
                        if (result == true) {
                            return helper.createThumbDirectoryIfNotExist_v1_0_0(giphyFileObject)
                                .then(function (directoryCreated) {
                                    if (directoryCreated == true) {
                                        return helper.createThumbnailsOfGifImage_v1_0_0(giphyFileObject, 0, 0, null)
                                            .then(function (thumbnailsResult) {
                                                if (thumbnailsResult == true) {
                                                    return dbHelper.saveFileToDatabase_v1_0_0(giphyFileObject, null, imageType, null)
                                                        .then(function (data) {
                                                            if (data != null) {
                                                                resolve({id: data.dataValues.id});
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
                        } else {
                            resolve(false);
                        }
                    });
            });
    })
        .then(function (result) {
            return result;
        });
};

/**
 * Core function for parse the
 * uploaded file from request
 *
 * @method uploadFileIfAttached_v1_0_0
 * @param {Object} req
 * @param {String} folderPath
 * @return {Object} response
 */
exports.uploadFileIfAttached_v1_0_0 = function (req, folderPath) {
    return new promise(function (promiseResolve) {
        return fsExtra.ensureDir(folderPath, function (err) {
            if (err) {
                promiseResolve('directory not exist');
            }
            else {
                var multiPart = new multiparty.Form({
                    uploadDir: folderPath
                });
                multiPart.parse(req, function (err, fields, files) {
                    if (err) {
                        promiseResolve('error in parsing file');
                    }
                    else if (Object.getOwnPropertyNames(files).length === 0) {
                        promiseResolve('no file attached');
                    }
                    else {
                        if (Object.keys(files) != 'uploadfile') {
                            promiseResolve('field name is invalid');
                        } else {
                            var attachedFileProp = {
                                fields: fields,
                                files: files
                            };
                            promiseResolve(attachedFileProp);
                        }
                    }
                });
            }
        });
    })
        .then(function (promiseResult) {
            return promiseResult;
        });
};

/**
 * Fetch the default image file and process it
 *
 * @method processDefaultImage_v1_0_0
 * @param {Object} req
 * @param {String} folderPath
 * @param {String} thumbDirNames
 * @param {String} thumbSizes
 * @param {String} pathLength
 * @param {String} parentType
 * @param {String} defaultImage
 * @return {Object} response
 */
exports.processDefaultImage_v1_0_0 = function (req, folderPath, thumbDirNames, thumbSizes, pathLength, parentType, defaultImage) {
    var sourcePath = folderPath + defaultImage;
    return new promise(function (resolve) {
        var fileName = null;
        var fileExtension = null;
        var defaultFileProperties = null;
        var isValidFileExt = null;
        fs.stat(folderPath + defaultImage, function (err, stat) {
            if (err == null) {
                defaultFileProperties = utility.extractFileNameAndExtension_v1_0_0(defaultImage);
                if (defaultFileProperties != false) {
                    fileName = defaultFileProperties.name;
                    fileExtension = defaultFileProperties.extension;
                    isValidFileExt = helper.isValidFileExtension_v1_0_0(fileExtension);
                    if (isValidFileExt.validity == "false") {
                        //delete file as file is not of valid extension
                        console.log(' ======= Invalid file found  ======= ');
                        fs.unlinkSync(sourcePath);
                        resolve('Invalid file found');
                    } else {
                        console.log(' ======= File has the valid Extension  ======= ');
                        var fileType = isValidFileExt.fileType;
                        if (fileType == 'IMAGE') {
                            return new promise(function (innerResolve) {
                                if (fileExtension != '.jpg') {
                                    fileExtension = '.' + config.imageConfig.setExtension;
                                    return helper.convertAndCompressOriginalImageFile_v1_0_0(folderPath + fileName + fileExtension, sourcePath, config.imageConfig.setExtension)
                                        .then(function (result) {
                                            if (result) {
                                                innerResolve(true)
                                            } else {
                                                innerResolve('Error in Resizing Image')
                                            }
                                        });
                                } else {
                                    return helper.compressOriginalImageFile_v1_0_0(sourcePath)
                                        .then(function (result) {
                                            if (result) {
                                                innerResolve(true)
                                            } else {
                                                innerResolve('Error in Resizing Image')
                                            }
                                        });
                                }
                            })
                                .then(function (compressed) {
                                    if (compressed) {
                                        var fileWidth = 0;
                                        var fileHeight = 0;
                                        var fileInfo = '';
                                        var fileDataObj = {};
                                        return fs.readFile(sourcePath, function (err, data) {
                                            if (err) {
                                                resolve('No file found');
                                            } else {
                                                fileInfo = imageInfo(data);
                                                fileWidth = fileInfo.width;
                                                fileHeight = fileInfo.height;
                                                fileDataObj = {
                                                    files: folderPath,
                                                    fileType: fileType,
                                                    fileWidth: fileWidth,
                                                    fileHeight: fileHeight,
                                                    fileName: fileName,
                                                    fileExtension: fileExtension,
                                                    fileOf: parentType
                                                };
                                                resolve(fileDataObj);
                                            }
                                        });
                                    } else {
                                        //delete file using npm as file is not an image
                                        fs.unlinkSync(sourcePath);
                                        resolve('Error in Resizing Image');
                                    }
                                });
                        }
                        else {
                            //delete file using npm as file is not an image
                            fs.unlinkSync(sourcePath);
                            resolve('Invalid file found');
                        }
                    }
                } else {
                    resolve(false);
                }
            } else if (err.code == 'ENOENT') {
                console.log(' ======= No file found  ======= ');
                resolve(false);
            } else {
                console.log(' ======= No file found  ======= ');
                resolve(false);
            }
        });
    })
        .then(function (uploadResult) {
            //if result value not contains uploadedFileProperties object then return response immediately
            if (uploadResult == 'File should be of type Image' || uploadResult == 'Invalid file found' || uploadResult == 'No file found' || uploadResult == 'Error in Resizing Image') {
                return uploadResult;
            } else {
                var uploadedFileProperties =
                {
                    uId: 0,
                    uploadedFilePath: sourcePath,
                    fileOf: uploadResult.fileOf,
                    fileName: uploadResult.fileName,
                    fileExt: uploadResult.fileExtension,
                    fileType: uploadResult.fileType,
                    width: uploadResult.fileWidth,
                    height: uploadResult.fileHeight,
                    orgFileDirPath: folderPath,
                    thumbDirPath: folderPath + config.path.thumbDir,
                    thumbSizes: thumbSizes,
                    thumbDirNames: thumbDirNames,
                    videoThumbExtension: null,
                    duration: null,
                    albumId: null
                };
                return uploadedFileProperties;
            }
        });
};

/**
 * Fetch file to crop on
 * customize parameters
 *
 * @method fetchImageFileToCropOnCustomizeParameters_v1_0_0
 * @param {Number} fileId
 * @param {Number} customWidth
 * @param {Number} customHeight
 * @param {Number} xOrdinate
 * @param {Number} yOrdinate
 * @param {Number}customRotation
 * @return {Boolean} true/false
 */
exports.fetchImageFileToCropOnCustomizeParameters_v1_0_0 = function (fileId, customWidth, customHeight, xOrdinate, yOrdinate, customRotation) {
    return new promise(function (resolve) {
        var model = require('../models');
        model.user_file_uploads.findAll({
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
        })
            .then(function (fileData) {
                if (fileData.length > 0) {
                    var imageProperties = {
                        parentType: fileData[0]['dataValues']['parent_type'],
                        fileType: fileData[0]['dataValues']['filetype'],
                        uId: fileData[0]['dataValues']['uid'],
                        mediaUrl: fileData[0]['dataValues']['media_url'],
                        extension: fileData[0]['dataValues']['extension'],
                        filePath: fileData[0]['dataValues']['path']
                    };
                    var filePath = imageProperties.filePath + imageProperties.mediaUrl + imageProperties.extension || "";
                    var destinationPath = imageProperties.filePath + imageProperties.mediaUrl + '_temp_crop_file' + imageProperties.extension;
                    return fs.readFile(filePath, function (err, data) {
                        if (err) {
                            resolve(false);
                        }
                        else {
                            var uploadedFileProperties =
                            {
                                uId: imageProperties.uId,
                                uploadedFilePath: imageProperties.filePath + imageProperties.mediaUrl + imageProperties.extension,
                                fileOf: imageProperties.parentType,
                                fileName: imageProperties.mediaUrl,
                                fileExt: imageProperties.extension,
                                fileType: imageProperties.fileType,
                                width: customWidth,
                                height: customHeight,
                                orgFileDirPath: imageProperties.filePath,
                                thumbDirPath: imageProperties.filePath + config.path.thumbDir,
                                thumbSizes: null,
                                thumbDirNames: null,
                                videoThumbExtension: null,
                                duration: null,
                                albumId: null,
                                newDestinationPath: destinationPath
                            };

                            return helper.cropImageOnCustomParameters_v1_0_0(uploadedFileProperties, xOrdinate, yOrdinate, customRotation)
                                .then(function (imageCropResult) {
                                    if (imageCropResult == true) {
                                        return model.images_thumbs.findAll({
                                            where: {
                                                $and: [
                                                    {
                                                        image_id: fileId
                                                    },
                                                    {
                                                        status: 'ACTIVE'
                                                    }
                                                ]
                                            }
                                        })
                                            .then(function (thumbsData) {
                                                if (thumbsData.length > 0) {
                                                    return helper.createThumbnailsOfCustomizedCroppedImage_v1_0_0(uploadedFileProperties, thumbsData, thumbsData.length)
                                                        .then(function (result) {
                                                            if (result == true) {
                                                                fs.unlinkSync(uploadedFileProperties.newDestinationPath);
                                                                resolve(true);
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
                                        resolve(false);
                                    }
                                });
                        }
                    });
                } else {
                    resolve(false);
                }
            });
    })
        .then(function (result) {
            return result;
        });
};

/**
 * Process the uploaded Video files
 *
 * @method processUploadedVideoFile_v1_0_0
 * @param {Object} req
 * @param {Number} uId
 * @param {String} videoType
 * @param {String} folderPath
 * @param {Object} attachedFileProp
 * @return {Object} response
 */
exports.processUploadedVideoFile_v1_0_0 = function (req, uId, videoType, folderPath, attachedFileProp) {
    if (videoType != '' || videoType != null) {
        var compressFileSizes = config.videoConfig.compressSize;
        var thumbDirNames = config.videoConfig.compressDirName;
        var compressType = config.videoConfig.compressType;
        var videoThumbExtension = config.videoConfig.thumbExtension;
        var pathLength = folderPath.length;
        if (videoType == 'post') {
            return uploadFileHelper.processOriginalUploadedVideoFile_v1_0_0(req, uId, folderPath, thumbDirNames, compressFileSizes, pathLength, compressType, 'POST', videoThumbExtension, attachedFileProp)
                .then(function (uploadResponse) {
                    //if uploadResponse does not contains uploadedFileProperties object then return response immediately
                    //without saving video file information in database
                    if (uploadResponse == 'File should be of type Video' || uploadResponse == 'Invalid file found' || uploadResponse == 'No file found' || uploadResponse == 'File path not exist' || uploadResponse == 'Failed to compress the video' || uploadResponse == 'File path is not correct' || uploadResponse == 'Video file directory is not exit') {
                        return uploadResponse;
                    }
                    else {
                        //here uploadResponse is correct and returning uploadedFileProperties object
                        //so video file successfully compressed and video thumbs are created
                        //now saving video file information in database
                        return dbHelper.saveFileToDatabase_v1_0_0(uploadResponse, null, null, null)
                            .then(function (data) {
                                if (data != null) {
                                    return {id: data.dataValues.id};
                                } else {
                                    return false;
                                }
                            });
                    }
                });
        }
        else if (videoType == 'comment') {
            return uploadFileHelper.processOriginalUploadedVideoFile_v1_0_0(req, uId, folderPath, thumbDirNames, compressFileSizes, pathLength, compressType, 'COMMENT', videoThumbExtension, attachedFileProp)
                .then(function (uploadResponse) {
                    //if uploadResponse does not contains uploadedFileProperties object then return response immediately
                    //without saving video file information in database
                    if (uploadResponse == 'File should be of type Video' || uploadResponse == 'Invalid file found' || uploadResponse == 'No file found' || uploadResponse == 'File path not exist' || uploadResponse == 'Failed to compress the video' || uploadResponse == 'File path is not correct' || uploadResponse == 'Video file directory is not exit') {
                        return uploadResponse;
                    }
                    else {
                        //here uploadResponse is correct and returning uploadedFileProperties object
                        //so video file successfully compressed and video thumbs are created
                        //now saving video file information in database
                        return dbHelper.saveFileToDatabase_v1_0_0(uploadResponse, null, null, null)
                            .then(function (data) {
                                if (data != null) {
                                    return {id: data.dataValues.id};
                                } else {
                                    return false;
                                }
                            });
                    }
                });
        }
        else {
            return new promise(function (resolve) {
                resolve(false);
            })
                .then(function (result) {
                    return result;
                })
        }
    }
    else {
        return new promise(function (resolve) {
            resolve(false);
        })
            .then(function (result) {
                return result;
            })
    }
};

/**
 * Save the uploaded Video file to directory
 *
 * @method processOriginalUploadedVideoFile_v1_0_0
 * @param {Object} req
 * @param {Number} uId
 * @param {String} imageType
 * @param {String} folderPath
 * @param {Object} attachedFileProp
 * @return {Object} response
 */
exports.processOriginalUploadedVideoFile_v1_0_0 = function (req, uId, folderPath, thumbDirNames, compressFileSizes, pathLength, compressType, parentType, videothumbextension, files) {
    return new promise(function (resolve) {
        var fileName = '';
        var fileExtension = '';
        var sourcePath = files.uploadfile[0]['path'];
        fileName = utility.extractFileName_v1_0_0(sourcePath, pathLength);
        fileExtension = utility.extractFileExtensionForUrlImage_v1_0_0(sourcePath);
        var isValidFileExt = helper.isValidFileExtension_v1_0_0(fileExtension);
        if (isValidFileExt.validity == 'false') {
            //delete file as file is not of valid extension
            fs.unlinkSync(sourcePath);
            console.log(' ======= Invalid file found  ======= ');
            resolve('Invalid file found');
        }
        else {
            console.log(' ======= File has the valid Extension  ======= ');
            var fileType = isValidFileExt.fileType;
            if (fileType == 'VIDEO') {
                var command = "";
                var originalFileDestinationPath = "";
                command = new ffmpeg({
                    // input source, required
                    source: sourcePath,
                    // timout of the spawned ffmpeg sub-processes in seconds (optional, defaults to 30)
                    timeout: 600,
                    // default priority for all ffmpeg sub-processes (optional, defaults to 0 which is no priorization)
                    priority: 0,
                    logger: null,
                    // completely disable logging (optional, defaults to false)
                    nolog: false
                });
                command.setFfmpegPath(config.ffmpegConfig.path);
                new metalib(sourcePath, function (metadata, err) {
                    if (err) {
                        console.log(' ======= Failed to Upload Video  ======= ');
                        throw new Error('Failed to Upload Video');
                    } else {
                        var uploadedFileProperties = {};
                        if (metadata != null) {
                            return new promise(function (secondPromiseResolve) {
                                fileExtension = '.' + config.ffmpegConfig.videoFormat;
                                uploadedFileProperties = {
                                    uId: uId,
                                    uploadedFilePath: sourcePath,
                                    fileOf: parentType,
                                    fileName: fileName,
                                    fileExt: fileExtension,
                                    fileType: fileType,
                                    width: metadata.video.resolution.w,
                                    height: metadata.video.resolution.h,
                                    orgFileDirPath: folderPath,
                                    thumbDirPath: folderPath + config.path.thumbDir,
                                    thumbSizes: compressFileSizes,
                                    thumbDirNames: thumbDirNames,
                                    compressTypes: compressType,
                                    aspectRatio: metadata.video.aspectString,
                                    duration: metadata.durationsec,
                                    videoThumbExtension: videothumbextension
                                };

                                //compressing and converting video
                                command.withVideoCodec(config.ffmpegConfig.videoCodecLib);
                                command.withAudioBitrate('128k');
                                command.withAudioChannels(2);
                                command.toFormat(config.ffmpegConfig.videoFormat);

                                //creating sd and hd if possible

                                originalFileDestinationPath = uploadedFileProperties.orgFileDirPath + config.videoConfig.dirName + '/';
                                var sdFileDestinationPath = originalFileDestinationPath + config.path.sdDir;
                                if (uploadedFileProperties.height > 720) {
                                    console.log(' ======= File can have both SD and HD ======= ');
                                    //compress to SD and HD size
                                    var hdFileDestinationPath = originalFileDestinationPath + config.path.hdDir;
                                    fsExtra.ensureDir(sdFileDestinationPath, function (err) {
                                        if (err) {
                                            console.log(' ======= Failed to Upload Video  ======= ');
                                            throw new Error('Failed to Upload Video');
                                        } else {
                                            command.withSize(uploadedFileProperties.thumbDirNames[0]);
                                            command.saveToFile(sdFileDestinationPath + uploadedFileProperties.fileName + uploadedFileProperties.fileExt, function (stdout, stderr) {
                                                console.log('======= SD has been created successfully =======');
                                            });
                                            fsExtra.ensureDir(hdFileDestinationPath, function (err) {
                                                if (err) {
                                                    console.log(' ======= Failed to Upload Video  ======= ');
                                                    throw new Error('Failed to Upload Video');
                                                } else {
                                                    command.withSize(uploadedFileProperties.thumbDirNames[1]);
                                                    command.saveToFile(hdFileDestinationPath + uploadedFileProperties.fileName + uploadedFileProperties.fileExt, function (stdout, stderr) {
                                                        console.log(' ======= HD has been created successfully =======');
                                                        secondPromiseResolve(uploadedFileProperties);
                                                    });
                                                }
                                            });
                                        }
                                    });
                                }
                                else {
                                    console.log(' ======= File can only have SD ======= ');
                                    fsExtra.ensureDir(sdFileDestinationPath, function (err) {
                                        if (err) {
                                            console.log(' ======= Failed to Upload Video  ======= ');
                                            throw new Error('Failed to Upload Video');
                                        } else {
                                            command.withSize(uploadedFileProperties.thumbDirNames[0]);
                                            command.saveToFile(sdFileDestinationPath, function (stdout, stderr) {
                                                console.log('======= SD has been created successfully =======');
                                                secondPromiseResolve(uploadedFileProperties);
                                            });
                                        }
                                    })
                                }
                            })
                                .then(function (secondPromiseResult) {
                                    if (secondPromiseResult) {
                                        var videoThumbDestinationPath = originalFileDestinationPath + config.videoConfig.thumbDirName;
                                        command.takeScreenshots({
                                            count: config.videoConfig.thumbCount,
                                            timemarks: config.videoConfig.thumbTimeMarks,
                                            filename: config.videoConfig.thumbName
                                        }, videoThumbDestinationPath, function (err, filenames) {
                                            if (err) {

                                            } else {
                                                console.log(' ======= Screen-Shot Created Successfully ======= ');
                                                resolve(uploadedFileProperties);
                                            }
                                        });
                                    } else {
                                        console.log(' ======= Failed to Create Screen-Shot ======= ');
                                        throw new Error('Failed to Upload Video');
                                    }
                                });
                        }
                        else {
                            console.log(' ======= Failed to Upload Video ======= ');
                            throw new Error('Failed to Upload Video');
                        }
                    }
                });
            }
            else {
                //delete file using npm as file is other than a video file
                fs.unlinkSync(sourcePath);
                console.log(' ======= Invalid file found  ======= ');
                fs.unlinkSync(sourcePath);
                resolve('Invalid file found');
            }
        }
    })
        .then(function (uploadResult) {
            if (uploadResult == 'File should be of type Video' || uploadResult == 'Invalid file found' || uploadResult == 'No file found' || uploadResult == 'File path not exist' || uploadResult == 'Failed to compress the video' || uploadResult == 'File path is not correct' || uploadResult == 'Video file directory is not exit') {
                return uploadResult;
            } else {
                return uploadResult;
            }
        })
        .catch(function (err) {
            if (err == 'Failed to Upload Video') {
                return false;
            }
        });
};
