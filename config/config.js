/**
 * Config file contains all the configuration attributes
 *
 * @class config
 */

/**
 * Set base-urls
 * @property baseUrl
 * @type Object
 */
exports.baseUrl = {
    fileServer: 'http://localhost:3001/',
    apiServer: 'http://localhost:3000/'
};

/**
 * Setting listen-ports
 * @property listenPorts
 * @type Object
 */
exports.listenPorts = {
    port: 3001
};

/**
 * Setting default images name
 * @property defaultImages
 * @type Object
 */
exports.defaultImages = {
    profile: 'default_profile.jpg',
    cover: 'default_cover.jpg',
    goal: 'default_goal.jpg'
};

/**
 * Setting all directory paths
 * @property path
 * @type Object
 */
exports.path = {
    uploadDir: 'resources/uploads/',
    downloadDir: 'resources/downloads/images/',

    profileDir: 'profile/',
    coverDir: 'cover/',
    goalDir: 'goals/',
    postDir: 'posts/',
    commentDir: 'comments/',
    categoriesDir: 'categories/',
    subCategoriesDir: 'subcategories/',
    bannerDir: 'banner/',

    albumsDir: 'albums/',
    imagesAlbumDir: 'images/',
    videosAlbumDir: 'videos/',
    audiosAlbumDir: 'audios/',

    defaultFilesDir: 'default_files/',

    sdDir: 'sd/',
    hdDir: 'hd/',

    thumbDir: 'thumb/',
    squareThumbDir: 'square/',
    smallThumbDir: 'small/',
    mediumThumbDir: 'medium/',
    largeThumbDir: 'large/',
    xlargeThumbDir: 'xlarge/',
    originalDir: 'org/org/'

};

/**
 * Setting thumb sizes
 * @property thumbSize
 * @type Object
 */
exports.thumbSize = {
    profile: [
        {
            "width": 100,
            "height": 100
        },
        {
            "width": 200,
            "height": 200
        },
        {
            "width": 400,
            "height": 400
        },
        {
            "width": 150,
            "height": 150
        }
    ],
    cover: [
        {
            "width": 490,
            "height": 170
        },
        {
            "width": 980,
            "height": 340
        },
        {
            "width": 1960,
            "height": 680
        },
        {
            "width": 150,
            "height": 150
        }
    ],
    goal: [
        {
            "width": 300,
            "height": 225
        },
        {
            "width": 528,
            "height": 297
        },
        {
            "width": 980,
            "height": 340
        },
        {
            "width": 1960,
            "height": 680
        },
        {
            "width": 150,
            "height": 150
        }
    ],
    contribute: [
        {
            "width": 0,
            "height": 0
        },
        {
            "width": 0,
            "height": 0
        },
        {
            "width": 0,
            "height": 0
        },
        {
            "width": 150,
            "height": 150
        }
    ],
    comment: [
        {
            "width": 0,
            "height": 0
        },
        {
            "width": 0,
            "height": 0
        },
        {
            "width": 0,
            "height": 0
        },
        {
            "width": 150,
            "height": 150
        }
    ],
    post: [
        {
            "width": 0,
            "height": 0
        },
        {
            "width": 0,
            "height": 0
        },
        {
            "width": 0,
            "height": 0
        },
        {
            "width": 150,
            "height": 150
        }
    ],
    albumProfile: [
        {
            "width": 100,
            "height": 100
        },
        {
            "width": 200,
            "height": 200
        },
        {
            "width": 400,
            "height": 400
        },
        {
            "width": 150,
            "height": 150
        }
    ],
    albumCover: [
        {
            "width": 490,
            "height": 170
        },
        {
            "width": 980,
            "height": 340
        },
        {
            "width": 1960,
            "height": 680
        },
        {
            "width": 150,
            "height": 150
        }
    ],
    categories: [
        {
            "width": 128,
            "height": 128
        },
        {
            "width": 256,
            "height": 256
        },
        {
            "width": 150,
            "height": 150
        }
    ],
    subCategories: [
        {
            "width": 128,
            "height": 128
        },
        {
            "width": 256,
            "height": 256
        },
        {
            "width": 150,
            "height": 150
        }
    ],
    banner: [
        {
            "width": 980,
            "height": 340
        },
        {
            "width": 1960,
            "height": 680
        },
        {
            "width": 150,
            "height": 150
        }
    ],
    urlImage: [
        {
            "width": 640,
            "height": 360
        }
    ],
    postGreater1024: [0.4, 0.55, 0.7],
    postLesser1024: [0.7, 0.85, 1.0],
    square: {
        "width": 150,
        "height": 150
    }
};

/**
 * Setting thumb directory names
 * @property thumbNames
 * @type Object
 */
exports.thumbNames = {
    cover: ["small", "medium", "large", "square"],
    profile: ["small", "medium", "large", "square"],
    goal: ["small", "medium", "large", "xlarge", "square"],
    contribute: ["small", "medium", "large", "square"],
    comment: ["small", "medium", "large", "square"],
    post: ["small", "medium", "large", "square"],
    albumProfile: ["small", "medium", "large", "square"],
    albumCover: ["small", "medium", "large", "square"],
    categories: ["small", "medium", "square"],
    subCategories: ["small", "medium", "square"],
    banner: ["medium", "large", "square"],
    urlimage: ["medium"]
};

/**
 * Setting image file configurations
 * @property imageConfig
 * @type Object
 */
exports.imageConfig = {
    maxWidth: 2048,
    maxHeight: 2048,
    setExtension: 'jpg'
};

/**
 * Setting rotation degrees, used in customize cropping of image
 * @property validRotationDegree
 * @type Object
 */
exports.validRotationDegree = {
    range: ['-270', '-180', '-90', '0', '90', '180', '270']
};

/**
 * Setting encryption configurations for hash-id npm
 * @property encryption
 * @type Object
 */
exports.encryption = {
    salt: "b6a4907f78fb5fe40133ff2c77a782cd77662f00cd98536f0db6a16044867e26",
    size: 40
};

/**
 * Setting maxmind api location file
 * @property maxmind
 * @type Object
 */
exports.maxmind = {
    path: './libraries/thirdparty/GeoLiteCity.dat'
};

/**
 * Setting pagination configuration
 * @property pagination
 * @type Object
 */
exports.pagination = {
    offset: 0,
    limit: 5
};

/**
 * Setting API server configurations
 * @property webURL
 * @type Object
 */
exports.webURL = {
    domain: '',
    cdn: ''
};

/**
 * Setting configuration for giphy-api npm
 * @property giphy
 * @type Object
 */
exports.giphy = {
    apiKey: 'dc6zaTOxFJmzC'
};

/**
 * Setting fetch url configurations
 * @property fetchedUrlConfig
 * @type Object
 */
exports.fetchedUrlConfig = {
    thumbs: ["MEDIUMT"],
    urlProvider: "weblink",
    allowedVideoUrls: [
        {
            // https://regex101.com/r/uT9lO0/2
            provider: 'youtube',
            pattern: /(https?:\/\/)?(www.)?(youtube\.com|youtu\.be|youtube-nocookie\.com)\/(?:embed\/|v\/|watch\?v=|watch\?list=(.*)&v=|watch\?(.*[^&]&)v=)?((\w|-){11})(&list=(\w+)&?)?/,
            method: 'loadYoutube',
            index: 6
        },
        {
            provider: 'vimeo',
            pattern: /[\w\W]*vimeo\.com\/([\w\W]*)[\w\W]*/,
            method: 'loadVimeo',
            index: 1
        },
        {
            provider: 'dailymotion',
            pattern: /(https?:\/\/)?(www.)?(dailymotion\.com\/(video|hub)\/?|dai\.ly)\/([^_\W]+)/,
            method: 'loadDailymotion',
            index: 5
        }
    ]
};

/**
 * Setting video file configurations
 * @property videoConfig
 * @type Object
 */
exports.videoConfig = {
    compressSize: [
        {
            "width": 640,
            "height": 360
        },
        {
            "width": 1280,
            "height": 720
        }
    ],
    compressDirName: ["640x360", "1280x720"],
    compressType: ["sd", "hd"],
    dirName: 'videos',
    thumbsDimensions: {
        "width": 320,
        "height": 240
    },
    thumbExtension: '.jpg',
    thumbPrefix: '_tn',
    thumbOneSuffix: '_1',
    thumbTwoSuffix: '_2',
    thumbThreeSuffix: '_3',
    thumbFourSuffix: '_4',
    thumbCount: 2,
    thumbSize: '320x240',
    thumbDirName: 'thumb',
    thumbTimeMarks: ['0.5', '1'],
    thumbName: '%b_%i'//input filename w/o extension  and  number of screen shot,
};

/**
 * Setting ffmpeg (video-library) configurations
 * @property ffmpegConfig
 * @type Object
 */
exports.ffmpegConfig = {
    path: 'C:/ffmpeg/bin/ffmpeg.exe',
    ffprobePath: 'C:/ffmpeg/bin/ffprobe.exe',
    videoCodecLib: 'libx264',
    audioCodecLib: 'libmp3lame',
    videoFormat: 'mp4'
};

/**
 * Setting audio file configurations
 * @property ffmpegConfig
 * @type Object
 */
exports.audioConfig = {
    dirName: 'audios',
    format: 'mp3'
};
