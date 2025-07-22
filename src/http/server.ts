import fastify from 'fastify'
import { createPoll } from './routes/create-poll.js'
import { getPoll } from './routes/get-poll.js'

const app = fastify()

app.register(createPoll)
app.register(getPoll)

app.listen({ port: 3333 }).then(() => {
  console.log('Server Running')
})