module.exports = function (sequelize, DataTypes) {
    var album = sequelize.define(
        'album',
        {
            //mapping coulumns i-e datatypes, null checks etc
            id: {type: DataTypes.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true},
            uid: {type: DataTypes.INTEGER(11), allowNull: true},
            name: {type: DataTypes.STRING, allowNull: true},
            type: {type: DataTypes.ENUM('AUDIO', 'VIDEO', 'IMAGE'), allowNull: true},
            gen_by: {type: DataTypes.ENUM('ADMIN', 'USER', 'SYSTEM'), allowNull: true},
            belongs_to: {type: DataTypes.ENUM('DEFAULT', 'CUSTOM'), allowNull: true}

        },
        {
            timestamps: false,
            paranoid: true,
            freezeTableName: true,

            // define the table's name
            tableName: 'album'
        }
    );
    return album;
};