module.exports = function (sequelize, DataTypes) {

    var location = sequelize.define(
        'location',
        {
            //mapping coulumns i-e datatypes, null checks etc
            id: {type: DataTypes.INTEGER(11), allowNull: false, autoIncrement: true, primaryKey: true},
            ip: {type: DataTypes.STRING(39), allowNull: false},
            countryCode: {type: DataTypes.STRING(5), allowNull: true},
            countryName: {type: DataTypes.STRING(25), allowNull: true},
            region: {type: DataTypes.STRING(5), allowNull: true},
            city: {type: DataTypes.STRING(25), allowNull: true},
            postalCode: {type: DataTypes.STRING(25), allowNull: true},
            latitude: {type: DataTypes.DECIMAL(10, 8), allowNull: true},
            longitude: {type: DataTypes.DECIMAL(11, 8), allowNull: true},
            dmaCode: {type: DataTypes.INTEGER(11), allowNull: true},
            areaCode: {type: DataTypes.INTEGER(11), allowNull: true},
            metroCode: {type: DataTypes.INTEGER(11), allowNull: true},
            continentCode: {type: DataTypes.STRING(5), allowNull: true},
            regionName: {type: DataTypes.STRING(25), allowNull: true}

        },
        {
            timestamps: false,
            paranoid: true,
            freezeTableName: true,
            tableName: 'location'
        }
    );
    return location;
};