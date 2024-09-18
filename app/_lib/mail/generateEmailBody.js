export function generateEmailBody(name, email, type, message) {
  return `
      <body style="font-family: Arial, sans-serif; background-color: #f0f0f0; color: #333333; text-align: center; margin: 20px 0; padding: 0;">
        <div style="max-width: 600px; margin: 0 auto; background-color: #ffffff; border: 1px solid #dddddd; padding: 20px; border-radius: 8px; text-align: left; box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);">
          <div style="background-color: #007bff; color: #ffffff; padding: 15px; border-radius: 8px 8px 0 0; font-size: 24px; font-weight: bold; box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);">
            New Message
          </div>
          <div style="margin: 20px 0; border-top: 1px solid #dddddd; border-bottom: 1px solid #dddddd; padding: 15px; border-radius: 5px; background-color: #fafafa;">
            <p style="margin: 10px 0; line-height: 1.6; padding: 10px; border-radius: 5px; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
              <span style="font-weight: bold; color: #007bff;">Name:</span>
              ${name}
            </p>
            <p style="margin: 10px 0; line-height: 1.6; padding: 10px; border-radius: 5px; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
              <span style="font-weight: bold; color: #007bff;">Email:</span>
              ${email}
            </p>
            <p style="margin: 10px 0; line-height: 1.6; padding: 10px; border-radius: 5px; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
              <span style="font-weight: bold; color: #007bff;">Type:</span>
              ${type}
            </p>
            <p style="margin: 10px 0; line-height: 1.6; padding: 10px; border-radius: 5px; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
              <span style="font-weight: bold; color: #007bff;">Message:</span>
            </p>
            <p style="margin: 10px 0; line-height: 1.6; padding: 10px; border-radius: 5px; background-color: #ffffff; box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);">
              ${message}
            </p>
          </div>
        </div>
      </body>
    `;
}
