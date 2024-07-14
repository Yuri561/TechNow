const multer = require('multer');
const path = require('path');

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname);
    }
})


const upload = multer({ storage });


// Middleware to handle JSON requests
app.use(express.json());

// Upload endpoint
app.post('/upload/:id', upload.single('document'), async (req, res) => {
  const { id } = req.params;

  if (req.file) {
    try {
      const workOrder = await WorkOrderModel.findById(id);
      if (!workOrder) {
        return res.status(404).json({ message: 'Work order not found' });
      }

      // Add file path to the documents array in the work order
      workOrder.Documents.push(req.file.path);
      await workOrder.save();

      res.status(200).json({
        message: 'File uploaded and work order updated successfully',
        file: req.file,
        workOrder,
      });
    } catch (err) {
      console.error('Error updating work order:', err);
      res.status(500).json({ error: 'Could not update work order', details: err.message });
    }
  } else {
    res.status(400).json({ message: 'No file uploaded' });
  }
});