const router = require('express').Router();
const db = require('../models/index');
const User = require('../models').User;
const Event = require('../models').Event;
const Calendar = require('../models').Calendar;
const passport = require("passport");
const request = require('request');
const keys = require('../config/config');
const Sequelize = require("sequelize");


var refreshToken = function (req, res, next) {
    var accessToken = req.user.accessToken;
    const options = {
        url: 'https://www.googleapis.com/oauth2/v1/tokeninfo?access_token=' + accessToken,
        method: 'GET',
        headers:{
            'Accept':'application/json'
        }
    };
    request(options, function(err, res, body){
        let json = JSON.parse(body);
        if(typeof json.expires_in === 'undefined' || json.expires_in <= 0){
            var user = User.findOne({ where: { userId: req.user.userId } }).then((currentUser)=> {
                const obj = {
                    refresh_token: currentUser.refreshToken,
                    client_id: keys.google.clientID,
                    client_secret: keys.google.clientSecret,
                    grant_type: 'refresh_token'
                };

                const options2 = {
                    url: 'https://oauth2.googleapis.com/token',
                    method: 'POST',
                    headers:{
                        'Accept':'application/json'
                    },
                    body: JSON.stringify(obj)
                };

                request(options2, function(er, rsp, bdy){
                    let jsn = JSON.parse(bdy);
                    if( typeof jsn.access_token !== undefined )
                        currentUser.update({accessToken:jsn.access_token}).then((usr) => console.log(usr));
                });
            });
        }
    });
    next()
}

router.use(refreshToken);

router.get('/events/event/:eventId', function(req, res, next) {
    var id = req.params.eventId;
    if(typeof req.user !== 'undefined'){
        Event.findOne({ where: { eventId: id } }).then((currentEvent) => {
            res.json(currentEvent);
        });
    }
});


router.get('/events/calendar/:calendarId', function(req, res, next) {
    if (typeof req.user !== 'undefined') {
        var accessToken = req.user.accessToken;
        var calendarId = req.params.calendarId;
        const options = {
            url: 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events',
            method: 'GET',
            headers: {
                'Authorization': ' Bearer ' + accessToken,
                'Accept': 'application/json'
            }
        }

        request(options, function (err, res, body) {
            let json = JSON.parse(body);
            if (typeof json.items !== 'undefined' && json.items.length > 0) {
                    console.log(json);
                json.items.forEach((item, index) => {
                    Event.findOne({where: {eventId: item.id}}).then((currentEvent) => {
                        if (!currentEvent) {
                            new Event({
                                eventId: item.id,
                                calendarId: calendarId,
                                status: item.status,
                                htmlLink: item.htmlLink,
                                created: item.created,
                                updated: item.updated,
                                summary: item.summary,
                                description: item.description,
                                location: item.location,
                                creator: item.creator,
                                organizer: item.organizer,
                                start: item.start,
                                end: item.end,
                                recurrence: item.recurrence,
                                iCalUID: item.iCalUID,
                                sequence: item.sequence,
                                attendees: item.attendees,
                                reminders: item.reminders,
                                eventType: item.eventType,
                                endTimeUnspecified: (typeof item.endTimeUnspecified !== 'undefined')?item.endTimeUnspecified:0,
                                recurringEventId: (typeof item.recurringEventId !== 'undefined')?item.recurringEventId:'',
                                originalStartTime: (typeof item.originalStartTime !== 'undefined')?item.originalStartTime:{},
                                extendedProperties: (typeof item.extendedProperties !== 'undefined')?item.extendedProperties:{},
                                hangoutLink: (typeof item.hangoutLink !== 'undefined')?item.hangoutLink:"",
                                conferenceData: (typeof item.conferenceData !== 'undefined')?item.conferenceData:{},
                                gadget: (typeof item.gadget !== 'undefined')?item.gadget:{},
                                locked: (typeof item.locked !== 'undefined')?item.locked:0,
                                source: (typeof item.source !== 'undefined')?item.source:{},
                                attachments: (typeof item.attachments !== 'undefined')?item.attachments:{},
                            }).save();
                        }
                    })
                });
            }
        });

        Event.findAll({

        }).then((events)=> {
            res.json(events);
        });
    }
});

router.get('/events/event/:calendarId/:eventId', function(req, rs, next) {
    if (typeof req.user !== 'undefined') {
        var accessToken = req.user.accessToken;
        var calendarId = req.params.calendarId;
        var eventId = req.params.eventId;

        const options = {
            url: 'https://www.googleapis.com/calendar/v3/calendars/'+ calendarId +'/events/' + eventId,
            method: 'GET',
            headers:{
                'Authorization':' Bearer ' + accessToken,
                'Accept':'application/json'
            }
        };

        request(options, function(err, res, body){
            rs.send(JSON.parse(body));
        });
    }
});

router.post('/events/event/:calendarId', function(req, res, next) {
    if (typeof req.user !== 'undefined') {
        var accessToken = req.user.accessToken;
        var calendarId = req.params.calendarId;

        console.log(req.body);

        const options = {
            url: 'https://www.googleapis.com/calendar/v3/calendars/' + calendarId + '/events',
            method: 'POST',
            headers: {
                'Authorization': ' Bearer ' + accessToken,
                'Accept': 'application/json'
            },
            body: req.body,
            json: true
        }

        request(options, function (err, res, body) {
            if (typeof body.id !== 'undefined') {
                Event.findOne({ where: { eventId: body.id } }).then((currrentEvent) => {
                    if(!currrentEvent){
                        new Event({
                            eventId: body.id,
                            calendarId: calendarId,
                            summary: body.summary,
                            location: body.location,
                            descritpion: body.description,
                            start: body.start,
                            end: body.end,
                            recurrence: body.recurrence,
                            attendees: body.attendees,
                            reminders: body.reminders
                        }).save();
                    }});
            }else{
                console.log(err);
            }
        });
        Event.findAll({

        }).then((events)=> {
            res.json(events);
        });
    }
});

router.put('/events/event/:calendarId/:eventId', function(req, res, next){
    if(typeof req.user !== 'undefined'){
        var accessToken = req.user.accessToken;
        var calendarId = req.params.calendarId;
        var eventId = req.params.eventId;

        const options = {
            url: 'https://www.googleapis.com/calendar/v3/calendars/'+ calendarId +'/events/' + eventId,
            method: 'PUT',
            headers:{
                'Authorization':' Bearer ' + accessToken,
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body: req.body,
            json: true
        };

        request(options, function(err, res, body){

            if(typeof body.id !== 'undefined'){
                Event.findOne({ where: { eventId: body.id } }).then((currentEvent) => {
                    currentEvent.update({
                        summary: body.summary,
                        description: body.description,
                        location: body.location,
                        start: body.start,
                        end: body.end,
                        recurrence: body.recurrence,
                        attendees: body.attendees
                    });
                });
            }else{
                console.log(err);
            }
        });
        Event.findAll({

        }).then((events)=> {
            res.json(events);
        });
    }
});


router.delete('/events/event/:calendarId/:eventId', function(req, res, next){
    if(typeof req.user !== 'undefined'){
        var accessToken = req.user.accessToken;
        var calendarId = req.params.calendarId;
        var eventId = req.params.eventId;

        const options = {
            url: 'https://www.googleapis.com/calendar/v3/calendars/'+ calendarId +'/events/' + eventId,
            method: 'DELETE',
            headers: {
                'Authorization': ' Bearer ' + accessToken,
                'Accept': 'application/json'
            },
            json: true
        }

        request(options, function(err, res, body){
            console.log(res.statusCode);
            if(res.statusCode == 204){
                Event.destroy({ where: { eventId: eventId } });
            }else{
                console.log(err);
            }
        });
        Event.findAll({

        }).then((events)=> {
            res.json(events);
        });
    }
});


module.exports = router;