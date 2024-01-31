using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebRozetka.Data.Entities.Identity;
using WebRozetka.Data;
using WebRozetka.Services;
using WebRozetka.Models.Addres;
using Microsoft.EntityFrameworkCore;

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

        [HttpGet("areas")]
        public async Task<IActionResult> GetAreas()
        {
            var areas = _mapper.Map<List<AreaNPViewModel>>(await _context.Areas.ToListAsync());

            return Ok(areas);
        }

        [HttpGet("settlements")]
        public async Task<IActionResult> GetSettlements([FromQuery] string areaRef, string search = "")
        {
            var entities = _context.Settlements
               .Where(x => x.AreaId == areaRef && (string.IsNullOrEmpty(search) || x.Description.ToLower().StartsWith(search.ToLower())))
               .OrderBy(x => x.Description)
               .Take(20)
               .ToList();


            var settlements = _mapper.Map<List<SettlementNPViewModel>>(entities);

            return Ok(settlements);
        }


        [HttpGet("warehouses")]
        public async Task<IActionResult> GetWarehouses([FromQuery] string settlementRef, string search = "")
        {

            var entities = _context.Warehouses
                .Where(x => x.SettlementId == settlementRef && (string.IsNullOrEmpty(search) || x.Description.ToLower().Contains(search.ToLower())))
                .OrderBy(x => x.Number)
                .Take(20)
                .ToList();

            var warehouses = _mapper.Map<List<WarehouseNPViewModel>>(entities);

            return Ok(warehouses);
        }

        [HttpPost("refresh")]
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
