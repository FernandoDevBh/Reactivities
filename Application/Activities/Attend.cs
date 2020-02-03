using System;
using System.Linq;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using Application.Interfaces;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities
{
    public class Attend
    {
        public class Command : IRequest
        {
            public Guid Id { get; set; }
        }

        public class Handler : IRequestHandler<Command>
        {
            private readonly DataContext _context;
            private readonly IUserAccessor _userAccessor;
            public Handler(DataContext context, IUserAccessor userAccessor)
            {
                _context = context;
                _userAccessor = userAccessor;
            }

            public async Task<Unit> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.Id);

                if (activity == null)
                {
                    throw new RestException(HttpStatusCode.NotFound, new { ActivityDto = "Could not find activity." });
                }

                var user = _context.Users.SingleOrDefault(u => u.UserName == _userAccessor.GetCurrentUserName());

                var attendance = await _context.UserActivities.SingleOrDefaultAsync(
                    ua => activity.Id == activity.Id && ua.AppUserId == user.Id
                );

                if (attendance != null)
                {
                    throw new RestException(HttpStatusCode.BadRequest, new { Attendance = "Already Attending this activity." });
                }

                attendance = new UserActivity
                {
                    AppUserId = user.Id,
                    AppUser = user,
                    Activity = activity,
                    ActivityId = activity.Id,
                    DateJoined = DateTime.Now,
                    IsHost = false
                };

                _context.UserActivities.Add(attendance);

                // handler logic here
                var success = await _context.SaveChangesAsync() > 0;

                if (success) return Unit.Value;

                throw new Exception("Problem saving changes.");
            }
        }
    }
}