using Back_end_netflix.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Back_end_netflix.Controllers
{
    [EnableCors("react")]
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        // GET: api/<UsersController>
        [HttpGet]
        public IEnumerable<Users> Get()
        {
            List<Users> userList = new();

            userList = Users.GetAllUsers();

            return userList;
        }


        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }


        // POST api/<UsersController>
        [HttpPost]
        public IActionResult Post([FromBody] Users user)
        {
            user.CreateUser();

            return Ok(new { message = "Utilisateur ajouté !", user });
        }


        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Users user)
        {
            user.EditUser();

            return Ok(new { message = "Utilisateur modifié !", user = user });
        }


        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            List<Users> userList = new();
            Users user = new();

            userList = Users.GetAllUsers();

            foreach (Users u in userList)
            {
                if (u.Id == id)
                {
                    user = u;
                }
            }

            user.DeleteUser();

            return Ok(new { message = "Utilisateur supprimé !", Id = id });
        }
    }
}
