import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import { PrismaClient } from '../../generated/prisma/index.js'

export async function getPoll(app: FastifyInstance) {
  
  const prisma = new PrismaClient()

  app.get('/polls/:pollId', async (request, reply) => {
    const getPollParams = z.object({
      pollId: z.string().uuid(),
    })

    const { pollId } = getPollParams.parse(request.params)

    const poll = await prisma.poll.findUnique({
      where: {
        id: pollId,
      },
      include: {
         options: {
            select: {
              id: true,
              title: true,
            },
         },
      },
    })

    return reply.send({ poll })
  })
}