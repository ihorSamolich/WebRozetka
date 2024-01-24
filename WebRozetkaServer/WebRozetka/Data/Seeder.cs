using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Data;
using WebRozetka.Constants;
using WebRozetka.Data.Entities.Identity;
using WebRozetka.Data.Entities.Order;

namespace WebRozetka.Data
{
    public static class SeederDB
    {
        public static void SeedData(this IApplicationBuilder app)
        {
            using (var scope = app.ApplicationServices.GetRequiredService<IServiceScopeFactory>().CreateScope())
            {
                var service = scope.ServiceProvider;
                //Отримую посилання на наш контекст
                var context = service.GetRequiredService<AppEFContext>();

                var userManager = service.GetRequiredService<UserManager<UserEntity>>();
                var roleManager = service.GetRequiredService<RoleManager<RoleEntity>>();

                context.Database.Migrate();

                if (!context.Roles.Any())
                {
                    var admin = new RoleEntity
                    {
                        Name = Roles.Admin,
                    };
                    var roleResult = roleManager.CreateAsync(admin).Result;

                    var user = new RoleEntity
                    {
                        Name = Roles.User,
                    };

                    roleResult = roleManager.CreateAsync(user).Result;
                }

                if (!context.Users.Any())
                {
                    UserEntity user = new UserEntity
                    {
                        FirstName = "Admin",
                        LastName = "Admin",
                        Email = "admin@gmail.com",
                        UserName = "admin@gmail.com",
                        Image = "admin.webp",
                        EmailConfirmed = true,
                    };
                    var result = userManager.CreateAsync(user, "123456").Result;
                    if (!result.Succeeded)
                    {
                        Console.WriteLine("-Error User Create");
                    }
                    else
                    {
                        result = userManager.AddToRoleAsync(user, Roles.Admin).Result;
                        if (!result.Succeeded)
                        {
                            Console.WriteLine("-Error User AddToRole");
                        }
                    }
                }

                if (!context.Cities.Any())
                {
                    context.Cities.AddRange(
                        new CitiesEntity { Name = "Київ" },
                        new CitiesEntity { Name = "Харків" },
                        new CitiesEntity { Name = "Одеса" },
                        new CitiesEntity { Name = "Дніпро" },
                        new CitiesEntity { Name = "Львів" },
                        new CitiesEntity { Name = "Запоріжжя" },
                        new CitiesEntity { Name = "Івано-Франківськ" },
                        new CitiesEntity { Name = "Херсон" },
                        new CitiesEntity { Name = "Чернівці" },
                        new CitiesEntity { Name = "Луцьк" }
                    );

                    context.SaveChanges();
                }

                if (!context.DeliveryServiсes.Any())
                {
                    context.DeliveryServiсes.AddRange(
                        new DeliveryServiсesEntity { Name = "Нова Пошта" },
                        new DeliveryServiсesEntity { Name = "Укрпошта" },
                        new DeliveryServiсesEntity { Name = "MeestExpress" }
                    );

                    context.SaveChanges();
                }

                if (!context.Departments.Any())
                {
                    var cities = context.Cities.ToList();
                    var deliveryServices = context.DeliveryServiсes.ToList();

                    for (int i = 1; i <= 10; i++)
                    {
                        context.Departments.Add(new DepartmentEntity
                        {
                            Number = i,
                            CityId = cities[i % cities.Count].Id,
                            DeliveryServiсesId = deliveryServices[i % deliveryServices.Count].Id
                        });
                    }

                    context.SaveChanges();
                }

                if (!context.OrderStatuses.Any())
                {
                    var orderStatus = new List<OrderStatusEntity>
                    {
                        new OrderStatusEntity { Name = "В очікуванні" },
                        new OrderStatusEntity { Name = "Обробляється" },
                        new OrderStatusEntity { Name = "Відправлено" },
                        new OrderStatusEntity { Name = "Доставлено" },
                        new OrderStatusEntity { Name = "Завершено" },
                    };

                    context.OrderStatuses.AddRange(orderStatus);
                    context.SaveChanges();
                }

            }
        }
    }
}
