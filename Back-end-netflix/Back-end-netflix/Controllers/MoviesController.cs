using Back_end_netflix.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Back_end_netflix.Controllers
{
    [EnableCors("react")]
    [Route("api/[controller]")]
    [ApiController]
    public class MoviesController : ControllerBase
    {
        // GET: api/<MoviesController>
        [HttpGet]
        public IEnumerable<Movies> Get()
        {
            List<Movies> movieList = new();

            movieList = Movies.GetAllMovies();

            return movieList;
        }

        // GET api/<MoviesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<MoviesController>
        [HttpPost]
        public IActionResult Post([FromBody] Movies movie)
        {
            movie.AddMovie();

            return Ok(new { message = "Film ajouté !", movie });
        }

        // PUT api/<MoviesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Movies movie)
        {
            movie.EditMovie();

            return Ok(new { message = "Film modifié !", movie = movie });
        }

        // DELETE api/<MoviesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            List<Movies> movieList = new();
            Movies movie = new();

            movieList = Movies.GetAllMovies();

            foreach (Movies m in movieList)
            {
                if (m.Id == id)
                {
                    movie = m;
                }
            }
            movie.DeleteMovie();

            return Ok(new { message = "Film supprimé !", Id = id });
        }
    }
}
