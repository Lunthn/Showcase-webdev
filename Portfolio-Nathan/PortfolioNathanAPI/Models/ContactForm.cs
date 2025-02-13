using System.ComponentModel.DataAnnotations;

namespace PortfolioNathanAPI.Models
{
    public class ContactForm
    {
        [Required]
        [StringLength(60)]
        public string Name { get; set; }

        [Required]
        [EmailAddress]
        public string Email { get; set; }

        [Required]
        [StringLength(200)]
        public string Subject { get; set; }

        [Required]
        [StringLength(600)]
        public string Message { get; set; }
    }
}
