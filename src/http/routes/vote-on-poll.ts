import { z } from 'zod'
import { randomUUID } from 'node:crypto'
import type { FastifyInstance } from 'fastify'
import { PrismaClient } from '../../generated/prisma/index.js'
import { redis } from '../../lib/redis.js'

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

    let { sessionId } = request.cookies

    if (sessionId) {
      const userPreviousVoteOnPoll = await prisma.vote.findUnique({
        where: {
          sessionId_pollId: {
            sessionId,
            pollId,
          },
        },
      })

      if(userPreviousVoteOnPoll && userPreviousVoteOnPoll.pollOptionId !== pollOptionId) {

        await prisma.vote.delete({
          where: {
            id: userPreviousVoteOnPoll.id,
          }
        })

        await redis.zincrby(pollId, -1, userPreviousVoteOnPoll.pollOptionId)
      } else if(userPreviousVoteOnPoll){

        return reply.status(400).send({ message: 'You already voted on this poll.'})

      }
    }

    if(!sessionId) {
      sessionId = randomUUID()

      reply.setCookie('sesseionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30,
        signed: true,
        httpOnly: true,
      })
    }

    await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionId,
      }
    })

    await redis.zincrby(pollId, 1, pollOptionId)

    return reply.status(201).send()
  })
}