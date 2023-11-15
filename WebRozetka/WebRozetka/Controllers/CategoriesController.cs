using AutoMapper;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System;
using WebRozetka.Data;
using WebRozetka.Data.Entities;
using WebRozetka.Helpers;
using WebRozetka.Models.Category;

namespace WebRozetka.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly AppEFContext _appEFContext;
        private readonly IMapper _mapper;

        public CategoriesController(AppEFContext appEFContext, IMapper mapper)
        {
            _appEFContext = appEFContext;
            _mapper = mapper;
        }

        [HttpGet]
        public async Task<IActionResult> List()
        {
            var list = await _appEFContext.Categories
                .Where(c => !c.IsDeleted)
                .Select(x => _mapper.Map<CategoryItemViewModel>(x))
                .ToListAsync();

            return Ok(list);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CategoryCreateViewModel model)
        {
            if (model == null)
            {
                return BadRequest("Invalid data provided");
            }

            var category = _mapper.Map<CategoryEntity>(model);
            category.IsDeleted = false;
            category.DateCreated = DateTime.UtcNow;

            if (model.Image != null)
            {
                category.Image = await ImageWorker.SaveImageAsync(model.Image);
            }

            await _appEFContext.Categories.AddAsync(category);
            await _appEFContext.SaveChangesAsync();

            return Ok(category);
        }

    }
}
