import { describe, it, expect } from 'vitest'
import { Appointment } from '../entities/appointment'
import { InMemoryAppointmentsRepository } from '../repositories/in-memory/in-memory-appointments-repository'
import { getFutureDate } from '../tests/utils/get-future-date'
import { CreateAppointment } from './create-appointment'

describe('Create an Appointment', () => {
  it('should be able to create an appointment', () => {
    const startsAt = getFutureDate('2023-03-08')
    const endsAt = getFutureDate('2023-03-17')

    const appointmentRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(appointmentRepository)
    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })).resolves.toBeInstanceOf(Appointment)
  })

  it('should not to be able to create an appointment with overlapping dates', async () => {
    const startsAt = getFutureDate('2023-03-10')
    const endsAt = getFutureDate('2023-03-15')

    const appointmentRepository = new InMemoryAppointmentsRepository()
    const createAppointment = new CreateAppointment(appointmentRepository)
    await createAppointment.execute({
      customer: 'John Doe',
      startsAt,
      endsAt
    })

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-03-14'),
      endsAt: getFutureDate('2023-03-18')
    })).rejects.toThrow('Another appointment overlaps this appointment dates')

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-03-08'),
      endsAt: getFutureDate('2023-03-12')
    })).rejects.toThrow('Another appointment overlaps this appointment dates')

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-03-07'),
      endsAt: getFutureDate('2023-03-20')
    })).rejects.toThrow('Another appointment overlaps this appointment dates')

    expect(createAppointment.execute({
      customer: 'John Doe',
      startsAt: getFutureDate('2023-03-12'),
      endsAt: getFutureDate('2023-03-13')
    })).rejects.toThrow('Another appointment overlaps this appointment dates')
  })
})
