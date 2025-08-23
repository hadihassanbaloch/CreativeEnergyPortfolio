// server/index.js
import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import multer from 'multer'
import nodemailer from 'nodemailer'
import { z } from 'zod'

const app = express()

// Body parsers
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// CORS
const allowedOrigins = [
  'http://localhost:5173',
  'https://creativeenergy.pk',
  'https://www.creativeenergy.pk',
  'https://api.creativeenergy.pk',
].filter(Boolean)

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin || allowedOrigins.includes(origin)) return cb(null, true)
      return cb(new Error('Not allowed by CORS'))
    },
  })
)

// Multer (optional single file)
const upload = multer({
  storage: multer.memoryStorage(),
  limits: { fileSize: 10 * 1024 * 1024 },
})

// Validation
const ContactSchema = z.object({
  name: z.string().min(2).max(120),
  email: z.string().email(),
  company: z.string().max(200).optional().or(z.literal('')),
  challenge: z.string().min(10).max(5000),
  nextStep: z.enum(['call', 'workshop', 'rfp']),
})

// Mail transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: Number(process.env.SMTP_PORT || 587),
  secure: String(process.env.SMTP_SECURE) === 'true', // true for 465
  auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
})

/* -------------------- Routes -------------------- */

// Root (both / and /api for cPanel readiness checks)
app.get(['/', '/api'], (_req, res) => {
  res.type('text/html')
  res.send('OK')
})

// Health
app.get(['/health', '/api/health'], (_req, res) => res.json({ ok: true }))

// Contact (accepts prefixed and unprefixed)
app.post(['/contact', '/api/contact'], upload.single('file'), async (req, res) => {
  try {
    const parsed = ContactSchema.safeParse({
      name: req.body.name,
      email: req.body.email,
      company: req.body.company,
      challenge: req.body.challenge,
      nextStep: req.body.nextStep,
    })
    if (!parsed.success) {
      return res.status(400).json({ ok: false, error: parsed.error.flatten() })
    }

    const { name, email, company, challenge, nextStep } = parsed.data
    const to = process.env.MAIL_TO || process.env.SMTP_USER

    const subject = `New website brief from ${name} (${email})`
    const html = `
      <h2>New Website Brief</h2>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Company:</strong> ${company || '-'}</p>
      <p><strong>Preferred next step:</strong> ${nextStep}</p>
      <p><strong>Challenge:</strong></p>
      <pre style="white-space:pre-wrap;font-family:ui-monospace,Menlo,Consolas,monospace">${challenge}</pre>
    `

    const attachments = []
    if (req.file) {
      attachments.push({
        filename: req.file.originalname,
        content: req.file.buffer,
        contentType: req.file.mimetype,
      })
    }

    await transporter.sendMail({
      from: `"CreativeEnergy Website" <${process.env.SMTP_USER}>`,
      to,
      replyTo: email,
      subject,
      html,
      attachments,
    })

    res.json({ ok: true })
  } catch (err) {
    console.error('❌ EMAIL_SEND_FAILED:', err)
    res.status(500).json({ ok: false, error: 'EMAIL_SEND_FAILED' })
  }
})

const PORT = Number(process.env.PORT || 5174)
app.listen(PORT, () => {
  console.log(`Email API listening on port ${PORT}`)
})
