using CSharpFunctionalExtensions;
using FluentValidation.Results;
using MediatR;
using RoomAggregate = Epam.ItMarathon.ApiService.Domain.Aggregate.Room.Room;

namespace Epam.ItMarathon.ApiService.Application.UseCases.User.Queries
{
    /// <summary>
    /// Command for deleting a user or multiple users from a room.
    /// </summary>
    /// <param name="UserCode">Authorization code of the user who initiates the deletion.</param>
    /// <param name="UserId">Unique identifier of the user to delete (optional).</param>
    public record DeleteUserRequest(string UserCode, ulong? UserId)
        : IRequest<Result<RoomAggregate, ValidationResult>>;
}