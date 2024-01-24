using AutoMapper;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using WebRozetka.Data;
using WebRozetka.Data.Entities.Identity;
using WebRozetka.Data.Entities.Order;
using WebRozetka.Models.Order;
using WebRozetka.Models.Product;
using WebRozetka.SMTP;

namespace WebRozetka.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly UserManager<UserEntity> _userManager;
        private readonly AppEFContext _context;
        private readonly IMapper _mapper;

        public OrderController(AppEFContext context, IMapper mapper, UserManager<UserEntity> userManager)
        {
            _userManager = userManager;
            _context = context;
            _mapper = mapper;
        }

        [HttpPost]
        public async Task<IActionResult> CreateOrder([FromBody] CreateOrderViewModel model)
        {
            if (model == null)
            {
                return BadRequest("Новий продукт є пустим!");
            }

            var user = await _userManager.FindByEmailAsync(model.UserEmail);


            ////
            //  Department
            ////
            var orderDepartment = _context.Departments
                .FirstOrDefault(d =>
                    d.Number == model.DepartmentData.DepartmentNumberId
                    && d.CityId == model.DepartmentData.CityId
                    && d.DeliveryServiсesId == model.DepartmentData.DeliveryServiceId
                );

            if (orderDepartment == null)
            {
                orderDepartment = new DepartmentEntity
                {
                    Number = model.DepartmentData.DepartmentNumberId,
                    CityId = model.DepartmentData.CityId,
                    DeliveryServiсesId = model.DepartmentData.DeliveryServiceId
                };

                _context.Departments.Add(orderDepartment);
                _context.SaveChanges();
            }
            ////
            //  Department
            ////



            ////
            //  OrderInfo
            ////
            var orderInfo = _context.OrderInfo
                .FirstOrDefault(oa => oa.UserId == user.Id && oa.DepartmentId == orderDepartment.Id);

            if (orderInfo == null)
            {
                orderInfo = new OrderInfoEntity
                {
                    UserId = user.Id,
                    DepartmentId = orderDepartment.Id,
                };

                _context.OrderInfo.Add(orderInfo);
                _context.SaveChanges();
            }
            ////
            //  OrderInfo
            ////


            ////
            //  Order
            ////
            var order = new OrderEntity
            {
                CustomerEmail = model.CustomerPersonalData.Email,
                CustomerPhone = model.CustomerPersonalData.Phone,
                CustomerName = model.CustomerPersonalData.FirstName + " " + model.CustomerPersonalData.LastName,
                OrderInfoId = orderInfo.Id,
                OrderStatusId = 1,
            };

            _context.Orders.Add(order);
            _context.SaveChanges();
            ////
            //  Order
            ////



            ////
            //  OrderItem
            ////
            if (model.OrderProducts != null)
            {
                foreach (var product in model.OrderProducts)
                {
                    var selectedProduct = _context.Products
                        .Where(p => p.Id == product.ProductId)
                        .FirstOrDefault();

                    if (selectedProduct != null)
                    {
                        var orderItem = new OrderItemsEntity
                        {
                            OrderId = order.Id,
                            ProductId = product.ProductId,
                            Quantity = product.Quantity,
                            TotalPrice = product.Quantity * selectedProduct.Price
                        };

                        // Віднімаємо кількість проданих товарів зі складу
                        selectedProduct.Quantity -= product.Quantity;

                        _context.OrdersItems.Add(orderItem);
                    }
                }

                _context.SaveChanges();
            }

            ////
            //  OrderItem
            ////


            SmtpEmailService emailService = new SmtpEmailService();

            emailService.Send(new Message
            {
                To = model.CustomerPersonalData.Email,
                Body = "Ваше замовлення прийнято! Номер замовлення " + order.Id,
                Name = model.CustomerPersonalData.FirstName
            });

            return Ok();
        }

    }
}
