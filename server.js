const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const cors = require("cors");

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());







app.post("/send-data-myportfolio", (req, res) => {
  const { name, email, message, subject } = req.body;
  const nodemailer = require("nodemailer");

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
      user: 'muhammadfurqanch517@gmail.com',
      pass: 'ooszsmkdjtrmcmis',
    },
  });

  const storeMailOptions = {
    from: email,
    to: "muhammadfurqanch517@gmail.com",
    subject: `New Inquiry from ${name}: ${subject}`,
    html: `
      <center><img src="https://res.cloudinary.com/dzcecmml3/image/upload/v1745834808/furqan-img_t5ptqh.jpg" alt="Muhammad Furqan Logo" style="width: 70px; height:70px; border-radius:50%; border:2px solid #f28301; padding:5px; "></center>

      <center><h2 style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold; margin-bottom: 20px;">New Contact Form Submission</h2></center>

      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px;">You’ve received a new inquiry from the website contact form:</p>
      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px;"><strong>Name:</strong> ${name}</p>
      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px;"><strong>Email:</strong> ${email}</p>
      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px;"><strong>Subject:</strong> ${subject}</p>
      <hr style="border: 0.5px solid #ccc;">
      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px;"><strong>Message:</strong></p>
      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">${message}</p>
    `,
  };

  const userMailOptions = {
    from: "muhammadfurqanch517@gmail.com",
    to: email,
    subject: "Thank You for Contacting Muhammad Furqan",
    html: `
      <center><img src="https://res.cloudinary.com/dzcecmml3/image/upload/v1745834808/furqan-img_t5ptqh.jpg" alt="Muhammad Furqan Logo" style="width: 70px; height:70px; border-radius:50%; border:2px solid #f28301; padding:5px;"></center>

      <center><h2 style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 24px; font-weight: bold;">Hi ${name},</h2></center>

      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">Thank you for reaching out to <strong>Muhammad Furqan</strong> I’ve received your message and our team will review it shortly.</p>
      
      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px; margin-top: 10px;"><strong>Your message:</strong></p>
      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">"${message}"</p>

      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">I appreciate your interest and will get back to you as soon as possible. If you need immediate assistance, feel free to call us directly at +(407) 686 3865.</p>

      <p style="color: #3A3A3A; font-family: Arial, sans-serif; font-size: 16px; line-height: 1.5;">Best regards,<br><strong>Muhammad Furqan</strong><br>address, FL<br><a href="mailto:muhammadfurqanch517@gmail.com" style="color: #149ddd;">muhammadfurqanch517@gmail.com</a></p>
    `
  };

  transporter.sendMail(storeMailOptions, function(error, storeInfo) {
    if (error) {
      console.error(error);
      res.status(500).send("Error sending email to store");
    } else {
      console.log("Email sent to store: " + storeInfo.response);

      transporter.sendMail(userMailOptions, function(error, userInfo) {
        if (error) {
          console.error(error);
          res.status(500).send("Error sending email to user");
        } else {
          console.log("Email sent to user: " + userInfo.response);
          res.status(200).send("Form submitted successfully");
        }
      });
    }
  });
});



app.post('/api/book-appointment', (req, res) => {
  const { department, doctor, name, phone, email, date } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'awaisaggu1098@gmail.com',
      pass: 'erzktvusjhffvzvz',
    },
  });

  const adminMailOptions = {
    from: email,
    to: 'awaisaggu1098@gmail.com',
    subject: `New Appointment Booking from ${name}`,
    html: `
      <h2>New Appointment Request</h2>
      <p><strong>Department:</strong> ${department}</p>
      <p><strong>Doctor:</strong> ${doctor}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Phone:</strong> ${phone}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Date:</strong> ${date}</p>
    `,
  };

  const userMailOptions = {
    from: 'awaisaggu1098@gmail.com',
    to: email,
    subject: 'Appointment Request Received',
    html: `
      <h2>Hi ${name},</h2>
      <p>Thank you for booking an appointment with us. Here are the details:</p>
      <p><strong>Department:</strong> ${department}</p>
      <p><strong>Doctor:</strong> ${doctor}</p>
      <p><strong>Date:</strong> ${date}</p>
      <p>We'll contact you shortly to confirm your appointment.</p>
      <p>— CareWatch Health Team</p>
    `,
  };

  transporter.sendMail(adminMailOptions, (err, info) => {
    if (err) return res.status(500).send('Error sending admin email');

    transporter.sendMail(userMailOptions, (err2, info2) => {
      if (err2) return res.status(500).send('Error sending confirmation to user');
      res.status(200).send('Appointment request sent successfully');
    });
  });
});


app.post('/api/contact', (req, res) => {
  const { email, subject } = req.body;

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'awaisaggu1098@gmail.com',
      pass: 'erzktvusjhffvzvz',
    },
  });

  const adminMailOptions = {
    from: email,
    to: 'awaisaggu1098@gmail.com',
    subject: `New Contact Submission`,
    html: `
      <h2>New Contact Message</h2>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Subject:</strong> ${subject}</p>
    `,
  };

  const userMailOptions = {
    from: 'awaisaggu1098@gmail.com',
    to: email,
    subject: 'Thanks for Contacting Us',
    html: `
      <h2>Hi,</h2>
      <p>Thanks for reaching out! We received your message: <strong>${subject}</strong>.</p>
      <p>We’ll respond to you shortly.</p>
      <p>— CareWatch Health Team</p>
    `,
  };

  transporter.sendMail(adminMailOptions, (err, info) => {
    if (err) return res.status(500).send('Error sending to admin');

    transporter.sendMail(userMailOptions, (err2, info2) => {
      if (err2) return res.status(500).send('Error sending to user');
      res.status(200).send('Contact message sent successfully');
    });
  });
});





app.get("/", (req,res) =>{
  res.send("Backend server has started running successfully Muhammad saab...");
});

const server = app.listen(PORT, () => {
    console.log(`Server started on port ${PORT}`);
  });
  
