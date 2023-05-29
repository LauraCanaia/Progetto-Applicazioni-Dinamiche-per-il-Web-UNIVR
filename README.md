# Progetto-Applicazioni-Dinamiche-per-il-Web-UNIVR
Progetto di Applicazioni dinamiche per il web (2022/2023), creo adesso giusto per mettere la giusta ansietta

Backend in ExpressJS che estrae dati da un database Postgres che comunica attraverso GraphQL con un Frontend Angular che alla fiera mio padre comprò


Andando alla ciccia:

CONFIGURAZIONE NECESSARIA PRIMA DI FARLO PARTIRE:

- scaricare database (https://www.postgresqltutorial.com/postgresql-getting-started/postgresql-sample-database/) e importarlo in Postgres
- modificare il file server/.env con i dettagli di configurazione del proprio database Postgres


PER FARLO FUNZIONARE:

aprire il terminale e usare i seguenti comandi
- npm install (scarica i pacchetti necessari)
- npm run dev (fa partire il server in ascolto sulla porta 4000) 

per testare grapgql:
http://localhost:4000/graphql


esempi:
{movies{title}} -> lista di titoli di tutti i film

{movie(id:1){title}} -> titolo del film con id 1





TODO:

//pensare azioni in comune come middleware

// inserire autocompletamento parole (non ogni cambio di parola, ma ogni x millisecondi) guarda tutorial searchhearos