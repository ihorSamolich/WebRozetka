using Microsoft.EntityFrameworkCore;
using WebRozetka.Data;
using WebRozetka.Data.Entities.Photo;
using WebRozetka.Interfaces.Repo;

namespace WebRozetka.Repository
{
    public class PhotoRepository : IPhotoRepository
    {
        private readonly AppEFContext _context;

        public PhotoRepository(AppEFContext context)
        {
            _context = context;
        }
        async public Task<PhotoEntity> AddAsync(PhotoEntity entity)
        {
            try
            {
                await _context.Set<PhotoEntity>().AddAsync(entity);
                await _context.SaveChangesAsync();

                return entity;
            }
            catch (Exception)
            {
                return null;
            }
        }

        public Task<bool> DeleteAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<List<PhotoEntity>> GetAllAsync()
        {
            throw new NotImplementedException();
        }

        public Task<PhotoEntity> GetByIdAsync(int id)
        {
            throw new NotImplementedException();
        }

        public Task<int> GetCountAsync(string search = "")
        {
            throw new NotImplementedException();
        }

        public Task<List<PhotoEntity>> GetPagedAllAsync(int page, int pageSize, string search = "")
        {
            throw new NotImplementedException();
        }

        public Task<PhotoEntity> UpdateAsync(PhotoEntity entity)
        {
            throw new NotImplementedException();
        }
    }
}
