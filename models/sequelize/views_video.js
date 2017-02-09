module.exports = function (sequelize, DataTypes) {

    var views_video = sequelize.define(
        'views_video',
        {
            id: {type: DataTypes.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true},
            uid: {type: DataTypes.INTEGER(11), allowNull: false},
            video_file_id: {type: DataTypes.INTEGER(11), allowNull: false},
            location_id: {type: DataTypes.INTEGER(11), allowNull: true},
            created: {type: DataTypes.INTEGER(11), allowNull: false}
        },
        {
            timestamps: false,
            paranoid: true,
            freezeTableName: true,
            tableName: 'views_video'
        }
    );
    return views_video;
};