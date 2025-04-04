/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { createTransport, Transporter } from 'nodemailer';

export const transporter: Transporter = createTransport({
  host: 'smtp.ethereal.email',
  port: 587,
  secure: false,
  auth: {
    user: 'maudie.lowe@ethereal.email', //!https://ethereal.email/ -> Access test
    pass: 'UVMqmED83XNYcHhq1y',
  },
});
