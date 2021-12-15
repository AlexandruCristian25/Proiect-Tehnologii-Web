Instructiuni utilizare backend

Pre-requisite: Instalarea aplicatiei POSTMAN, de aici: https://dl.pstmn.io/download/latest/win64

1. Se creeaza baza de date: calendar_test, vezi README.md
2. Se porneste serverul de backend prin comanda: node server.js , in directorul backend, vezi README.md
2. Se acceseaza localhost:3000/auth/google
3. Se autentifica la google cu un cont de gmail la alegere si se accepta toate scopurile necesare rularii aplicatiei

(pasii de mai sus sunt pentru autentificare cu userul care testeaza backendul)

4. Se salveaza cookie-ul in POSTMAN ( pentru folosirea sesiunii din backend )
5. In POSTMAN se importa colectia de apeluri: Appointment Manager.postman_collection.json
6. Se apeleaza in POSTMAN localhost:3000/api/calendarList pentru popularea cu calendarele google la care utilizatorul are dreptul ( pe baza de gmail )
7. Se apeleaza in POSTMAN localhost:3000/api/calendarList/primary pentru a alege calendarul principal ca si exemplu
8. Se apeleaza in POSTMAN GET localhost:3000/api/events/calendar/{{calendarId}} pentru listarea tuturor evenimentelor pe calendarul selectionat ( principal )
9. Se apeleaza in POSTMAN GET localhost:3000/api/events/event/{{calendarId}}/{{eventId}} pentru luarea unui singur eveniment (eventId poate fi schimbat conform rezultatelor de la 7)
10. Se apeleaza in POSTMAN POST localhost:3000/api/events/event/{{calendarId}} cu obiectul model pentru crearea unui eveniment de test (7 se pot modifica datele din json )
11. Se apeleaza in POSTMAN PUT localhost:3000/api/events/event/{{calendarId}}/{{eventId}} pentru actualizarea evenimentului cu id-ul din URL si obiectul mentionat ( vezi punctul 9 )
12. Se apeleaza in POSTMAN DELETE localhost:3000/api/events/event/{{calendarId}}/{{eventId}} pentru stergerea evenimentului cu id-ul din URL