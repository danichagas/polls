import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import { PrismaClient } from '../../generated/prisma/index.js'
import { redis } from '../../lib/redis.js'

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

    if(!poll) {
      reply.status(400).send({ message: 'Poll not found' })
    }

    const result = await redis.zrange(pollId, 0, -1, 'WITHSCORES')

    const votes = result.reduce((obj, line, index) => {
      if (index % 2 ===  0) {
        const score = result[index + 1]

        Object.assign(obj, { [line]: Number(score) })
      }

      return obj
    }, {} as Record<string, number>)

    return reply.send({ 
      poll: {
        id: poll?.id,
        title: poll?.title,
        options: poll?.options.map(option => {
          return {
            id: poll?.id,
            title: poll?.title,
            score: (option.id in votes) ? votes[option.id] : 0,
          }
        }) 
      }
     })
  })
}