import { BirthdayService } from './birthday-service.js'
import { XDate } from './date.js'

const service = new BirthdayService()
service
  .sendGreetings('employee_data.txt', XDate.today(), 'localhost', 25)
  .then(() => {
    console.log('done')
  })
  .catch((e) => {
    console.log('failed', e)
  })
