import express from "express";
import nodemailer from "nodemailer";
import dotenv from "dotenv";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

dotenv.config();
const PORT = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.get("/", (req, res) => {
  res.sendFile(join(__dirname, "index.html"));
});

app.post("/send", async (req, res) => {
    const { name, email, message } = req.body;
  console.log(req.body);
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.MAIL,
      pass: process.env.PASS,
    },
  });

    const mailOptions = {
      from: process.env.MAIL,
      to: email,
      subject: "Message from your Website",
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    };

  try {
    await transporter.sendMail(mailOptions);
    res.status(200).send("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).send("Error sending email");
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
