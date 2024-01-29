using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebRozetka.Data;
using WebRozetka.Data.Entities.Identity;
using WebRozetka.Data.Entities.Order;
using WebRozetka.Models.Order;

namespace WebRozetka.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [Authorize]
    public class OrderController : ControllerBase
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly AppEFContext _context;
        private readonly IMapper _mapper;

        public OrderController(AppEFContext context, UserManager<UserEntity> userManager, IMapper mapper)
        {
            _userManager = userManager;
            _context = context;
            _mapper = mapper;
        }


        [HttpPost("add-to-basket")]
        public async Task<IActionResult> AddToBasket([FromBody] BasketAddViewModel model)
        {
            string userEmail = User.Claims.First().Value;
            var user = await _userManager.FindByEmailAsync(userEmail);

            if (user == null)
            {
                return BadRequest("User not found!");
            }

            var basketItem = _context.Baskets
                .Include(x => x.Product)
                    .ThenInclude(p => p.Photos)
                .FirstOrDefault(x => x.UserId == user.Id && x.ProductId == model.ProductId);

            if (basketItem == null)
            {
                var product = await _context.Products
                    .Include(p => p.Photos)
                    .FirstOrDefaultAsync(p => p.Id == model.ProductId);

                if (product == null)
                {
                    return BadRequest("Product not found!");
                }

                basketItem = new BasketEntity
                {
                    ProductId = model.ProductId,
                    UserId = user.Id,
                    Count = model.Count,
                    DateCreated = DateTime.UtcNow,
                    Product = product
                };

                _context.Baskets.Add(basketItem);
            }
            else
            {
                basketItem.Count += model.Count;
            }

            await _context.SaveChangesAsync();

            var result = _mapper.Map<BasketItemViewModel>(basketItem);

            return Ok(result);
        }


        [HttpGet("basket")]
        public async Task<IActionResult> ListBasket()
        {
            string userEmail = User.Claims.First().Value;
            var user = await _userManager.FindByEmailAsync(userEmail);

            if (user == null)
            {
                return BadRequest("User not found!");
            }

            var listBasketItem = _context.Baskets
                .Include(x => x.Product)
                    .ThenInclude(p => p.Photos)
                .Where(x => x.UserId == user.Id)
                .Select(x => _mapper.Map<BasketItemViewModel>(x));

            return Ok(listBasketItem);
        }

        [HttpDelete("clear-basket")]
        public async Task<IActionResult> ClearBasket()
        {
            string userEmail = User.Claims.First().Value;
            var user = await _userManager.FindByEmailAsync(userEmail);

            if (user == null)
            {
                return BadRequest("User not found!");
            }

            var listBasketItem = _context.Baskets
                .Where(x => x.UserId == user.Id);

            _context.Baskets.RemoveRange(listBasketItem);

            await _context.SaveChangesAsync();

            return Ok();
        }

        [HttpDelete("remove-from-basket/{productId}")]
        public async Task<IActionResult> RemoveFromBasket(int productId)
        {
            string userEmail = User.Claims.First().Value;
            var user = await _userManager.FindByEmailAsync(userEmail);

            if (user == null)
            {
                return BadRequest("User not found!");
            }

            var basketItem = _context.Baskets
                .Where(x => x.UserId == user.Id && x.ProductId == productId)
                .FirstOrDefault();

            if (basketItem != null)
            {
                _context.Baskets.Remove(basketItem);
                await _context.SaveChangesAsync();

                return Ok(basketItem.ProductId);
            }
            else
            {
                return NotFound("Product with id not found!");
            }
        }

        //[HttpGet]
        //public IActionResult GetAllOrders()
        //{
        //try
        //{
        //    var orders = _context.Orders
        //        .Include(o => o.OrderItems)
        //        .ThenInclude(oi => oi.Product)  // Використовуйте ThenInclude для вкладених включень
        //        .ToList();

        //    var orderViewModels = orders.Select(order => new OrderViewModel
        //    {
        //        OrderId = order.Id,
        //        CustomerName = order.CustomerName,
        //        CustomerEmail = order.CustomerEmail,
        //        CustomerPhone = order.CustomerPhone,
        //        OrderItems = order.OrderItems.Select(item => new OrderItemDetailViewModel
        //        {
        //            ProductName = item.Product.Name,
        //            Quantity = item.Quantity,
        //        }).ToList()
        //    }).ToList();

        //    return Ok(orderViewModels);
        //}
        //catch (Exception ex)
        //{
        //    // Обробляйте помилки або повертайте відповідь з помилкою
        //    return StatusCode(500, "Помилка сервера");
        //}

        //    return Ok();
        //}


        //[HttpPost]
        //public async Task<IActionResult> CreateOrder()
        //{
        //    return Ok();
        //}



        //    [HttpPost]
        //    public async Task<IActionResult> CreateOrder([FromBody] CreateOrderViewModel model)
        //    {
        //        if (model == null)
        //        {
        //            return BadRequest("Новий продукт є пустим!");
        //        }

        //        var user = await _userManager.FindByEmailAsync(model.UserEmail);


        //        ////
        //        //  Department
        //        ////
        //        var orderDepartment = _context.Departments
        //            .FirstOrDefault(d =>
        //                d.Number == model.DepartmentData.DepartmentNumberId
        //                && d.CityId == model.DepartmentData.CityId
        //                && d.DeliveryServiсesId == model.DepartmentData.DeliveryServiceId
        //            );

        //        if (orderDepartment == null)
        //        {
        //            orderDepartment = new DepartmentEntity
        //            {
        //                Number = model.DepartmentData.DepartmentNumberId,
        //                CityId = model.DepartmentData.CityId,
        //                DeliveryServiсesId = model.DepartmentData.DeliveryServiceId
        //            };

        //            _context.Departments.Add(orderDepartment);
        //            _context.SaveChanges();
        //        }
        //        ////
        //        //  Department
        //        ////



        //        ////
        //        //  OrderInfo
        //        ////
        //        var orderInfo = _context.OrderInfo
        //            .FirstOrDefault(oa => oa.UserId == user.Id && oa.DepartmentId == orderDepartment.Id);

        //        if (orderInfo == null)
        //        {
        //            orderInfo = new OrderInfoEntity
        //            {
        //                UserId = user.Id,
        //                DepartmentId = orderDepartment.Id,
        //            };

        //            _context.OrderInfo.Add(orderInfo);
        //            _context.SaveChanges();
        //        }
        //        ////
        //        //  OrderInfo
        //        ////


        //        ////
        //        //  Order
        //        ////
        //        var order = new OrderEntity
        //        {
        //            CustomerEmail = model.CustomerPersonalData.Email,
        //            CustomerPhone = model.CustomerPersonalData.Phone,
        //            CustomerName = model.CustomerPersonalData.FirstName + " " + model.CustomerPersonalData.LastName,
        //            OrderInfoId = orderInfo.Id,
        //            OrderStatusId = 1,
        //        };

        //        _context.Orders.Add(order);
        //        _context.SaveChanges();
        //        ////
        //        //  Order
        //        ////



        //        ////
        //        //  OrderItem
        //        ////
        //        if (model.OrderProducts != null)
        //        {
        //            foreach (var product in model.OrderProducts)
        //            {
        //                var selectedProduct = _context.Products
        //                    .Where(p => p.Id == product.ProductId)
        //                    .FirstOrDefault();

        //                if (selectedProduct != null)
        //                {
        //                    var orderItem = new OrderItemsEntity
        //                    {
        //                        OrderId = order.Id,
        //                        ProductId = product.ProductId,
        //                        Quantity = product.Quantity,
        //                        TotalPrice = product.Quantity * selectedProduct.Price
        //                    };

        //                    // Віднімаємо кількість проданих товарів зі складу
        //                    selectedProduct.Quantity -= product.Quantity;

        //                    _context.OrdersItems.Add(orderItem);
        //                }
        //            }

        //            _context.SaveChanges();
        //        }

        //        ////
        //        //  OrderItem
        //        ////


        //        SmtpEmailService emailService = new SmtpEmailService();

        //        emailService.Send(new Message
        //        {
        //            To = model.CustomerPersonalData.Email,
        //            Body = "Ваше замовлення прийнято! Номер замовлення " + order.Id,
        //            Name = model.CustomerPersonalData.FirstName
        //        });

        //        return Ok();
        //    }

        //}


        //}



    }
}
