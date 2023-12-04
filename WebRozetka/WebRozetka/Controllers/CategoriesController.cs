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

        [HttpGet("{id}")]
        public IActionResult GetCategoryById(int id)
        {
            var category = _appEFContext.Categories
                .Where(c => !c.IsDeleted)
                .SingleOrDefault(c => c.Id == id);

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

        [HttpPut]
        public async Task<IActionResult> Edit([FromForm] CategoryEditViewModel model)
        {
            try
            {
                var category = _appEFContext.Categories
                    .Where(c => !c.IsDeleted)
                    .SingleOrDefault(x => x.Id == model.Id);
                if (category == null)
                {
                    return NotFound();
                }

                if (model.Image != null)
                {
                    string fileRemove = Path.Combine(Directory.GetCurrentDirectory(), "images", category.Image);
                    if (System.IO.File.Exists(fileRemove))
                    {
                        System.IO.File.Delete(fileRemove);
                    }
                    category.Image = await ImageWorker.SaveImageAsync(model.Image);
                }

                category.Name = model.Name;

                category.Description = model.Description;


                await _appEFContext.SaveChangesAsync();
                return Created($"/api/categories/{category.Id}", category);
            }
            catch (Exception)
            {
                return Ok();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var category = _appEFContext.Categories
                .Where(c => !c.IsDeleted)
                .SingleOrDefault(x => x.Id == id);
            if (category == null)
            {
                return NotFound();
            }
            category.IsDeleted = true;
            await _appEFContext.SaveChangesAsync();
            return Ok();
        }
    }
}
