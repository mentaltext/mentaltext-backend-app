import { config } from "@/main/providers/LocalsProvider";
import twilio from "twilio";

const PHONE_NUMBER = "+16629673770";

const client = twilio(config().twilioAccountSid, config().twilioAuthToken);

export const sendSMS = async (to: string, body: string) => {
  try {
    const message = await client.messages.create({
      to,
      from: PHONE_NUMBER,
      body,
    });

    console.log("Message sent:", message.sid);
  } catch (error) {
    console.error("Error sending SMS:", error);
    throw new Error("Failed to send SMS");
  }
};
