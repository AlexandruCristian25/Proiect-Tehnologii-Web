const router = require('express').Router();
const passport = require("passport");

router.get('/google', passport.authenticate('google', {
  scope: [
        'profile',
        'https://www.googleapis.com/auth/calendar',
        'https://www.googleapis.com/auth/calendar.readonly',
        'https://www.googleapis.com/auth/calendar.events',
        'https://www.googleapis.com/auth/calendar.events.readonly'
      ],
  accessType: 'offline',
  approvalPrompt: 'force'
}));

router.get('/is-user-logged-in', (req,res) => {
  res.send({user:req.user});
})

router.get('/logout', (req,res) => {
  req.logout();
  res.send({user:req.user});
});

router.get('/google/redirect', passport.authenticate('google', {failWithError: true}), (req, res) => {
  //res.send(req.user);
  res.redirect(301,'http://localhost:4201');
})

module.exports = router
