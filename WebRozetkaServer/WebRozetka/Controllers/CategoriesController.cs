using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebRozetka.Data.Entities.Category;
using WebRozetka.Helpers;
using WebRozetka.Interfaces.Repo;
using WebRozetka.Models.Category;

namespace WebRozetka.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class CategoriesController : ControllerBase
    {
        private readonly IMapper _mapper;
        private readonly ICategoryRepository _categoryRepository;

        public CategoriesController(IMapper mapper, ICategoryRepository categoryRepository)
        {
            _mapper = mapper;
            _categoryRepository = categoryRepository;
        }

        [HttpGet]
        public async Task<IActionResult> GetCategoriesSearchPagedList([FromQuery] int page = 1, int pageSize = 4, string search = "")
        {
            var count = await _categoryRepository.GetCountAsync(search);
            var items = await _categoryRepository.GetPagedAllAsync(page, pageSize, search);

            return Ok(new { count, items });
        }

        [HttpGet("names")]
        public async Task<IActionResult> GetCategoriesNames()
        {
            var items = await _categoryRepository.GetAllAsync();

            var result = items.Select(item => new { item.Name, item.Id });

            return Ok(result);
        }


        [HttpGet("{id}")]
        public async Task<IActionResult> GetCategoryById(int id)
        {
            var item = await _categoryRepository.GetByIdAsync(id);

            if (item == null)
            {
                return NotFound("Категорію не знайдено!");
            }

            return Ok(item);
        }

        [HttpPost]
        public async Task<IActionResult> Create([FromForm] CategoryCreateViewModel model)
        {
            var item = _mapper.Map<CategoryEntity>(model);
            var newEntity = await _categoryRepository.AddAsync(item);

            if (newEntity == null)
            {
                return BadRequest("Помилка створення категорії!");
            }

            return Ok(item);
        }

        [HttpPut]
        public async Task<IActionResult> Edit([FromForm] CategoryEditViewModel model)
        {
            var item = await _categoryRepository.GetByIdAsync(model.Id);

            if (item == null)
            {
                return NotFound("Категорію не знайдено!");
            }

            if (model.Image != null)
            {
                ImageWorker.RemoveImage(item.Image);
                item.Image = await ImageWorker.SaveImageAsync(model.Image);
            }

            item.Name = model.Name;
            item.Description = model.Description;

            var updatedItem = await _categoryRepository.UpdateAsync(item);

            if (updatedItem != null)
            {
                return Ok(item);
            }
            else
            {
                return StatusCode(500);
            }

        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            var result = await _categoryRepository.DeleteAsync(id);

            if (!result)
            {
                return BadRequest("Помилка видалення категорії!");
            }

            return Ok("Категорія успішно видалена!");
        }
    }
}
