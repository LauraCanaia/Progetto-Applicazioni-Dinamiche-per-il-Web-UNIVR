# Progetto-Applicazioni-Dinamiche-per-il-Web-UNIVR
Progetto di Applicazioni dinamiche per il web (2022/2023), creo adesso giusto per mettere la giusta ansietta

Backend in ExpressJS che estrae dati da un database Postgres che comunica attraverso GraphQL(TODO, per ora API REST) con un Frontend Angular che alla fiera mio padre comprò


Andando alla ciccia:

CONFIGURAZIONE NECESSARIA PRIMA DI FARLO PARTIRE:

- scaricare database (https://www.postgresqltutorial.com/postgresql-getting-started/postgresql-sample-database/) e importarlo in Postgres
- modificare il file db.js con i dettagli di configurazione del proprio database Postgres


PER FARLO FUNZIONARE:

aprire il terminale e usare i seguenti comandi
- npm install (scarica i pacchetti necessari)
- node server.js (fa partire il server in ascolto sulla porta 3000) 



Pagine/Dati disponibili per ora:

localhost:3000/                 -> hello world
localhost:3000/login            -> Hello login
localhost:3000/testpage         -> pagina invia testpage.html
localhost:3000/api/v1/login
    ->/:username&:password      -> true se password è 'password', false altrimenti
localhost:3000/api/v1/actors    -> json con lista attori presenti nel db
    ->/mock                     -> lista mockata di un paio di film
    ->/:id                      -> info su attore con l' id passato
localhost:3000/api/v1/movies    -> json con lista film presenti nel db
    ->/:title                   -> info su film col titolo passato