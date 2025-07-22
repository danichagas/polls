import { z } from 'zod'
import type { FastifyInstance } from 'fastify'
import { PrismaClient } from '../../generated/prisma/index.js'

export async function voteOnPoll(app: FastifyInstance) {
  
  const prisma = new PrismaClient()

  app.post('/polls/:pollId/votes', async (request, reply) => {
    const voteOnPollBody = z.object({
      pollOptionId: z.string().uuid(),
    })

    const voteOnPollParams = z.object({
      pollId: z.string().uuid(),
    })

    const { pollId } = voteOnPollParams.parse(request.params)
    const { pollOptionId } = voteOnPollBody.parse(request.body)

    return reply.status(201).send()
  })
}