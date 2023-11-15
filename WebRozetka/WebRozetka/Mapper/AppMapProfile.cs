﻿using AutoMapper;
using WebRozetka.Data.Entities;
using WebRozetka.Models.Category;

namespace WebRozetka.Mapper
{
    public class AppMapProfile : Profile
    {
        public AppMapProfile() 
        { 
            CreateMap<CategoryCreateViewModel, CategoryEntity>();
            CreateMap<CategoryEntity, CategoryItemViewModel>();
        }
    }
}
