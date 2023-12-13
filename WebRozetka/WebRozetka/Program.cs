using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using System;
using WebRozetka.Data;
using WebRozetka.Data.Entities.Identity;
using WebRozetka.FluentValidation.Categories;
using WebRozetka.Mapper;
using WebRozetka.Models.Category;

namespace WebRozetka
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Додаємо сервіси.
            builder.Services.AddDbContext<AppEFContext>(opt =>
                opt.UseNpgsql(builder.Configuration.GetConnectionString("WebRozetkaConnection")));

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddAutoMapper(typeof(AppMapProfile));
            builder.Services.AddCors();

            builder.Services.AddFluentValidationAutoValidation();
            builder.Services.AddValidatorsFromAssemblyContaining<Program>();

            builder.Services.AddIdentity<UserEntity, RoleEntity>(options =>
            {
                options.Stores.MaxLengthForKeys = 128;
                options.Password.RequireDigit = false;
                options.Password.RequiredLength = 5;
                options.Password.RequireNonAlphanumeric = false;
                options.Password.RequireUppercase = false;
                options.Password.RequireLowercase = false;
                options.SignIn.RequireConfirmedEmail = true;
            })
              .AddEntityFrameworkStores<AppEFContext>()
              .AddDefaultTokenProviders();

            var app = builder.Build();

            // Конфігурація Сваггера.
            //if (app.Environment.IsDevelopment())
            //{
            //    app.UseSwagger();
            //    app.UseSwaggerUI();
            //}

            app.UseSwagger();
            app.UseSwaggerUI();

            // Статичні файли.
            var dir = Path.Combine(Directory.GetCurrentDirectory(), "images");

            if (!Directory.Exists(dir))
            {
                Directory.CreateDirectory(dir);
            }
            app.UseStaticFiles(new StaticFileOptions
            {
                FileProvider = new PhysicalFileProvider(dir),
                RequestPath = "/images"
            });

            // Налаштування CORS
            app.UseCors(options => options
                .WithOrigins(new[] { "http://localhost:5173" })
                .AllowAnyHeader()
                .AllowAnyMethod()
                .AllowCredentials()
            );

            // 
            app.UseAuthorization();
            app.MapControllers();


            app.SeedData();


            app.Run();
        }
    }
}