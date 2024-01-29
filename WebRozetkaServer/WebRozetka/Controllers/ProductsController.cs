using System;
using System.Collections.Generic;
using System.Linq;
using System.Runtime.Intrinsics.X86;
using System.Threading.Tasks;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebRozetka.Data;
using WebRozetka.Data.Entities.Photo;
using WebRozetka.Data.Entities.Product;
using WebRozetka.Helpers;
using WebRozetka.Interfaces.Repo;
using WebRozetka.Models.Product;

namespace WebRozetka.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class ProductsController : ControllerBase
    {
        private readonly IProductRepository _productRepository;
        private readonly IPhotoRepository _photoRepository;

        private readonly AppEFContext _context;
        private readonly IMapper _mapper;

        public ProductsController(AppEFContext context, IMapper mapper, IProductRepository productRepository, IPhotoRepository photoRepository)
        {
            _context = context;
            _mapper = mapper;
            _productRepository = productRepository;
            _photoRepository = photoRepository;
        }

        // GET: api/Products
        [HttpGet]
        public async Task<IActionResult> GetProducts()
        {
            try
            {
                var productViewModels = _mapper.Map<List<ProductViewModel>>(await _productRepository.GetAllAsync());

                if (productViewModels == null)
                {
                    return NotFound("No products found.");
                }

                return Ok(productViewModels);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }


        [HttpGet("category/{categoryId}")]
        public async Task<IActionResult> GetProducts(int categoryId)
        {
            try
            {
                var productViewModels = _mapper.Map<List<ProductViewModel>>(await _productRepository.GetByCategoriesAsync(categoryId));

                if (productViewModels == null)
                {
                    return NotFound("No products found.");
                }

                return Ok(productViewModels);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetProductById(int id)
        {
            try
            {
                var productViewModel = _mapper.Map<ProductViewModel>(await _productRepository.GetByIdAsync(id));

                if (productViewModel == null)
                {
                    return NotFound("No product found.");
                }

                return Ok(productViewModel);
            }
            catch (Exception)
            {
                return StatusCode(500);
            }
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
                var product = await _productRepository.AddAsync(_mapper.Map<ProductEntity>(newProduct));

                foreach (var image in newProduct.Images)
                {
                    var imagePath = await ImageWorker.SaveImageAsync(image);

                    await _photoRepository.AddAsync(new PhotoEntity { FilePath = imagePath, ProductId = product.Id });
                }

                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, "Сталася помилка при створенні продукту: " + ex.Message);
            }
        }
    }
}
