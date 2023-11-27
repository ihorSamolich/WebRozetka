using AutoMapper;
using FluentValidation;
using FluentValidation.Results;
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
        private readonly IValidator<CategoryCreateViewModel> _validator;

        public CategoriesController(AppEFContext appEFContext, IMapper mapper, IValidator<CategoryCreateViewModel> validator)
        {
            _appEFContext = appEFContext;
            _mapper = mapper;
            _validator = validator;
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

        [HttpGet("{id}")]
        public IActionResult GetCategoryById(int id)
        {
            var category = _appEFContext.Categories.Find(id);

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CategoryCreateViewModel model)
        {
            try
            {
                ValidationResult result = await _validator.ValidateAsync(model);

                if (!result.IsValid)
                {
                    var errors = string.Join("\n", result.Errors.Select(e => e.ErrorMessage));
                    return BadRequest(errors);
                }

                var category = _mapper.Map<CategoryEntity>(model);
                category.IsDeleted = false;
                category.DateCreated = DateTime.UtcNow;
                category.Image = await ImageWorker.SaveImageAsync(model.Image);

                await _appEFContext.Categories.AddAsync(category);
                await _appEFContext.SaveChangesAsync();

                return Created($"/api/categories/{category.Id}", category);
            }
            catch (Exception)
            {
                return StatusCode(500, "Невідома помилка сервера!");
            }
        }

    }
}
