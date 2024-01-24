using WebRozetka.Data.Entities.Product;

namespace WebRozetka.Interfaces.Repo
{
    public interface IProductRepository : IRepository<ProductEntity>
    {
        Task<List<ProductEntity>> GetByCategoriesAsync(int category);
    }
}
