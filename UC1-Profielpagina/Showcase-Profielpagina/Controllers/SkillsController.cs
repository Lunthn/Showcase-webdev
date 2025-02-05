using Microsoft.AspNetCore.Mvc;

namespace Showcase_Profielpagina.Controllers
{
    public class SkillsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
