import express from 'express'
import { NodemailerMailAdapter } from './repositories/adapters/nodemailer/nodemailer-mail-adapter';
import { PrismaFeedbackRepository } from './repositories/prisma/prisma-feedbacks-repository';
import { SubmitFeedbackService } from './services/submit-feedback-service';

export const routes = express.Router()

routes.post('/feedbacks', async (req, res) => {
  const { type, comment, screenshot } = req.body

  const prismaFeedbackRepository = new PrismaFeedbackRepository()
  const nodemailerMailAdapter = new NodemailerMailAdapter()

  const submitFeedbackService = new SubmitFeedbackService(
    prismaFeedbackRepository,
    nodemailerMailAdapter
  ) 

  await submitFeedbackService.execute({
    type,
    comment,
    screenshot
  })



  return res.status(201).send();
})
