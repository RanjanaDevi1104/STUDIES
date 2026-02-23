import ImageKit from 'imagekit';
import dotenv from 'dotenv';
import UserFile from '../Model/BcaModel.js';

dotenv.config();

const imagekit = new ImageKit({
  publicKey: process.env.IMAGEKIT_PUBLICKEY,
  privateKey: process.env.IMAGEKIT_PRIVATEKEY,
  urlEndpoint: process.env.IMAGEKIT_URL,
});

export const Uploadfile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "File not found" });
    }

    const result = await imagekit.upload({
  file: `data:${req.file.mimetype};base64,${req.file.buffer.toString("base64")}`,
  fileName: req.file.originalname,
  folder: "/courses",
});


    const saved = await UserFile.create({
  name: req.body.name,
  description: req.body.description,
  courses: req.body.courses,
  topic: req.body.topic,
  url: result.url,
  filename: result.name,
});


    res.status(200).json(saved);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const GetData = async (req, res) => {
  try {
    const { courses } = req.query; // ✅ GET ke liye query

    let data;

    if (courses) {
      data = await UserFile.find({ courses: courses });
    } else {
      data = await UserFile.find();
    }

    res.status(200).json(data);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

