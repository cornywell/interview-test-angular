using StudentApi.Models.Students;
using System.Collections.Generic;

namespace StudentApi.Services
{
    public interface IStudentsService
    {
        List<Student> GetAllStudents();

        bool AddStudent(Student student);

        bool DeleteStudent(string email);
    }
}
