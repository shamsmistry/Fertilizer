module.exports = function (sequelize, DataTypes) {

    var table = sequelize.define(
        'fetched_url_data',
        {
            //mapping coulumns i-e datatypes, null checks etc
            id: {type: DataTypes.INTEGER(11), allowNull: false, primaryKey: true, autoIncrement: true},
            url: {type: DataTypes.STRING, allowNull: true},
            scheme: {type: DataTypes.STRING, allowNull: true},
            host: {type: DataTypes.STRING, allowNull: true},
            rootUrl: {type: DataTypes.STRING, allowNull: true},
            title: {type: DataTypes.STRING, allowNull: true},
            links: {type: DataTypes.STRING, allowNull: true},
            author: {type: DataTypes.STRING, allowNull: true},
            keywords: {type: DataTypes.STRING, allowNull: true},
            charset: {type: DataTypes.STRING, allowNull: true},
            description: {type: DataTypes.STRING, allowNull: true},
            feeds: {type: DataTypes.STRING, allowNull: true},
            ogTitle: {type: DataTypes.STRING, allowNull: true},
            ogDescription: {type: DataTypes.STRING, allowNull: true},
            imageUrl: {type: DataTypes.STRING, allowNull: true},
            imagePath: {type: DataTypes.STRING, allowNull: true},
            imageName: {type: DataTypes.STRING, allowNull: true},
            imageExtension: {type: DataTypes.STRING, allowNull: true},
            imageThumbSize: {type: DataTypes.ENUM('SQUARE', 'XLARGE', 'LARGE', 'MEDIUM', 'SMALL'), allowNull: true},
            imageThumbWidth: {type: DataTypes.STRING, allowNull: true},
            imageThumbHeight: {type: DataTypes.STRING, allowNull: true},
            thumbPath: {type: DataTypes.STRING, allowNull: true},
            provider: {type: DataTypes.STRING, allowNull: true},
            status: {type: DataTypes.ENUM('ACTIVE', 'DELETED', 'DEACTIVATED'), allowNull: true},
            updated: {type: DataTypes.INTEGER(11), allowNull: true},
            created: {type: DataTypes.INTEGER(11), allowNull: true}
        },
        {
            timestamps: false,
            paranoid: true,
            freezeTableName: true,

            // define the table's name
            tableName: 'fetched_url_data'
        }
    );
    return table;
};