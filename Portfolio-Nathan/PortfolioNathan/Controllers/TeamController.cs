using Microsoft.AspNetCore.Mvc;

namespace PortfolioNathan.Controllers
{
    public class TeamController : Controller
    {
        public IActionResult Topteam()
        {
            return View();
        }
    }
}
