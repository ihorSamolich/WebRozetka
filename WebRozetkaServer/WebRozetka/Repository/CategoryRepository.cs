using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebRozetka.Data;
using WebRozetka.Data.Entities.Category;
using WebRozetka.Interfaces.Repo;

namespace WebRozetka.Repository
{
    public class CategoryRepository : ICategoryRepository
    {
        private readonly AppEFContext _context;

        public CategoryRepository(AppEFContext context)
        {
            _context = context;
        }

        public Task<CategoryEntity> GetByIdAsync(int id)
        {
            return _context.Set<CategoryEntity>().Where(x => !x.IsDeleted && x.Id == id).FirstOrDefaultAsync();
        }

        public Task<List<CategoryEntity>> GetAllAsync()
        {
            return _context.Set<CategoryEntity>().Where(x => !x.IsDeleted).ToListAsync();
        }

        public async Task<CategoryEntity> AddAsync(CategoryEntity entity)
        {
            try
            {
                await _context.Set<CategoryEntity>().AddAsync(entity);
                await _context.SaveChangesAsync();

                return entity;
            }
            catch (Exception)
            {
                return entity;
            }
        }

        public async Task<CategoryEntity> UpdateAsync(CategoryEntity entity)
        {
            try
            {
                _context.Set<CategoryEntity>().Update(entity);
                await _context.SaveChangesAsync();
                return entity;
            }
            catch
            {
                return null;
            }
        }

        public async Task<bool> DeleteAsync(int id)
        {
            try
            {
                var entity = await GetByIdAsync(id);

                if (entity != null)
                {
                    entity.IsDeleted = true;
                    await _context.SaveChangesAsync();
                    return true;
                }
                else
                {
                    return false;
                }
            }
            catch
            {
                return false;
            }
        }

        public Task<List<CategoryEntity>> GetPagedAllAsync(int page, int pageSize, string search = "")
        {
            var entities = _context.Set<CategoryEntity>().Where(x => !x.IsDeleted);

            if (!search.IsNullOrEmpty())
            {
                entities = entities.Where(x => x.Name.ToLower().Contains(search.ToLower()));
            }

            return entities
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();
        }


        public async Task<int> GetCountAsync(string search = "")
        {
            var entities = _context.Set<CategoryEntity>().Where(x => !x.IsDeleted);

            if (!search.IsNullOrEmpty())
            {
                if (!search.IsNullOrEmpty())
                {
                    entities = entities.Where(x => x.Name.ToLower().Contains(search.ToLower()));
                }
            }

            var count = await entities.CountAsync();
            return count;
        }
    }
}
