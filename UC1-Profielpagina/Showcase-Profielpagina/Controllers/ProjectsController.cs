using Microsoft.AspNetCore.Mvc;

namespace Showcase_Profielpagina.Controllers
{
    public class ProjectsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
    }
}
