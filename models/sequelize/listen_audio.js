module.exports = function (sequelize, DataTypes) {

    var listen_audio = sequelize.define(
        'listen_audio',
        {
            id: {type: DataTypes.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true},
            uid: {type: DataTypes.INTEGER(11), allowNull: false},
            audio_file_id: {type: DataTypes.INTEGER(11), allowNull: false},
            location_id: {type: DataTypes.INTEGER(11), allowNull: true},
            created: {type: DataTypes.INTEGER(11), allowNull: false}
        },
        {
            timestamps: false,
            paranoid: true,
            freezeTableName: true,
            tableName: 'listen_audio'
        }
    );
    return listen_audio;
};