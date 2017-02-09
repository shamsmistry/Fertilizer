//require and set all the tables

var allTables = {

    //session
    "sessions": require('./sequelize_old/sessions'),

    //users
    "users": require('./sequelize_old/users'),

    //goals
    "goals": require('./sequelize_old/goals'),

    //media
    "user_file_uploads": require('./sequelize_old/user_file_uploads'),
    "images_thumbs": require('./sequelize_old/images_thumbs'),
    "file_compressions": require('./sequelize_old/file_compressions'),
    "fetched_url_data": require('./sequelize_old/fetched_url_data'),

    //views
    "views_video": require('./sequelize_old/views_video'),
    "listen_audio": require('./sequelize_old/listen_audio'),

    //location
    "location": require('./sequelize_old/location')
};

exports.allTables = allTables;
