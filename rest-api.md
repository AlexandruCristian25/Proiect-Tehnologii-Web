# REST API & structura Backend

Datele deservite pentru frontend sunt furnizate de catre API-ul REST dezvoltat in ExpressJS.
API-ul ca si structura poate fi accesat in colectia POSTMAN in acest director.

Structura de directoare a proiectului ExpressJS este aceasta:

- __\\angular\\backend__
   - __config__
     - [config](config/config)
     - [config.json](config/config.json)
     - [passport\-setup.js](config/passport-setup.js)
   - __models__
     - [index.js](models/index.js)
     - [calendar.js](models/calendar.js)
     - [calendarList.js](models/calendarList.js)
     - [event.js](models/event.js)
     - [user.js](models/user.js)
   - [node\_modules](node_modules)
   - [package\-lock.json](package-lock.json)
   - [package.json](package.json)
   - __routes__
     - [auth\-routes.js](routes/auth-routes.js)
     - [calendarList\-routes.js](routes/calendarList-routes.js)
     - [events\-routes.js](routes/events-routes.js)
   - [server.js](server.js)

In **config** sunt fisierele de configurare a ORM-ului Sequelize ( credentialele bazei de date si configurari specifice ) si a diverselor tipuri de middleware ( Passport.js - autentificare si autorizare ).

In **models** se regasesc entitatiile folosite pentru maparea ORM-ului pe baza de date si structura tabelelor ce vor deservi la persistenta datelor.

In **routes** sunt fisierele ce contin rutele ExpressJS ale API-ului, acestea sunt de forma /api/entitate sau /api/entitate/:id pentru efectuarea operatiilor CRUD si intoarcerea datelor necesare utilizatorului in interfata Angular.

**Package.json** detine toate dependintele aplicatiei in termeni de middleware folosite.

**Server.js** este fisierul de intrare in aplicatia ExpressJS. Entry point-ul pentru backend cu setari de tip: pe ce port sa asculte serverul de backend, prefixarea rutelor, setarea middleware-urilor, etc.

