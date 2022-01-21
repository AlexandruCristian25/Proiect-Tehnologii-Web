**Proiect integrare cu Google Calendar - Appointment Manager**

Proiectul a fost conceput in Angular cu backend-ul pe ExpressJS cu ORM-ul Sequelize.
Ca baza de date a fost aleasa MariaDB.

---

## Cerinte de sistem proiect


1. Instalarea NodeJS de aici https://nodejs.org/dist/v16.13.1/node-v16.13.1-x64.msi
2. Instalarea XAMPP de aici https://www.apachefriends.org/xampp-files/8.0.13/xampp-windows-x64-8.0.13-0-VS16-installer.exe aceasta este necesara pentru instalarea facila a MariaDB si folosirea interfetei phpMyAdmin pentru lucrul facil cu baza de date
   Se poate folosi si MariaDb Server 10.4.8
3. Python 3.10.1 descarcabil de aici: https://www.python.org/ftp/python/3.10.1/python-3.10.1-amd64.exe si disponibil in PATH
(la instalare sau dupa instalare prin optiunea Modify: Add Python to Environment Variables)

!!! Important: Portul pe care serverul de node ( backend ) este configurat pe 3000 si servirea continutului static pe portul 4201


## Instalarea proiectului

!!! Important: Inainte de rularea proiectului, cerintele de sistem trebuie satisfacute, serverul MariaDB sa fie pornit pe root fara credentiale cu urmatoarele configurari prezente:

    "username": "root",
    "password": null,
    "database": "calendar_test", (creata manual)
    "host": "127.0.0.1",

1. Se executa comanda git clone git@github.com:AlexandruCristian25/Proiect-Tehnologii-Web.git
2. Se instaleaza dependintele prin comenzile:
	2.1. In directorul frontend: npm install
	2.2. In directorul backend: npm install 
3. Se instaleaza helperul pentru comenzile cli Angular: npm install -g @angular/cli
4. Atat frontendul (localhost:4201 in browser) cat si backendul (localhost:3000) trebuie sa fie pornite prin comenzile:
	4.1. Frontend Angular din directorul frontend: ng serve --port 4201
	4.2. Backend ExpressJS din directorul backend: node server.js
	 
## Verificarea proiectului

1. Se apeleaza localhost:4201 in browser, acesta trebuie sa afiseze mesajul: calendar works!
2. Se apeleaza localhost:3000 in browser, acesta trebuie sa afiseze mesajul: Cannot GET /, deoarece nu exista ruta default pentru REST API

## Testarea proiectului ( backend )

Pentru testarea proiectului cititi "Instructiuni_testare_backend.md

a

	
