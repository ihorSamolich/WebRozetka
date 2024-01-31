using AutoMapper;
using WebRozetka.Data.Entities.Addres;
using WebRozetka.Data.Entities.Category;
using WebRozetka.Data.Entities.Identity;
using WebRozetka.Data.Entities.Order;
using WebRozetka.Data.Entities.Photo;
using WebRozetka.Data.Entities.Product;
using WebRozetka.Helpers;
using WebRozetka.Mapper.Converters;
using WebRozetka.Models.Account;
using WebRozetka.Models.Addres;
using WebRozetka.Models.Category;
using WebRozetka.Models.Order;
using WebRozetka.Models.Product;

namespace WebRozetka.Mapper
{
    public class AppMapProfile : Profile
    {
        public AppMapProfile()
        {
            CreateMap<CategoryCreateViewModel, CategoryEntity>()
                .AfterMap((src, dest) =>
                {
                    dest.IsDeleted = false;
                    dest.DateCreated = DateTime.UtcNow;
                    dest.Image = ImageWorker.SaveImageAsync(src.Image).Result;
                });

            CreateMap<CategoryEntity, CategoryItemViewModel>();

            CreateMap<ICollection<PhotoEntity>, List<string>>()
                .ConvertUsing<PhotoEntityToFilePathConverter>();

            CreateMap<ProductEntity, ProductViewModel>()
               .ForMember(dest => dest.Photos, opt => opt.MapFrom(src => src.Photos));

            CreateMap<ProductCreateViewModel, ProductEntity>()
                .ForMember(dest => dest.Photos, opt => opt.Ignore())
                .AfterMap((src, dest) =>
                {
                    dest.IsDeleted = false;
                    dest.DateCreated = DateTime.UtcNow;
                });

            CreateMap<SettlementNPViewModel, SettlementEntity>()
                .ForMember(dest => dest.AreaId, opt => opt.MapFrom(src => src.Area))
                .ForMember(dest => dest.Area, opt => opt.Ignore());

            CreateMap<SettlementEntity, SettlementNPViewModel>();


            CreateMap<WarehouseNPViewModel, WarehouseEntity>()
                .ForMember(dest => dest.SettlementId, opt => opt.MapFrom(src => src.SettlementRef))
                .ForMember(dest => dest.Settlement, opt => opt.Ignore());

            CreateMap<WarehouseEntity, WarehouseNPViewModel>();



            CreateMap<AreaNPViewModel, AreasEntity>();
            CreateMap<AreasEntity, AreaNPViewModel>();

            CreateMap<BasketEntity, BasketItemViewModel>()
               .ForMember(x => x.ProductName, opt => opt.MapFrom(x => x.Product.Name))
               .ForMember(x => x.Price, opt => opt.MapFrom(x => x.Product.Price))
               .ForMember(x => x.Quantity, opt => opt.MapFrom(x => x.Product.Quantity))
               .ForMember(x => x.Photos, opt => opt.MapFrom(x => x.Product.Photos));
        }
    }



}
