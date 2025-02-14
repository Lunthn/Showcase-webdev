using Microsoft.AspNetCore.Mvc;
using PortfolioNathanAPI.Models;
using System.Net.Mail;
using System.Net;

namespace PortfolioNathanAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {
        private readonly IConfiguration _configuration;

        public MailController(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        private async Task<bool> ValidateCaptcha(string captchaResponse)
        {
            using (var client = new HttpClient())
            {
                var secretKey = _configuration["Recaptcha:SecretKey"];
                var response = await client.PostAsync(
                    $"https://www.google.com/recaptcha/api/siteverify?secret={secretKey}&response={captchaResponse}",
                    null);

                var jsonString = await response.Content.ReadAsStringAsync();
                return jsonString.Contains("\"success\": true");
            }
        }


        [HttpGet]
        public ActionResult<string> Get()
        {
            return Ok("API is responding");
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ContactForm form)
        {
            if (form == null || string.IsNullOrWhiteSpace(form.CaptchaResponse))
            {
                return BadRequest("captcha is required");
            }

            bool isCaptchaValid = await ValidateCaptcha(form.CaptchaResponse);
            if (!isCaptchaValid)
            {
                return BadRequest("invalid captcha");
            }

            var smtpSettings = _configuration.GetSection("SmtpSettings");
            var host = smtpSettings.GetValue<string>("Host");
            var port = smtpSettings.GetValue<int>("Port");
            var username = smtpSettings.GetValue<string>("Username");
            var password = smtpSettings.GetValue<string>("Password");
            var fromEmail = form.Email;
            var toEmail = smtpSettings.GetValue<string>("ToEmail");

            try
            {
                var client = new SmtpClient(host, port)
                {
                    Credentials = new NetworkCredential(username, password),
                    EnableSsl = true
                };
                client.Send(fromEmail, toEmail, form.Subject, form.Message);
                return Ok("e-mail send");
            }
            catch (Exception ex)
            {
                return StatusCode(500, "error sending: " + (ex.Message).ToLower());
            }
        }
    }
}