using System;
using StudentApi.Mediatr.Students;
using StudentApi.Models.Students;
using MediatR;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System.Collections.Generic;
using System.Threading.Tasks;

namespace StudentApi.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StudentsController : ControllerBase
    {
        private IMediator mediator;

        /// <summary>
        /// Gets the Mediator object.
        /// </summary>
        protected IMediator Mediator => mediator ??= (IMediator)HttpContext.RequestServices.GetService(typeof(IMediator))!;

        private readonly ILogger<StudentsController> _logger;

        public StudentsController(ILogger<StudentsController> logger)
        {
            _logger = logger;
        }

        /// <summary>
        /// Gets the current students
        /// </summary>
        /// <returns></returns>
        [HttpGet]
        public async Task<IEnumerable<Student>> Get()
        {
            var reponse = await Mediator.Send(new GetStudentsRequest());

            return reponse.Students;
        }

        [HttpPost]
        public async Task<IActionResult> AddStudent([FromBody] AddStudentRequest request)
        {
            try
            {
                var response = await Mediator.Send(request);
                if (response.Success)
                {
                    return StatusCode(201, new { message = response.Message });
                }
                else
                {
                    return BadRequest(new { message = response.Message });
                }

            }
            catch (Exception ex)
            {
                _logger.LogError(ex, "Failed to add student.");
                return StatusCode(500, "Internal server error");
            }
        }
    }
}
