using System.Linq;
using System.Net;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles
{
    public class ProfileReader : IProfileReader
    {
        private readonly DataContext _dataContext;
        private readonly IUserAccessor _userAccessor;
        public ProfileReader(DataContext dataContext, IUserAccessor userAccessor)
        {
            _dataContext = dataContext;
            _userAccessor = userAccessor;
        }

        public async Task<Profile> ReadProfile(string username)
        {
            var user = await _dataContext.Users.SingleOrDefaultAsync(u => u.UserName == username);
            if (user == null)
                throw new RestException(HttpStatusCode.NotFound, new { User = "Not Found" });

            var currentUser = await _dataContext.Users.SingleOrDefaultAsync(u => u.UserName == _userAccessor.GetCurrentUserName());

            var profile = new Profile
            {
                DisplayName = user.DisplayName,
                Username = user.UserName,
                Image = user.Photos.FirstOrDefault(p => p.IsMain)?.Url,
                Photos = user.Photos,
                Bio = user.Bio,
                FollowersCount = user.Followers.Count(),
                FollowingCount = user.Followings.Count()
            };

            profile.IsFollowed = currentUser.Followings.Any(u => u.TargetId == user.Id);

            return profile;
        }
    }
}