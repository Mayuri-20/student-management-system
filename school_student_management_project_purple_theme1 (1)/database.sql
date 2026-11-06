CREATE DATABASE IF NOT EXISTS school;
USE school;

CREATE TABLE IF NOT EXISTS student (
    student_id INT PRIMARY KEY,
    student_name VARCHAR(100) NOT NULL,
    total INT NOT NULL
);

-- Optional sample records. Run these only once, or change the IDs first.
INSERT INTO student (student_id, student_name, total) VALUES
(101, 'Ananya Rao', 450),
(102, 'Rahul Kumar', 420),
(103, 'Priya Sharma', 475);
