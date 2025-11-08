using CSharpFunctionalExtensions;
using Epam.ItMarathon.ApiService.Application.UseCases.User.Queries;
using Epam.ItMarathon.ApiService.Domain.Abstract;
using Epam.ItMarathon.ApiService.Domain.Shared.ValidationErrors;
using FluentValidation.Results;
using MediatR;
using RoomAggregate = Epam.ItMarathon.ApiService.Domain.Aggregate.Room.Room;

namespace Epam.ItMarathon.ApiService.Application.UseCases.User.Handlers
{
    /// <summary>
    /// Handler for the DeleteUsers command.
    /// Responsible for deleting a user (or multiple users) from a room and returning the updated room.
    /// </summary>
    /// <param name="roomRepository">Repository used to operate on Room aggregates (IRoomRepository).</param>
    public class DeleteUserHandler(IRoomRepository roomRepository)
        : IRequestHandler<DeleteUserRequest, Result<RoomAggregate, ValidationResult>>
    {
        ///<inheritdoc/>
        public async Task<Result<RoomAggregate, ValidationResult>> Handle(DeleteUserRequest request,
            CancellationToken cancellationToken)
        {
            var roomResult = await roomRepository.GetByUserCodeAsync(request.UserCode, cancellationToken);
            // 1. get room by userCode 
            if (roomResult.IsFailure)
            {
                return roomResult;
            }
            // 2. delete user by id
            var room = roomResult.Value;
            var deleteUserResult = await room.DeleteUser(request.UserId, request.UserCode, cancellationToken);
            if (deleteUserResult.IsFailure)
            {
                return deleteUserResult;
            }
            
            // 3. update room in database
            var updateResult = await roomRepository.UpdateAsync(room, cancellationToken); 
            if (updateResult.IsFailure)
            {
                return Result.Failure<RoomAggregate, ValidationResult>(new BadRequestError([
                    new ValidationFailure(string.Empty, updateResult.Error)
                ]));
            }
            
            // 4. get updated room in database
            var updatedRoomResult = await roomRepository.GetByUserCodeAsync(request.UserCode, cancellationToken);
            return updatedRoomResult;
        }
    }
}