import emailjs from "@emailjs/browser";

var serviceID = "service_zqc8e0c";
var templateID = "template_v3tovqu";
var publicKey = "s8DtZzdf02FdR_VBZ";

export async function sendEmail(to, subject, body) {
  var templateParams = {
    email: to,
    subject: subject,
    message: body,
  };

  emailjs
    .send(serviceID, templateID, templateParams, publicKey)
    .then(
      function (response) {
        console.log("SUCCESS!", response.status, response.text);
      },
      function (error) {
        console.log("FAILED...", error);
      }
    )
    .catch((error) => {
      console.log(error);
    });
}
