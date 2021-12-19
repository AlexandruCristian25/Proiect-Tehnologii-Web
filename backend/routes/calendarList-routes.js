

const router = require('express').Router();
const db = require('../models/index');
const User = require('../models').User;
const CalendarList = require('../models').CalendarList;
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


router.get('/calendarList', function(req, rs, next) {
    if(typeof req.user !== 'undefined'){

        var accessToken = req.user.accessToken;
        const options = {
            url: 'https://www.googleapis.com/calendar/v3/users/me/calendarList',
            method: 'GET',
            headers: {
                'Authorization': ' Bearer ' + accessToken,
                'Accept': 'application/json'
            }
        }
        request(options, function(err, res, body){
            let json = JSON.parse(body);
            if(typeof json.items !== 'undefined' && json.items.length > 0){
                json.items.forEach((item,index)=>{
                    CalendarList.findOne({ where: { calendarId: item.id } }).then((currentCalendar) => {
                        if(!currentCalendar){
                            Calendar.create({
                                calendarId: item.id,
                                summary: item.summary
                            });


                            CalendarList.create({
                                calendarId: item.id,
                                summary: item.summary,
                                timeZone: item.timeZone,
                                colorId: item.colorId,
                                backgroundColor: item.backgroundColor,
                                foregroundColor: item.foregroundColor,
                                selected: item.selected,
                                accessRole: item.accessRole,
                                primary: item.primary,
                                defaultReminders: (typeof item.defaultReminders !== 'undefined')?item.defaultReminders:{},
                                notificationSettings: (typeof item.notificationSettings !== 'undefined')?item.notificationSettings:{},
                                conferenceProperties: (typeof item.conferenceProperties !== 'undefined')?item.conferenceProperties:{},
                            });
                        }else if (currentCalendar.summary !== item.summary){

                            Calendar.update({summary: item.summary},{ where: { calendarId: currentCalendar.calendarId } });

                            currentCalendar.update({
                                summary: item.summary,
                                colorId: item.colorId,
                                backgroundColor: item.backgroundColor,
                                foregroundColor: item.foregroundColor,
                                selected: item.selected
                            });
                        }});
                });

                CalendarList.findAll({
                    include: [{
                        model: Calendar
                    }]
                }).then((calendars)=> {
                    rs.json(calendars);
                });
            }
        });


    }
});

router.get('/calendarList/primary', function(req, res, next) {
    if(typeof req.user !== 'undefined'){
        CalendarList.findOne({ where: { primary: true } }).then((currentCalendar) => {
            res.json(currentCalendar);
        });
    }
});

module.exports = router;