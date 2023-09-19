import * as chai from 'chai'
import { test, expect } from 'vitest'
// @ts-ignore
import { ChaiPlugin } from './chai-email.js'
import { Model } from './chai-email-converted.js'

chai.use(ChaiPlugin)

declare global {
  export namespace Chai {
    interface Assertion {
      responseText(expectedText: string): Promise<void>
    }
  }
}

declare global {
  namespace Chai {
    // interface LanguageChains {
    //   model: Assertion
    // }

    interface Model {
      (type: string, message?: string): Assertion
    }

    interface Age extends LanguageChains, NumericComparison {
      (age: number, message?: string): Assertion
    }

    interface Assertion {
      model: Model
      age: Age
    }
  }
}

test('general model', () => {
  const arthur = new Model('person')
  arthur.set('name', 'Arthur Dent')
  arthur.set('occupation', 'traveller')
  expect(arthur).to.be.a.model
  expect(arthur).to.be.a.model('person')
  expect(arthur.get('name')).toBe('Arthur Dent')
})

test('age model', () => {
  const arthur = new Model('person')
  arthur.set('id', 42)
  arthur.set('name', 'Arthur Dent')
  arthur.set('occupation', 'traveller')
  arthur.set('age', 27)
  expect(true).to.be.ok
  expect(arthur).to.be.ok
  expect(arthur).to.have.age(27)
  expect(arthur).to.have.age.above(17)
  expect(arthur).to.not.have.age.below(18)
})

test('overwrite structure', () => {
  const arthur = new Model('person')
  expect(arthur).to.not.be.ok

  arthur.set('id', 'not a number')
  expect(arthur).to.not.be.ok

  arthur.set('id', 42)
  expect(arthur).to.be.ok
  expect(true).to.be.ok
})
