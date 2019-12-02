const express = require('express');
const router = express.Router();
const pool = require('../modules/pool');

// CREATE TODO GET
router.get('/', (req, res) => {
    const queryText = `SELECT * FROM "todo" ORDER BY "id" ASC;`

    pool.query(queryText)
        .then((response) => {
            res.send(response.rows);
        })
        .catch((err) => {
            console.log('Error with GET: ', err);
            res.sendStatus(500);
        });
});

// CREATE TODO POST
router.post('/', (req, res) => {
    const newTask = req.body;
    // {
    //     text: 'string',
    // }
    // setting default completion
    newTask.complete = false;
    const queryText = `INSERT INTO "todo" ("task", "complete")
    VALUES ($1, $2);`;

    pool.query(queryText, [newTask.text, newTask.complete])
        .then((response) => {
            console.log(response);
            res.sendStatus(201);
        })
        .catch((err) => {
            console.log('Error with POST: ', err);
            res.sendStatus(500);
        });

});

// CREATE TODO PUT
router.put('/:id', (req, res) => {
    const taskUpdate = req.body;
    // {
    //     complete: Boolean,
    // }
    const taskId = req.params.id;
    const queryText = `UPDATE "todo" SET "complete"=$1 WHERE "id"=$2;`;

    pool.query(queryText, [taskUpdate.complete, taskId])
        .then((response) => {
            console.log(response);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error with PUT: ', err);
            res.sendStatus(500);
        });

});

router.delete('/:id', (req, res) => {
    const taskId = req.params.id;
    const queryText = `DELETE FROM "todo" WHERE "id"=$1;`;

    pool.query(queryText, [taskId])
        .then((response) => {
            console.log(response);
            res.sendStatus(200);
        })
        .catch((err) => {
            console.log('Error with DELETE: ', err);
            res.sendStatus(500);
        });

});

module.exports = router;