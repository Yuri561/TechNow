const express = require('express');
const cors = require('cors');
require('./database'); // Ensure the database connection is established
const employeeRoutes = require('./routes/employeeRoute');
const workOrderRoutes = require('./routes/workOrderRoute');

const app = express();

app.use(express.json());
app.use(cors());

// Ensure you are using the routers correctly
app.use('/api', employeeRoutes); 
app.use('/api', workOrderRoutes); // This ensures /api/workorders is handled

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
