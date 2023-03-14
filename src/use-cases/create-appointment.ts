import { Appointment } from '../entities/appointment'
import { AppointmentRepository } from '../repositories/appointment-repository'

interface CreateAppointmentRequest {
  customer: string
  startsAt: Date
  endsAt: Date
}

type CreateAppointmentResponse = Appointment

export class CreateAppointment {
  constructor (private appointmentRepository: AppointmentRepository) {}
  async execute ({
    customer,
    endsAt,
    startsAt
  }: CreateAppointmentRequest): Promise<CreateAppointmentResponse> {
    const overllapingAppointment = await this.appointmentRepository.findOverlappingAppointment(startsAt, endsAt)
    if (overllapingAppointment) {
      throw new Error('Another appointment overlaps this appointment dates')
    }
    const appointment = new Appointment({ customer, endsAt, startsAt })

    await this.appointmentRepository.create(appointment)
    return appointment
  }
}
