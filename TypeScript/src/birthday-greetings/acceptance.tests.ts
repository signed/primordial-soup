import { readFileSync } from 'node:fs'
import { expect, test } from 'vitest'
import format from 'date-fns/format'
import subYears from 'date-fns/subYears'
import subDays from 'date-fns/subDays'
import { BirthdayService } from './birthday-service.js'
import { XDate } from './date.js'
import { setupSmtpServer } from './smtp-server.js'
import { setupTemporaryFolder } from './temporary-folder.js'

const folder = setupTemporaryFolder()
const smtpServer = setupSmtpServer()

test('send greetings email when its somebodies birthday', async () => {
  const { inbox, port } = smtpServer
  const csv = `last_name, first_name, date_of_birth, email
Doe, John, ${birthDayTodayAsCsvString()}, john.doe@example.org`
  const csvFile = folder.writeFileWith(csv)

  await new BirthdayService().sendGreetings(csvFile, XDate.today(), 'localhost', port)

  const email = inbox.singleEmail()
  expect(email.subject).toEqual('Happy Birthday!')
  expect(email.text).toEqual('Happy Birthday, dear John\n')
  //expect(received).email.to('john.doe@foobar.com')
})

test('do no send email when nobodys birthday', async () => {
  const { inbox, port } = smtpServer
  const csv = `last_name, first_name, date_of_birth, email
Doe, John, ${birthDayYesterdayAsCsvString()}, john.doe@example.org`
  const csvFile = folder.writeFileWith(csv)

  await new BirthdayService().sendGreetings(csvFile, XDate.today(), 'localhost', port)
  expect(inbox.emails).to.be.empty
})

test('temporary file', () => {
  const path = folder.writeFileWith('the content')
  expect(readFileSync(path).toString()).toEqual('the content')
})

function birthDayTodayAsCsvString() {
  const today = new Date()
  const birthDay = subYears(today, 22)
  return format(birthDay, 'yyyy/MM/dd')
}

function birthDayYesterdayAsCsvString() {
  const today = new Date()
  const birthDay = subDays(subYears(today, 22), 1)
  return format(birthDay, 'yyyy/MM/dd')
}
