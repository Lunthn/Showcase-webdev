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

        [HttpGet]
        public ActionResult<string> Get()
        {
            return Ok("API is responding");
        }

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ContactForm form)
        {
            if (form == null)
            {
                return BadRequest();
            }

            var smtpSettings = _configuration.GetSection("SmtpSettings");
            var host = smtpSettings.GetValue<string>("Host");
            var port = smtpSettings.GetValue<int>("Port");
            var username = smtpSettings.GetValue<string>("Username");
            var password = smtpSettings.GetValue<string>("Password");
            var fromEmail = form.Email; 
            var toEmail = smtpSettings.GetValue<string>("ToEmail");
            string subject = form.Subject;
            string body = form.Message;
            string name = form.Name;

            try
            {
                var client = new SmtpClient(host, port)
                {
                    Credentials = new NetworkCredential(username, password),
                    EnableSsl = true
                };
                client.Send(fromEmail, toEmail, subject, body);
                return Ok("email sent successfully");
            }
            catch (Exception ex)
            {
               
                return StatusCode(500, (ex.Message).ToLower());
            }
        }
    }
}
