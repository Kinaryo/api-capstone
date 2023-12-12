const Motor = require('../models/motor')
const fs = require('fs')
const ExpressError = require('../utils/ErrorHandler')

module.exports.index = async (req, res) => {
    const {id} = req.params
    const motors = await Motor.find(id)
    const msg = req.flash('succes_msg','motor fetched successfully')
     res.json({msg, motors });
  }

// search function 
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
  }
module.exports.search = async (req, res) => {
    let motors;

    // Handling search
    if (req.query.search) {
      const searchRegex = new RegExp(escapeRegex(req.query.search), 'gi');
      motors = await Motor.find({ title: searchRegex });
    } else {
      // Handling filter
      if (req.query.sortBy === 'terbaru') {
        motors = await Motor.find().sort({ dateTime: -1 });
      } else if (req.query.sortBy === 'terlama') {
        motors = await Motor.find().sort({ dateTime: 1 });
      } else {
        motors = await Motor.find();
      }
    }
  //   Mengirim data sebagai JSON
    res.json({ motors });
  }

module.exports.detail = async (req, res) => {
    const { id } = req.params;
    const motor = await Motor.findById(id)
    .populate({
      path : 'comments',
      populate:{
        path:'author'
      }
    })
    .populate('author')
console.log(motor)
    res.json({ motor });
}
// menuju halaman input data 
module.exports.form = (req, res) => {
    res.json({ message: 'Halaman new post' });
};
module.exports.store = async (req, res) => {
  try {
    // Mendapatkan URL gambar dari request
    const imageUrls = req.files.map((file) => file.path);

    // Membuat objek motorData dengan data motor dari request dan menambahkan imageURL dan author
    const motorData = { ...req.body.motor, imageURL: imageUrls, author: req.user.id };

    // Membuat instance Motor dengan data yang telah dibuat
    const motor = new Motor(motorData);

    // Menyimpan data motor ke dalam database
    await motor.save();

    // Mengirimkan respon dengan data motor yang telah disimpan
    res.json({ motor });
  } catch (error) {
    // Menangani kesalahan jika terjadi
    console.error('Error storing motor:', error.message);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// menuju halaman edit 
module.exports.edit = async (req, res) => {
    const motor = await Motor.findById(req.params.id);
    res.json({ message: 'Halaman edit', motor });
};

  // Fungsi Update
module.exports.update = async (req, res) => {
  const { id } = req.params;
  try {
    let motor = await Motor.findById(id);
    if (!motor) {
      return res.status(404).json({ error: 'Motor not found' });
    }

    // Mengganti properti motor dengan data baru dari request
    motor.set({ ...req.body.motor, author: req.user.id });

    // Mengganti imageURL jika ada file yang di-upload
    if (req.file && req.file.path) {
      const newImageUrl = req.file.path;
      motor.imageURL = newImageUrl;
    }

    // Menyimpan perubahan ke dalam database
    await motor.save();

    req.flash('success_msg', 'Data motor berhasil di-update');
    res.json({ message: 'Motor updated successfully', motor });
  } catch (error) {
    console.error('Error updating motor:', error.message);
    res.status(500).json({ error: 'Failed to update motor', details: error.message });
  }
};

// Fungsi Destroy
module.exports.destroy = async (req, res) => {
  try {
    const { id } = req.params;
    const motor = await Motor.findById(id);

    if (!motor) {
      return res.status(404).json({ error: 'Motor tidak ditemukan' });
    }

    // Pastikan motor.imageURL adalah array sebelum mencoba mengiterasinya
    if (Array.isArray(motor.imageURL) && motor.imageURL.length > 0) {
      await Promise.all(
        motor.imageURL.map(async (image) => {
          try {
            await fs.unlink(image);
          } catch (unlinkError) {
            // Tangani error unlink, misalnya log error tersebut
            console.error(`Error unlinking image: ${unlinkError.message}`);
          }
        })
      );
    }

    // Menghapus data motor dari database
    await motor.deleteOne();

    req.flash('success_msg', 'Data berhasil dihapus');
    res.json({ message: 'Motor berhasil dihapus' });
  } catch (error) {
    console.error('Error menghapus motor:', error.message);
    res.status(500).json({ error: 'Error Server Internal' });
  }
};