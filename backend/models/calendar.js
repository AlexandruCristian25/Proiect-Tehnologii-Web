'use strict';
module.exports = (sequelize, DataTypes) => {
    const Calendar = sequelize.define('Calendar', {
        calendarId: {
            type:DataTypes.STRING,
            primaryKey: true
        },
        conferenceProperties: {
            type:DataTypes.JSON,
            allowNull: true
        },
        summary: {
            type:DataTypes.STRING,
            allowNull: false
        },
        location: {
            type:DataTypes.STRING,
            allowNull: true
        },
        timeZone: {
            type:DataTypes.STRING,
            allowNull: true
        }
    }, { sequelize, modelName: 'Calendar', tableName:'calendar', timestamps:false, paranoid: true });


    return Calendar;
};