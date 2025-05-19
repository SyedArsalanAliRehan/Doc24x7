const express = require('express');
const cors = require('cors');
const app = express();
const authRoutes = require('./routes/auth');

app.use(cors());
app.use(express.json());
app.use('/', authRoutes);

// ✅ MUST bind to 0.0.0.0 to accept public traffic!
const PORT = 3000;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`Auth Service running on port ${PORT}`);
});
