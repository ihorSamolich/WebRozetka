using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebRozetka.Data.Entities.Identity;
using WebRozetka.Data;
using WebRozetka.Services;

namespace WebRozetka.Controllers
{
    [Route("api/[controller]")]
    [ApiController]

    public class AddressController : ControllerBase
    {
        private readonly AppEFContext _context;
        private readonly IMapper _mapper;

        public AddressController(AppEFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        [HttpGet("refresh")]
        public async Task<IActionResult> RefreshAddress()
        {
            NovaPoshtaService novaPoshtaService = new NovaPoshtaService(_mapper, _context);

            //await novaPoshtaService.GetNPAreas();
            //await novaPoshtaService.GetNPSettlements();
            //await novaPoshtaService.GetNPWarehouses();

            return Ok();
        }
    }
}
