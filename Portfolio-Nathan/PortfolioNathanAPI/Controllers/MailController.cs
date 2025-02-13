using Microsoft.AspNetCore.Mvc;
using PortfolioNathanAPI.Models;
using System.Net;
using System.Net.Mail;
using System.Threading.Tasks;
using Microsoft.Extensions.Configuration;
using System.Text;

namespace PortfolioNathanAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class MailController : ControllerBase
    {

        [HttpPost]
        public async Task<ActionResult> Post([FromBody] ContactForm form)
        {
            return Ok();
        }

    }
}
