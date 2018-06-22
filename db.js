const pgp = require('pg-promise')();
const cn = {
    host: 'localhost',
    port: 5432,
    database: 'super-todo-app',
    user: 'postgres',
    password: ''
};
const db = pgp(cn);

function getOne(id) {
    return db.oneOrNone('select * from todos where id=$1', [id]);
}

// getTodo(2)
//     .then(function(data) {
//         // success;
//         console.log(data);
//     })
//     .catch(function(error) {
//         // error;
//         console.log(error);
//     });

function getAll() {
    return db.any('select * from todos');
}

// getAll()
//     .then((data) => {
//         console.log(data);
//     })
//     .catch((error) =>{
//         console.log(error);
//     });

function getPending() {
    return db.any('select * from todos where isDone=false');
}

// getPending()
//     .then((data) => {
//         console.log(data)
//     })
//     .catch((error) => {
//         console.log(error)
//     });

function getFinished(){
    return db.any('select * from todos where isDone=true');
}

// getFinished()
//     .then((data) => {
//         console.log(data)
//     })
//     .catch((error) => {
//         console.log(error)
//     });

function searchByTitle(searchString){
    return db.any("select * from todos where title ilike '%$1#%'", [searchString]);
}

// searchByTitle('buy')
//     .then(function(data) {
//         // success;
//         console.log(data);
//     })
//     .catch(function(error) {
//         // error;
//         console.log(error);
//     });



module.exports = {
    getOne,
    getAll,
    getPending,
    getFinished,
    searchByTitle
};