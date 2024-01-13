using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebRozetka.Data;
using WebRozetka.Data.Entities;
using WebRozetka.Helpers;
using WebRozetka.Models.Product;

namespace WebRozetka.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly AppEFContext _context;
        private readonly IMapper _mapper;

        public ProductsController(AppEFContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            var items = await _context.Products
                .Include(x => x.Photos)
                .ToListAsync();

            var viewModels = _mapper.Map<List<ProductViewModel>>(items);


            return Ok(viewModels);
        }

        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetProducts(int categoryId)
        {
            var items = await _context.Products
                .Include(x => x.Photos)
                .Where(p => p.CategoryId == categoryId)
                .ToListAsync();

            var viewModels = _mapper.Map<List<ProductViewModel>>(items);

            return Ok(viewModels);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            var productEntity = await _context.Products
                .Include(x => x.Photos)
                .Where(p => !p.IsDeleted)
                .FirstOrDefaultAsync(p => p.Id == id);

            if (productEntity == null)
            {
                return BadRequest();
            }

            var viewModel = _mapper.Map<ProductViewModel>(productEntity);


            return Ok(viewModel);
        }

        [HttpPost]
        public async Task<IActionResult> CreateProduct([FromForm] ProductCreateViewModel newProduct)
        {
            if (newProduct == null)
            {
                return BadRequest("Новий продукт є пустим!");
            }

            try
            {
                var product = _mapper.Map<ProductEntity>(newProduct);
                await _context.Products.AddAsync(product);
                await _context.SaveChangesAsync();

                foreach (var image in newProduct.Images)
                {
                    var imagePath = await ImageWorker.SaveImageAsync(image);

                    await _context.Photos.AddAsync(new PhotoEntity { FilePath = imagePath, ProductId = product.Id });
                }

                await _context.SaveChangesAsync();

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Сталася помилка при створенні продукту: " + ex.Message);
            }
        }

        //// PUT: api/Products/5
        //// To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        //[HttpPut("{id}")]
        //public async Task<IActionResult> PutProductEntity(int id, ProductEntity productEntity)
        //{
        //    if (id != productEntity.Id)
        //    {
        //        return BadRequest();
        //    }

        //    _context.Entry(productEntity).State = EntityState.Modified;

        //    try
        //    {
        //        await _context.SaveChangesAsync();
        //    }
        //    catch (DbUpdateConcurrencyException)
        //    {
        //        if (!ProductEntityExists(id))
        //        {
        //            return NotFound();
        //        }
        //        else
        //        {
        //            throw;
        //        }
        //    }

        //    return NoContent();
        //}



        //// DELETE: api/Products/5
        //[HttpDelete("{id}")]
        //public async Task<IActionResult> DeleteProductEntity(int id)
        //{
        //    var productEntity = await _context.Products.FindAsync(id);
        //    if (productEntity == null)
        //    {
        //        return NotFound();
        //    }

        //    _context.Products.Remove(productEntity);
        //    await _context.SaveChangesAsync();

        //    return NoContent();
        //}

        //private bool ProductEntityExists(int id)
        //{
        //    return _context.Products.Any(e => e.Id == id);
        //}
    }
}
