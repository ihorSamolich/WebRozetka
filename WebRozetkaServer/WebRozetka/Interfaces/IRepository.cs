namespace WebRozetka.Interfaces
{
    public interface IRepository<T>
    {
        Task<T> GetByIdAsync(int id);
        Task<List<T>> GetAllAsync();
        Task<int> GetCountAsync(string search = "");
        Task<List<T>> GetPagedAllAsync(int page, int pageSize, string search = "");
        Task<bool> AddAsync(T entity);
        Task<bool> UpdateAsync(T entity);
        Task<bool> DeleteAsync(int id);
    }

}
