using FluentValidation;
using FluentValidation.AspNetCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using System;
using WebRozetka.Data;
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

            // ������ ������.
            builder.Services.AddDbContext<AppEFContext>(opt =>
                opt.UseNpgsql(builder.Configuration.GetConnectionString("WebRozetkaConnection")));

            builder.Services.AddControllers();
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();
            builder.Services.AddAutoMapper(typeof(AppMapProfile));
            builder.Services.AddCors();

            //builder.Services.AddScoped<IValidator<CategoryCreateViewModel>, CategoryCreateValidation>();

            builder.Services.AddFluentValidationAutoValidation();
            builder.Services.AddValidatorsFromAssemblyContaining<Program>();

            var app = builder.Build();

            // ������������ ��������.
            //if (app.Environment.IsDevelopment())
            //{
            //    app.UseSwagger();
            //    app.UseSwaggerUI();
            //}

            app.UseSwagger();
            app.UseSwaggerUI();

            // �������� �����.
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

            // ������������ CORS
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