const pool = require('../DBconnection/db');


exports.getMessage = (req, res) => {
  res.json({ message: "Hello from the backend! 👋" });
};

// POST /data
exports.postData = (req, res) => {
  const { name } = req.body;
  res.json({ message: `Hi ${name}, your data is received!` });
};

exports.contact=  async (req, res) => {
  // Destructure the data from the request body
  console.log('Received data:', req.body);
  const { fullName, emailAddress, phone, interest, comments } = req.body;

  // Basic validation to ensure required fields are present
  if (!fullName || !emailAddress) {
    return res.status(400).json({ error: 'Full name and email address are required.' });
  }

  // SQL query to insert the new submission into our table
  const insertQuery = `
    INSERT INTO contact_submissions(full_name, email_address, phone, interest, comments)
    VALUES($1, $2, $3, $4, $5)
    RETURNING *;
  `;
  const values = [fullName, emailAddress, phone, interest, comments];

  try {
    const newSubmission = await pool.query(insertQuery, values);
    // Send a "201 Created" response with the data that was saved
    res.status(201).json(newSubmission.rows[0]);
  } catch (err) {
    console.error("Database insert error:", err.message);
    res.status(500).send('Server error');
  }
};




exports.contact_submissions = async (req, res) => {
  try {
    const allSubmissions = await pool.query(
      "SELECT * FROM contact_submissions ORDER BY submitted_at DESC"
    );
    // Respond with the list of all submissions as JSON
    res.json(allSubmissions.rows);
  } catch (err) {
    console.error("Database select error:", err.message);
    res.status(500).send('Server error');
  }
};