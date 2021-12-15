'use strict';
module.exports = (sequelize, DataTypes) => {
    const CalendarList = sequelize.define('CalendarList', {
        id: {
            type:DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        calendarId: {
            type:DataTypes.STRING,
            allowNull: true
        },
        description: {
            type:DataTypes.TEXT,
            allowNull: true
        },
        location: {
            type:DataTypes.STRING,
            allowNull: true
        },
        summary: {
            type:DataTypes.STRING,
            allowNull: false
        },
        timeZone: {
            type:DataTypes.STRING,
            allowNull: true
        },
        summaryOverride: {
            type:DataTypes.STRING,
            allowNull: true
        },
        colorId: {
            type:DataTypes.STRING,
            allowNull: true
        },
        backgroundColor: {
            type:DataTypes.STRING,
            allowNull: true
        },
        foregroundColor: {
            type:DataTypes.STRING,
            allowNull: true
        },
        hidden: {
            type:DataTypes.BOOLEAN,
            allowNull: true
        },
        selected: {
            type:DataTypes.BOOLEAN,
            allowNull: true
        },
        accessRole: {
            type:DataTypes.STRING,
            allowNull: false
        },
        defaultReminders: {
            type:DataTypes.JSON,
            allowNull: false
        },
        notificationSettings: {
            type:DataTypes.JSON,
            allowNull: false
        },
        primary: {
            type:DataTypes.BOOLEAN,
            allowNull: true
        },
        deleted: {
            type:DataTypes.BOOLEAN,
            allowNull: true
        },
        conferenceProperties: {
            type:DataTypes.JSON,
            allowNull: true
        }
    }, { sequelize, modelName: 'CalendarList', tableName:'calendar_list', timestamps:false, paranoid: true });
    CalendarList.associate = function(models) {
        CalendarList.belongsTo(models.Calendar, {sourceKey: 'calendarId', foreignKey:'calendarId', constraints:false});
    };

    return CalendarList;
};