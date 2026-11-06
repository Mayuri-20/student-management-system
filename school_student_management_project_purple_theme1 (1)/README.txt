CAMPUSDESK — SCHOOL STUDENT MANAGEMENT PROJECT
===============================================

PROJECT CONTENTS
- server.js: Node.js + Express backend and CRUD API
- database.sql: creates the school database and student table
- public/: six HTML pages and shared CSS
- package.json: required Node.js packages

IMPORTANT PHOTO NOTE
Each HTML page has a school-themed banner photo loaded from Unsplash over the internet.
An internet connection is required for these banner photos and the optional Google Font.
The site itself can still run without those external images.

STEP 1 — INSTALL SOFTWARE
1. Install Node.js LTS from https://nodejs.org/
2. Install MySQL Server and MySQL Workbench.
3. Open VS Code and open this extracted project folder.

STEP 2 — CREATE THE DATABASE
1. Open MySQL Workbench and connect to your local MySQL Server.
2. Open database.sql in a query tab (or copy its contents into a new query tab).
3. Click the lightning bolt Execute button.
4. In the SCHEMAS panel, refresh and confirm the school schema and student table exist.
5. The sample INSERT rows are optional. Run the SQL file only once unless you remove/change the sample rows.

STEP 3 — SET YOUR MYSQL PASSWORD
1. Open server.js in VS Code.
2. Find password: "YOUR_MYSQL_PASSWORD"
3. Replace it with the password you use for the MySQL root account.
4. If your MySQL root account has no password, use password: "".
5. Save server.js.

STEP 4 — INSTALL NODE PACKAGES
1. In VS Code choose Terminal > New Terminal.
2. Ensure the terminal path is the extracted project folder.
3. Run:
   npm install

If PowerShell says scripts are disabled, choose the terminal dropdown in VS Code and select Command Prompt, then run npm install there.

STEP 5 — START THE WEBSITE
Run:
   npm start

You should see a message that the website is running at http://localhost:3000
Keep this terminal open while using the site.

STEP 6 — OPEN THE WEBSITE
Open this address in your browser:
http://localhost:3000

Do not double-click the HTML files to open them directly. Use the localhost address so the pages can call the backend.

CRUD MEANING
- Create: Add Student page (POST /students)
- Read: All Students and Search pages (GET /students and GET /students/:id)
- Update: Update page (PUT /students/:id)
- Delete: Delete page (DELETE /students/:id)

DATABASE COLUMNS
student_id: unique student number (integer, primary key)
student_name: student's name (text)
total: total marks (integer)

TROUBLESHOOTING
- "Cannot find module mysql2": run npm install from the project folder.
- "Access denied for user root": correct the password in server.js.
- "ECONNREFUSED": ensure MySQL Server is running.
- Port 3000 already in use: close the other server or change PORT in server.js.
- A student number already exists: use a different number when adding a student.
- If a photo does not show: check your internet connection.
