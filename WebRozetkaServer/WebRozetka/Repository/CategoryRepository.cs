using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using WebRozetka.Data;
using WebRozetka.Data.Entities;
using WebRozetka.Interfaces;

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

        public async Task<bool> AddAsync(CategoryEntity entity)
        {
            try
            {
                await _context.Set<CategoryEntity>().AddAsync(entity);
                await _context.SaveChangesAsync();

                return true;
            }
            catch (Exception)
            {
                return false;
            }
        }

        public async Task<bool> UpdateAsync(CategoryEntity entity)
        {
            _context.Set<CategoryEntity>().Update(entity);
            await _context.SaveChangesAsync();

            return true;
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
