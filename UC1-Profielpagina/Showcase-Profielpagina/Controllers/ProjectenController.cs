using Microsoft.AspNetCore.Mvc;

namespace Showcase_Profielpagina.Controllers
{
    public class ProjectenController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
