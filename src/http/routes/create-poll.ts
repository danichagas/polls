import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import { PrismaClient } from '../../generated/prisma/index.js'

export async function createPoll(app: FastifyInstance) {
  
  const prisma = new PrismaClient()

  app.post('/polls', async (request, reply) => {
    const createPollBody = z.object({
      title: z.string(),
      options:  z.array(z.string())
    })

    const { title, options } = createPollBody.parse(request.body)

    const poll = await prisma.poll.create({
      data: {
        title,
        options: {
          createMany: {
            data: options.map(option => {
              return { title: option }
            }),
          }
        },
      }
    })

    return reply.status(201).send({ pollId: poll.id })
  })
}