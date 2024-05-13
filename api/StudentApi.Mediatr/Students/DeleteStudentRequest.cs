using StudentApi.Models.Students;
using StudentApi.Services;
using MediatR;
using System.Threading;
using System.Threading.Tasks;

namespace StudentApi.Mediatr.Students
{
    public class DeleteStudentRequest : IRequest<DeleteStudentResponse>
    {
        public string Email { get; set; }
    }

    public class DeleteStudentResponse
    {
        public bool Success { get; set; }
        public string Message { get; set; }
    }

    public class DeleteStudentHandler : IRequestHandler<DeleteStudentRequest, DeleteStudentResponse>
    {
        private readonly IStudentsService _studentsService;

        public DeleteStudentHandler(IStudentsService studentsService)
        {
            _studentsService = studentsService;
        }

        public Task<DeleteStudentResponse> Handle(DeleteStudentRequest request, CancellationToken cancellationToken)
        {
            var result = _studentsService.DeleteStudent(request.Email);
            return Task.FromResult(new DeleteStudentResponse
            {
                Success = result,
                Message = result? "Student deleted successfully" : "Failed to delete student"
            });
        }
    }
}