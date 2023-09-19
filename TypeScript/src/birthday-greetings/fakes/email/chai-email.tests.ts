import { describe, test, expect, beforeEach } from 'vitest'
import Chai from 'chai'
import { ChaiEmail } from './chai-email.js'
import { Email, setupSmtpServer } from './smtp-server.js'
import * as nodemailer from 'nodemailer'
import type { SendMailOptions } from 'nodemailer'

Chai.use(ChaiEmail)

const smtpServer = setupSmtpServer()

describe('basic mail', () => {
  let email: Email
  beforeEach(async () => {
    await sendMessage({
      from: 'sender@example.org',
      to: 'recipient@example.org',
      subject: 'Hello World!',
      text: 'How are you doing',
    })
    email = smtpServer.inbox.singleEmail()
  })

  test('from', () => {
    expect(email).from('sender@example.org')
    expect(email).not.from('bogus@example.org')
  })

  test('to', () => {
    expect(email).to('recipient@example.org')
    expect(email).not.to('bogus@example.org')
  })
})

const sendMessage = async (options: SendMailOptions) => {
  const transporter = nodemailer.createTransport({
    host: 'localhost',
    port: smtpServer.port,
  })

  await transporter.sendMail(options)
}
