'use strict';
module.exports = (sequelize, DataTypes) => {
    const Event = sequelize.define('Event', {
        eventId: {
            type:DataTypes.STRING,
            primaryKey: true
        },
        calendarId: {
            type:DataTypes.STRING,
            allowNull: false
        },
        status: {
            type:DataTypes.STRING,
            allowNull: true
        },
        htmlLink: {
            type:DataTypes.STRING,
            allowNull: true
        },
        created: {
            type:DataTypes.DATE,
            allowNull: true
        },
        updated: {
            type:DataTypes.DATE,
            allowNull: true
        },
        summary: {
            type:DataTypes.STRING,
            allowNull: false
        },
        description: {
            type:DataTypes.STRING,
            allowNull: true
        },
        location: {
            type:DataTypes.STRING,
            allowNull: true
        },
        colorId: {
            type:DataTypes.STRING,
            allowNull: true
        },
        creator: {
            type:DataTypes.JSON,
            allowNull: true
        },
        organizer: {
            type:DataTypes.JSON,
            allowNull: true
        },
        start: {
            type:DataTypes.JSON,
            allowNull: false
        },
        end: {
            type:DataTypes.JSON,
            allowNull: false
        },
        endTimeUnspecified: {
            type:DataTypes.BOOLEAN,
            allowNull: true
        },
        recurrence: {
            type:DataTypes.JSON,
            allowNull: true
        },
        recurringEventId: {
            type:DataTypes.STRING,
            allowNull: true
        },
        originalStartTime: {
            type:DataTypes.JSON,
            allowNull: true
        },
        transparency: {
            type:DataTypes.STRING,
            allowNull: true
        },
        visibility: {
            type:DataTypes.STRING,
            allowNull: true
        },
        iCalUID: {
            type:DataTypes.STRING,
            allowNull: true
        },
        sequence: {
            type:DataTypes.INTEGER,
            allowNull: true
        },
        attendees: {
            type:DataTypes.JSON,
            allowNull: true
        },
        attendeesOmitted: {
            type:DataTypes.BOOLEAN,
            allowNull: true
        },
        extendedProperties: {
            type:DataTypes.JSON,
            allowNull: true
        },
        hangoutLink: {
            type:DataTypes.STRING,
            allowNull: true
        },
        conferenceData: {
            type:DataTypes.JSON,
            allowNull: true
        },
        gadget: {
            type:DataTypes.JSON,
            allowNull: true
        },
        anyoneCanAddSelf: {
            type:DataTypes.BOOLEAN,
            allowNull: true
        },
        guestsCanInviteOthers: {
            type:DataTypes.BOOLEAN,
            allowNull: true
        },
        guestsCanModify: {
            type:DataTypes.BOOLEAN,
            allowNull: true
        },
        guestsCanSeeOtherGuests: {
            type:DataTypes.BOOLEAN,
            allowNull: true
        },
        privateCopy: {
            type:DataTypes.BOOLEAN,
            allowNull: true
        },
        locked: {
            type:DataTypes.BOOLEAN,
            allowNull: true
        },
        reminders: {
            type:DataTypes.JSON,
            allowNull: false
        },
        source: {
            type:DataTypes.JSON,
            allowNull: true
        },
        attachments: {
            type:DataTypes.JSON,
            allowNull: true
        },
        eventType: {
            type:DataTypes.STRING,
            allowNull: true
        }
    }, { sequelize, modelName: 'Event', tableName:'event', timestamps:false, paranoid: true });

    return Event;
};