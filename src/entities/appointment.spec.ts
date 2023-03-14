import { test, describe, expect } from 'vitest'
import { getFutureDate } from '../tests/utils/get-future-date'
import { Appointment } from './appointment'

describe('Appointment', () => {
  test('Create an appointment', () => {
    const startsAt = getFutureDate('2023-03-08')
    const endsAt = getFutureDate('2023-03-10')
    const appointment = new Appointment({
      customer: 'John Doe',
      startsAt,
      endsAt
    })

    expect(appointment).toBeInstanceOf(Appointment)
    expect(appointment.customer).toBe('John Doe')
  })

  test('Cannot create an appointment with end date before start date', () => {
    const startsAt = getFutureDate('2023-03-08')
    const endsAt = getFutureDate('2023-03-07')
    startsAt.setDate(startsAt.getDate() + 2)
    endsAt.setDate(endsAt.getDate() + 1)

    expect(() => {
      return new Appointment({
        customer: 'John Doe',
        startsAt,
        endsAt
      })
    }).toThrowError('Invalid endDate')
  })

  test('Cannot create an appointment with start date before now', () => {
    const startsAt = new Date()
    const endsAt = new Date()
    startsAt.setDate(startsAt.getDate() - 1)
    endsAt.setDate(endsAt.getDate() + 10)

    expect(() => {
      return new Appointment({
        customer: 'John Doe',
        startsAt,
        endsAt
      })
    }).toThrowError('Invalid startDate')
  })
})
