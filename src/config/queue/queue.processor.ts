/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { Processor, Process } from '@nestjs/bull';
import { transporter } from '../nodemailer/transporter';

@Processor('emailQueue')
export class QueueProcessor {
  @Process('send-email')
  async handleSendEmail(job: {
    data: { to: string | string[]; subject: string; body: string };
  }) {
    await transporter.sendMail({
      from: '"Maddison Foo Koch 👻" <maudie.lowe@ethereal.email>',
      to: job.data.to,
      subject: job.data.subject,
      text: job.data.body,
      html: `<b>${job.data.body}</b>`,
    });

    // Aqui você chamaria o serviço de e-mail real (ex: nodemailer)
  }
}
