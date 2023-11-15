using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.FileProviders;
using WebRozetka.Data;
using WebRozetka.Mapper;

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

            var app = builder.Build();

            // Конфігурація Сваггера.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

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
            app.Run();
        }
    }
}