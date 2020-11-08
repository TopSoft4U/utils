import nodemailer, {SentMessageInfo} from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";
import {getRepository} from "./typeorm/connection";
import {IEmailAccount} from "./typeorm/mixins/WithEmailAccount";
import {IEmailTemplate} from "./typeorm/mixins/WithEmailTemplate";
import {fakeT} from "./i18n";

const onMessageSent = (err: Error | null, info: SentMessageInfo) => {
  if (err) {

    return;
  }
  console.log(err, info);
};

const emailTemplateCache: EmailTemplateCache = {};
const TEMPLATE_TAG = "{{template}}";

const GetEmailTemplate = async (type: string, lang = "en") => {
  const key = `${lang}-${type}`;
  if (key in emailTemplateCache)
    return emailTemplateCache[key];

  const repo = await getRepository<IEmailTemplate>("EmailTemplate");
  const template = await repo.findOne({
    where: {
      type, enabled: true
    },
    loadEagerRelations: true
  });

  if (!template)
    return null;

  // Pick base from email layout
  const {emailLayout, emailAccount, subject, ...restTemplate} = template;
  let bodyHTML = `${emailLayout?.bodyHTML || TEMPLATE_TAG}`;
  let bodyText = `${emailLayout?.bodyText || TEMPLATE_TAG}`;

  // Replace template tag with template content
  bodyHTML = bodyHTML.replace(TEMPLATE_TAG, `${template.bodyHTML}`);
  bodyText = bodyText.replace(TEMPLATE_TAG, `${template.bodyText}`);

  emailTemplateCache[key] = {
    emailAccount, bodyHTML, bodyText, subject, template: restTemplate
  };
  return emailTemplateCache[key];
};

export const SendMessage = async (to: string, templateName: string, tags: Record<string, string> = {}) => {
  if (!process.env.BASE_URL)
    throw new Error(`${fakeT("Missing .env variable:", {ns: "api"})}: BASE_URL`);

  const tplCache = await GetEmailTemplate(templateName);
  if (!tplCache)
    return false;

  const {emailAccount, template} = tplCache;
  const {replyTo} = emailAccount;
  const {bcc} = template;

  let {bodyHTML, bodyText, subject} = tplCache;

  tags["baseUrl"] = process.env.BASE_URL!;
  Object.keys(tags).forEach(tag => {
    let value = tags[tag];

    value = value.replace(/(?:\r\n|\r|\n)/g, "<br>");

    subject = subject.replace(new RegExp(String.raw`{{${tag}}}`, "g"), value);
    bodyText = bodyText.replace(new RegExp(String.raw`{{${tag}}}`, "g"), value);
    bodyHTML = bodyHTML.replace(new RegExp(String.raw`{{${tag}}}`, "g"), value);
  });

  const {host, port, useSSL, username, password, email, senderName} = emailAccount!;

  const transporter = nodemailer.createTransport({
    host, port, secure: useSSL, auth: {
      user: username, pass: String(password)
    }
  } as SMTPTransport.Options);

  transporter.sendMail({
    from: {name: senderName, address: email},
    to, subject,
    text: bodyText, html: bodyHTML,
    bcc, replyTo,
  } as Mail.Options, onMessageSent);

  return true;
};

type EmailTemplateCacheItem = {
  emailAccount: IEmailAccount;
  bodyHTML: string;
  bodyText: string;
  subject: string;
  template: Omit<IEmailTemplate, "subject" | "emailAccount" | "emailLayout">
}

type EmailTemplateCache = Record<string, EmailTemplateCacheItem>;
