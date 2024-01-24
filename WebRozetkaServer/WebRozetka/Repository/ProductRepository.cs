using Microsoft.EntityFrameworkCore;
using WebRozetka.Data;
using WebRozetka.Data.Entities.Category;
using WebRozetka.Data.Entities.Product;
using WebRozetka.Interfaces.Repo;

namespace WebRozetka.Repository
{
    public class ProductRepository : IProductRepository
    {
        private readonly AppEFContext _context;

        public ProductRepository(AppEFContext context)
        {
            _context = context;
        }

        Task<List<ProductEntity>> IRepository<ProductEntity>.GetAllAsync()
        {
            return _context.Set<ProductEntity>().Include(x => x.Photos).Where(x => !x.IsDeleted).ToListAsync();
        }

        Task<List<ProductEntity>> IProductRepository.GetByCategoriesAsync(int category)
        {
            return _context.Set<ProductEntity>()
                .Include(x => x.Photos)
                .Where(x => !x.IsDeleted && x.CategoryId == category)
                .ToListAsync();
        }

        Task<ProductEntity> IRepository<ProductEntity>.GetByIdAsync(int id)
        {
            return _context.Set<ProductEntity>()
                .Include(x => x.Photos)
                .Where(x => !x.IsDeleted && x.Id == id)
                .FirstOrDefaultAsync();
        }

        async Task<ProductEntity> IRepository<ProductEntity>.AddAsync(ProductEntity entity)
        {
            try
            {
                await _context.Products.AddAsync(entity);
                await _context.SaveChangesAsync();

                return entity;
            }
            catch (Exception)
            {
                return null;
            }
        }


        Task<bool> IRepository<ProductEntity>.DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        Task<int> IRepository<ProductEntity>.GetCountAsync(string search)
        {
            throw new NotImplementedException();
        }

        Task<List<ProductEntity>> IRepository<ProductEntity>.GetPagedAllAsync(int page, int pageSize, string search)
        {
            throw new NotImplementedException();
        }

        public Task<ProductEntity> UpdateAsync(ProductEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
