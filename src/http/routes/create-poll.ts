import type { FastifyInstance } from 'fastify'
import { PrismaClient } from '../../generated/prisma/index.js'
import z from 'zod'

export async function createPoll(app: FastifyInstance) {

  const prisma = new PrismaClient()

  app.post('/polls', async (request, reply) => {
    const createPollBody = z.object({
      title: z.string()
    })

    const { title } = createPollBody.parse(request.body)

    const poll = await prisma.poll.create({
      data: {
        title,
      }
    })

    return reply.status(201).send({ pollId: poll.id })
  })
}