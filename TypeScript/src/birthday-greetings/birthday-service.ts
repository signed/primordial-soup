import * as fs from 'fs'
import * as readline from 'readline'
import * as nodemailer from 'nodemailer'
import { XDate } from './date.js'
import { Employee } from './employee.js'

export class BirthdayService {
  public async sendGreetings(fileName: string, xDate: XDate, smtpHost: string, smtpPort: number): Promise<void> {
    const fileStream = fs.createReadStream(fileName)
    const rl = readline.createInterface({
      input: fileStream,
      crlfDelay: Infinity,
    })

    let firstLine = true
    for await (const line of rl) {
      if (firstLine) {
        firstLine = false
        continue
      }
      const employeeData = line.split(', ')
      const employee = new Employee(employeeData[1], employeeData[0], employeeData[2], employeeData[3])
      if (employee.isBirthday(xDate)) {
        const recipient = employee.getEmail()
        const body = 'Happy Birthday, dear %NAME%'.replace('%NAME%', employee.getFirstName())
        const subject = 'Happy Birthday!'
        await this.sendMessage(smtpHost, smtpPort, 'sender@here.com', subject, body, recipient)
      }
    }
  }

  private async sendMessage(
    smtpHost: string,
    smtpPort: number,
    sender: string,
    subject: string,
    body: string,
    recipient: string,
  ): Promise<void> {
    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
    })

    const mailOptions = {
      from: sender,
      to: recipient,
      subject: subject,
      text: body,
    }

    await transporter.sendMail(mailOptions)
  }
}
