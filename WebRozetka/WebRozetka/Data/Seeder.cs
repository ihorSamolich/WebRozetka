using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Data;
using WebRozetka.Constants;
using WebRozetka.Data.Entities.Identity;

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
            }
        }
    }
}
