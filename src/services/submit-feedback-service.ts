import { MailAdapter } from "../repositories/adapters/mail-adapters";
import { FeedbacksRepository } from "../repositories/feedbacks-repository";

interface SubmitFeedbackServiceRequest{
  type: string,
  comment: string,
  screenshot?: string,
}

export class SubmitFeedbackService {

  constructor(
    private feedbacksRepository: FeedbacksRepository,
    private mailAdapter: MailAdapter,
    
  ) {}

  async execute(request: SubmitFeedbackServiceRequest) {
    const { type, comment, screenshot } = request;

    if(!type){
      throw new Error('Type is required')
    }

    if(!comment) {
      throw new Error('Comment is required')
    }

    if(screenshot && !screenshot.startsWith('data:image/png;base64')){
      throw new Error('Invalid Screenshot Format')
    }

    await this.feedbacksRepository.create({
      type,
      comment,
      screenshot,
    })

    await this.mailAdapter.sendmail({
      subject: 'Novo feedback',
      body: 
        [
          `<div style="font-family: sans-serif; font-size: 16px; color: #111;">`,
          `<p>tipo do feedback: ${type}</p>`,
          `<p>comentário: ${comment}</p>`,
          `</div>`
        ].join('\n')
    })
  }
}