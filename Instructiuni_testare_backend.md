Instructiuni utilizare backend

1. Se creeaza baza de date: calendar_test
2. Se porneste serverul node server.js in directorul backend
2. Se acceseaza localhost:3000/auth/google
3. Se autentifica la google si se accepta toate scopurile necesare rularii aplicatiei

(pasii de mai sus sunt pentru autentificare cu userul care testeaza backendul)

4. Se salveaza cookie-ul in POSTMAN ( pentru folosirea sesiunii din backend )
5. Se apeleaza in POSTMAN localhost:3000/api/calendarList pentru popularea cu calendarele google la care utilizatorul are dreptul ( pe baza de gmail )
6. Se apeleaza in POSTMAN localhost:3000/api/calendarList/primary pentru a alege calendarul principal ca si exemplu
7. Se apeleaza in POSTMAN GET localhost:3000/api/events/calendar/{{calendarId}} pentru listarea tuturor evenimentelor pe calendarul selectionat ( principal )
8. Se apeleaza in POSTMAN GET localhost:3000/api/events/event/{{calendarId}}/{{eventId}} pentru luarea unui singur eveniment (eventId poate fi schimbat conform rezultatelor de la 7)
9. Se apeleaza in POSTMAN POST localhost:3000/api/events/event/{{calendarId}} cu obiectul model pentru crearea unui eveniment de test ( se pot modifica datele din json )
10. Se apeleaza in POSTMAN PUT localhost:3000/api/events/event/{{calendarId}}/{{eventId}} pentru actualizarea evenimentului cu id-ul din URL si obiectul mentionat ( vezi punctul 9 )
11. Se apeleaza in POSTMAN DELETE localhost:3000/api/events/event/{{calendarId}}/{{eventId}} pentru stergerea evenimentului cu id-ul din URL