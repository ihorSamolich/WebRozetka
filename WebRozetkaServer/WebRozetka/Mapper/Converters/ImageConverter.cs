using AutoMapper;
using WebRozetka.Data.Entities.Identity;
using WebRozetka.Helpers;
using WebRozetka.Models.Account;

namespace WebRozetka.Mapper.Converters
{
    public class ImageConverter : ITypeConverter<RegisterViewModel, UserEntity>
    {
        public UserEntity Convert(RegisterViewModel source, UserEntity destination, ResolutionContext context)
        {
            var imageBase64 = source.ImageBase64;
            if (!string.IsNullOrEmpty(imageBase64))
            {

            }
            else
            {
                destination.Image = string.Empty;
            }

            return destination;
        }
    }
}
