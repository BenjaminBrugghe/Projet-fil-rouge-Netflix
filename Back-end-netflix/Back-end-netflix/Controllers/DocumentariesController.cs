using Back_end_netflix.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace Back_end_netflix.Controllers
{
    [EnableCors("react")]
    [Route("api/[controller]")]
    [ApiController]
    public class DocumentariesController : ControllerBase
    {
        // GET: api/<DocumentariesController>
        [HttpGet]
        public IEnumerable<Documentaries> Get()
        {
            List< Documentaries > documentariesList = new();

            documentariesList = Documentaries.GetAllDocumentaries();

            return documentariesList;
        }

        // GET api/<DocumentariesController>/5
        [HttpGet("{id}")]
        public string Get(int id)
        {
            return "value";
        }

        // POST api/<DocumentariesController>
        [HttpPost]
        public IActionResult Post([FromBody] Documentaries documentaries)
        {
            documentaries.AddDocumentary();

            return Ok(new { message = "Documentaire ajouté !", documentaries });
        }

        // PUT api/<DocumentariesController>/5
        [HttpPut("{id}")]
        public IActionResult Put(int id, [FromBody] Documentaries documentaries)
        {
            documentaries.EditDocumentary();

            return Ok(new { message = "Documentaire modifié !", documentaries = documentaries });
        }

        // DELETE api/<DocumentariesController>/5
        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            List<Documentaries> documentariesList = new();
            Documentaries documentaries = new();

            documentariesList = Documentaries.GetAllDocumentaries();

            foreach (Documentaries d in documentariesList)
            {
                if (d.Id == id)
                {
                    documentaries = d;
                }
            }
            documentaries.DeleteDocumentary();

            return Ok(new { message = "Documentaire supprimé !", Id = id });
        }
    }
}
