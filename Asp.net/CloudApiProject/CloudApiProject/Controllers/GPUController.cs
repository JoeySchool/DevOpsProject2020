using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using CloudApiProject.Models;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace CloudApiProject.Controllers
{
    [Route("api/gpu")]
    public class GPUController : Controller
    {
        private readonly LibraryContext context;
        public GPUController(LibraryContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public List<Gpu> GetAllGpus(string brand, string manufacture, int? page, string sort, int length = 10, string dir = "asc")
        {
            IQueryable<Gpu> query = context.Gpus;

            if (!string.IsNullOrWhiteSpace(brand))
                query = query.Where(d => d.BrandName == brand);
            if (!string.IsNullOrWhiteSpace(manufacture))
                query = query.Where(d => d.ComputerChipManufacturer == manufacture);


            if (!string.IsNullOrWhiteSpace(sort))
            {
                switch (sort)
                {
                    case "length":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Length);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Length);
                        break;

                    case "memory":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Memory);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Memory);
                        break;

                    case "cores":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Cores);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Cores);
                        break;

                    case "cost":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.Cost);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.Cost);
                        break;

                    case "brandname":
                        if (dir == "asc")
                            query = query.OrderBy(d => d.BrandName);
                        else if (dir == "desc")
                            query = query.OrderByDescending(d => d.BrandName);
                        break;
                }
            }

            if (page.HasValue)
                query = query.Skip(page.Value * length);
            query = query.Take(length);
            return query.ToList();


        }
        [Authorize]
        [Route("{id}")]
        [HttpDelete]
        public IActionResult Deletegpu(int id)
        {
            var gpu = context.Gpus.Find(id);
            if (gpu == null)
            {
                return NotFound();
            }
            context.Gpus.Remove(gpu);
            context.SaveChanges();
            //standaard response 204 bij gelukte delete
            return NoContent();
        }
        [Authorize]
        [HttpPost]
        public IActionResult CreateCase([FromBody] Gpu newGpu)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            context.Gpus.Add(newGpu);
            context.SaveChanges();
            //stuur een result 201 met het boek als content
            return Created("", newGpu);
        }


    }
}