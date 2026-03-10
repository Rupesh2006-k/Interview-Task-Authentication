const emailTemplate = ({ name, url }) => {
  return `
  <div style="font-family: Arial, sans-serif; background-color:#f9fafb; padding:40px;">
    
    <div style="max-width:600px; margin:auto; background:#ffffff; padding:30px; border-radius:10px; box-shadow:0 4px 10px rgba(0,0,0,0.05);">

      <h1 style="text-align:center; color:#22c55e; margin-bottom:20px;">
        Welcome to Our Authentication System 
      </h1>

      <h2 style="color:#333;">Hello ${name},</h2>

      <p style="color:#555; font-size:16px; line-height:1.6;">
        Thank you for creating an account. To complete your registration,
        please verify your email address by clicking the button below.
      </p>

      <div style="text-align:center;">
        <a 
          href="${url}" 
          target="_blank"
          style="
            display:inline-block;
            margin-top:25px;
            padding:12px 28px;
            background-color:#22c55e;
            color:#ffffff;
            text-decoration:none;
            border-radius:6px;
            font-size:16px;
            font-weight:bold;
          ">
          Verify Email
        </a>
      </div>

      <p style="color:#555; font-size:14px; margin-top:25px;">
        If the button doesn't work, copy and paste this link into your browser:
      </p>

      <p style="word-break:break-all; color:#2563eb;">
        ${url}
      </p>

      <hr style="margin:30px 0; border:none; border-top:1px solid #eee;" />

      <p style="font-size:13px; color:#999;">
        If you did not create this account, you can safely ignore this email.
      </p>

      <p style="font-size:13px; color:#999;">
        © ${new Date().getFullYear()} Authentication System 
      </p>

    </div>

  </div>
  `
}

export default emailTemplate
