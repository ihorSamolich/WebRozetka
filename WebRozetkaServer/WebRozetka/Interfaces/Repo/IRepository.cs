namespace WebRozetka.Interfaces.Repo
{
    public interface IRepository<T>
    {
        Task<T> GetByIdAsync(int id);
        Task<List<T>> GetAllAsync();
        Task<int> GetCountAsync(string search = "");
        Task<List<T>> GetPagedAllAsync(int page, int pageSize, string search = "");
        Task<T> AddAsync(T entity);
        Task<T> UpdateAsync(T entity);
        Task<bool> DeleteAsync(int id);
    }

}
