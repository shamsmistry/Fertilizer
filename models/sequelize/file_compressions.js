module.exports = function (sequelize, DataTypes) {

    var file_compressions = sequelize.define(
        'file_compressions',
        {
            //mapping coulumns i-e datatypes, null checks etc
            id: {type: DataTypes.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true},
            file_id: {type: DataTypes.INTEGER(11), allowNull: false},
            path: {type: DataTypes.STRING, allowNull: true},
            width: {type: DataTypes.INTEGER(11), allowNull: true},
            height: {type: DataTypes.INTEGER(11), allowNull: true},
            sizetype: {type: DataTypes.ENUM('SD', 'HD'), allowNull: true},
            status: {type: DataTypes.ENUM('ACTIVE', 'INACTIVE'), allowNull: true, defaultValue: 'ACTIVE'},
            created: {type: DataTypes.INTEGER(11), allowNull: true},
        },
        {
            timestamps: false,
            paranoid: true,
            freezeTableName: true,
            tableName: 'file_compressions'

        }
    );
    return file_compressions;
};