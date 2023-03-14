import { Appointment } from '../../entities/appointment'
import { AppointmentRepository } from '../appointment-repository'
import { areIntervalsOverlapping } from 'date-fns'

export class InMemoryAppointmentsRepository implements AppointmentRepository {
  public items: Appointment[] = []

  async create (appointment: Appointment): Promise<void> {
    this.items.push(appointment)
  }

  async findOverlappingAppointment (startAt: Date, endsAt: Date): Promise<Appointment | null> {
    const overllapingAppointment = this.items.find(item => {
      return areIntervalsOverlapping({ start: startAt, end: endsAt }, { start: item.startsAt, end: item.endsAt }, {
        inclusive: true
      })
    })

    if (!overllapingAppointment) {
      return null
    }

    return overllapingAppointment
  }
}
