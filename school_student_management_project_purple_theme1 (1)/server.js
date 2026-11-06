const express = require("express");
const mysql = require("mysql2");
const path = require("path");

const app = express();
const PORT = 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
    database: "school"
});

db.connect((error) => {
    if (error) {
        console.error("MySQL connection failed:", error.message);
        console.error("Check the MySQL password and make sure MySQL Server is running.");
        return;
    }
    console.log("Connected to MySQL database: school");
});

app.get("/students", (req, res) => {
    db.query("SELECT student_id, student_name, total FROM student ORDER BY student_id",
        (error, results) => {
            if (error) return res.status(500).json({ message: "Could not load students." });
            res.json(results);
        });
});

app.get("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).json({ message: "Enter a valid student number." });
    }

    db.query("SELECT student_id, student_name, total FROM student WHERE student_id = ?",
        [id], (error, results) => {
            if (error) return res.status(500).json({ message: "Could not search for the student." });
            if (results.length === 0) return res.status(404).json({ message: "Student not found." });
            res.json(results[0]);
        });
});

app.post("/students", (req, res) => {
    const id = Number(req.body.student_id);
    const name = String(req.body.student_name || "").trim();
    const total = Number(req.body.total);

    if (!Number.isInteger(id) || id < 1 || !name || !Number.isInteger(total) || total < 0 || total > 1000) {
        return res.status(400).send("Enter a valid student number, name, and total marks (0–1000).");
    }

    db.query("INSERT INTO student (student_id, student_name, total) VALUES (?, ?, ?)",
        [id, name, total], (error) => {
            if (error && error.code === "ER_DUP_ENTRY") {
                return res.status(409).send("That student number already exists.");
            }
            if (error) return res.status(500).send("Could not insert student. Check the server terminal.");
            res.status(201).send("Student added successfully.");
        });
});

app.put("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    const name = String(req.body.student_name || "").trim();
    const total = Number(req.body.total);

    if (!Number.isInteger(id) || id < 1 || !name || !Number.isInteger(total) || total < 0 || total > 1000) {
        return res.status(400).send("Enter a valid student number, name, and total marks (0–1000).");
    }

    db.query("UPDATE student SET student_name = ?, total = ? WHERE student_id = ?",
        [name, total, id], (error, result) => {
            if (error) return res.status(500).send("Could not update student.");
            if (result.affectedRows === 0) return res.status(404).send("Student not found.");
            res.send("Student updated successfully.");
        });
});

app.delete("/students/:id", (req, res) => {
    const id = Number(req.params.id);
    if (!Number.isInteger(id) || id < 1) {
        return res.status(400).send("Enter a valid student number.");
    }

    db.query("DELETE FROM student WHERE student_id = ?", [id], (error, result) => {
        if (error) return res.status(500).send("Could not delete student.");
        if (result.affectedRows === 0) return res.status(404).send("Student not found.");
        res.send("Student deleted successfully.");
    });
});

app.listen(PORT, () => {
    console.log(`Student Management is running at http://localhost:${PORT}`);
});
