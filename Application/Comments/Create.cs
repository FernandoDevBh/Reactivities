using System;
using System.Net;
using System.Threading;
using System.Threading.Tasks;
using Application.Errors;
using AutoMapper;
using Domain;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Comments
{
    public class Create
    {
        public class Command : IRequest<CommentDto>
        {
            public Guid ActivityId { get; set; }
            public string Body { get; set; }
            public string Username { get; set; }
        }

        public class Handler : IRequestHandler<Command, CommentDto>
        {
            private readonly DataContext _context;
            private readonly IMapper _mapper;
            public Handler(DataContext context, IMapper mapper)
            {
                _context = context;
                _mapper = mapper;
            }

            public async Task<CommentDto> Handle(Command request, CancellationToken cancellationToken)
            {
                var activity = await _context.Activities.FindAsync(request.ActivityId);

                if (activity == null)
                    throw new RestException(HttpStatusCode.NotFound, new { Activity = "Not Found" });

                var user = await _context.Users.SingleOrDefaultAsync(u => u.UserName == request.Username);

                if (user == null)
                    throw new RestException(HttpStatusCode.NotFound, new { User = "Not Found" });

                var comment = new Comment
                {
                    Body = request.Body,
                    Author = user,
                    Activity = activity,
                    CreateAt = DateTime.Now
                };

                activity.Comments.Add(comment);

                var success = await _context.SaveChangesAsync() > 0;

                if (success) return _mapper.Map<CommentDto>(comment);

                throw new Exception("Problem saving changes.");
            }
        }
    }
}