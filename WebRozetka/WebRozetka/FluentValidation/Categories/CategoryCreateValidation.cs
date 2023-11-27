using FluentValidation;
using Microsoft.EntityFrameworkCore;
using System;
using WebRozetka.Data;
using WebRozetka.Models.Category;

namespace WebRozetka.FluentValidation.Categories
{
    public class CategoryCreateValidation : AbstractValidator<CategoryCreateViewModel>
    {
        private readonly AppEFContext _appEFContext;

        public CategoryCreateValidation(AppEFContext appEFContext)
        {
            _appEFContext = appEFContext;

            RuleFor(x => x.Name)
                .NotNull()
                .MinimumLength(3)
                .MustAsync(BeUniqueName).WithMessage("Категорія з такою назвою вже існує");

            RuleFor(x => x.Description)
                .NotNull()
                .MinimumLength(10);

            RuleFor(x => x.Image)
                .NotNull();
        }

        private async Task<bool> BeUniqueName(string name, CancellationToken cancellationToken)
        {
            return !await _appEFContext.Categories.AnyAsync(x => x.Name.ToLower().Equals(name.ToLower()));
        }
    }

}
