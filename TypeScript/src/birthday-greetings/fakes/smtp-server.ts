import { beforeEach, afterEach } from 'vitest'
import { ParsedMail, simpleParser } from 'mailparser'
import { SMTPServer as SMTPServerFromLibrary } from 'smtp-server'
import type { Server } from 'node:net'

type Port = number

type SmtpServerOptions = {
  port: Port
}

type SmtpServer = {
  readonly port: number
  readonly inbox: Inbox
}

type Email = ParsedMail

interface Inbox {
  readonly emails: Email[]

  singleEmail(): Email

  clear(): void
}

export class InMemoryInbox implements Inbox {
  private readonly received: Email[] = []

  get emails() {
    return [...this.received]
  }

  singleEmail(): Email {
    if (this.received.length === 1) {
      return this.received[0]
    }
    throw new Error(`there are ${this.received.length} received emails`)
  }

  clear(): void {
    this.received.length = 0
  }

  onReceive(email: Email) {
    this.received.push(email)
  }
}

export const setupSmtpServer = (options: Partial<SmtpServerOptions> = {}): SmtpServer => {
  let inbox: InMemoryInbox
  const port = options.port ?? 0

  const server = new SMTPServerFromLibrary({
    // disable STARTTLS to allow authentication in clear text mode
    logger: false,
    disabledCommands: ['STARTTLS', 'AUTH'],

    async onData(stream, _session, callback) {
      try {
        inbox.onReceive(await simpleParser(stream))
        callback()
      } catch (e) {
        if (e instanceof Error) {
          callback(e)
        } else {
          callback(new Error('unknown error'))
        }
      }
    },
  })
  server.on('error', (err) => {
    console.log('Error %s', err.message)
  })

  let delegate: Server

  beforeEach(() => {
    inbox = new InMemoryInbox()
    delegate = server.listen(port)
  })

  afterEach(() => {
    server.close()
  })

  return new (class implements SmtpServer {
    get inbox(): Inbox {
      return inbox
    }

    get port() {
      const address = delegate.address()
      if (address === null || typeof address === 'string') {
        throw new Error('no port information')
      }
      return address.port
    }
  })()
}
