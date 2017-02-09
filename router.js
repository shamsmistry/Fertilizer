/**
 * Router for handling all the API requests
 *
 * @class router
 */

/**
 * Requiring uploadFileController
 * @property uploadFileController
 * @type file
 */
var uploadFileController = require('./controllers/uploadfile');
/**
 * Requiring downloadFileController
 * @property downloadFileController
 * @type file
 */
var downloadFileController = require('./controllers/downloadfile');

/**
 * Requiring restify npm
 * @property restify
 * @type file
 */
var restify = require('restify');
/**
 * Requiring responseTime npm
 * @property responseTime
 * @type file
 */
var responseTime = require('response-time');

/**
 * Public function to expose all the
 * necessary routes
 *
 * @method allroutes
 * @param fileRouter
 * @return {null}
 */
module.exports = function (fileRouter) {

    fileRouter.use(responseTime());

    /**
     * Route: To upload images,
     * Header: x-api-version, token,
     * Request Method: Post,
     * Body Param: uploadfile,
     * Query String: imageof and imagetype
     *
     * @event Upload Images
     */
    fileRouter.post({path: '/upload/image', version: '1.0.0'}, uploadFileController.uploadImageFile_v1_0_0);

    /**
     * Route: To upload gif images,
     * Header: x-api-version, token,
     * Request Method: Get,
     * Query String: imageof and imageid
     *
     * @event Upload Gig Images
     */
    fileRouter.get({path: '/upload/image/gif', version: '1.0.0'}, uploadFileController.uploadGifImageFile_v1_0_0);

    /**
     * Route: To crop images on custom parameter,
     * Header: x-api-version, token,
     * Request Method: Post,
     * Body Param: attach_id, height, width, x, y and rotation
     *
     * @event Customize Crop Images
     */
    fileRouter.post({
        path: '/image/crop',
        version: '1.0.0'
    }, restify.bodyParser({mapParams: false}), uploadFileController.customizeCropImage_v1_0_0);

    /**
     * Route: To get albums of suggested images,
     * Header: x-api-version, token,
     * Request Method: Get,
     * Query String: of
     *
     * @event Get Albums
     */
    fileRouter.get({path: '/album/image', version: '1.0.0'}, downloadFileController.showAlbum_v1_0_0);

    /**
     * Route: To save the meta information of url shared,
     * Header: x-api-version, token,
     * Request Method: Post,
     * Body Param: url
     *
     * @event Save Url Meta
     */
    fileRouter.post({
        path: '/fetch',
        version: '1.0.0'
    }, restify.bodyParser({mapParams: false}), downloadFileController.saveFetchedUrlInformation_v1_0_0);

    /**
     * Route: To upload videos,
     * Header: x-api-version, token,
     * Request Method: Post,
     * Body Param: uploadfile,
     * Query String: videoof
     *
     * @event Upload Video
     */
    fileRouter.post({path: '/upload/video', version: '1.0.0'}, uploadFileController.uploadVideoFile_v1_0_0);

    /**
     * Route: To get uploaded files,
     * Request Method: Get,
     * Query String: id, isthumb, sizetype and filename
     *
     * @event Get Uploaded Files
     */
    fileRouter.get('resources/uploads/:id/:isthumb/:sizetype/:filename', downloadFileController.getUploadedFiles_v1_0_0);

    /**
     * Route: To get downloaded images,
     * Request Method: Get,
     * Query String: id, isthumb, sizetype and filename
     *
     * @event Get Downloaded Images
     */
    fileRouter.get('resources/downloads/images/:id/:isthumb/:sizetype/:filename', downloadFileController.getDownloadedFiles_v1_0_0);

    /**
     * Route: To get default files,s
     * Query String: of, isthumb, sizetype and filename
     *
     * @event Get Default Files
     */
    fileRouter.get('resources/uploads/default_files/:of/:isthumb/:sizetype/:filename', downloadFileController.getDefaultFiles_v1_0_0);

    /**
     * Route: To verify the Media Id (will be call from API-Server)
     * Request Method: Post,
     * Headers: file-id, user-id, goal-id, req-from
     *
     * @event Get Default Files
     */
    fileRouter.post('/verify/media-id', uploadFileController.verifyMediaId);

};

/**
 * Prototype of url
 *
 * @method toURL
 * @return {string}
 */
Array.prototype.toURL = function () {
    return this.join('/');
};